import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let compressedBuffer = await sharp(buffer)
    .resize(512, 512, { fit: 'inside' })
    .webp({ quality: 80 }) // 초기 품질 설정
    .toBuffer();

  // 0.1MB 이하로 압축
  const maxSize = 100 * 1024; // 0.1MB
  let quality = 80;

  while (compressedBuffer.length > maxSize && quality > 10) {
    quality -= 10;
    compressedBuffer = await sharp(buffer).resize(512, 512, { fit: 'inside' }).webp({ quality }).toBuffer();
  }

  // 크기 체크 및 품질 조정
  if (compressedBuffer.length > maxSize) {
    quality = Math.max(quality - 10, 10); // 최소 품질 10
    compressedBuffer = await sharp(buffer).resize(512, 512, { fit: 'inside' }).webp({ quality }).toBuffer();
  }

  const compressedFile = new Blob([new Uint8Array(compressedBuffer)], { type: 'image/webp' });
  const compressedFileUrl = URL.createObjectURL(compressedFile);

  return NextResponse.json({ url: compressedFileUrl });
}
