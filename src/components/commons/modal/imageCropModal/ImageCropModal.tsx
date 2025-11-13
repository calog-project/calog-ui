'use client';

import React, { useState, useRef } from 'react';
import Modal from '@/components/commons/modal/Modal';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  selectedImg: string;
  originalFileName: string;
  onCropComplete: (file: File) => void;
}

const ImageCropModal = ({
  openModal,
  handleModalClose,
  selectedImg,
  originalFileName,
  onCropComplete,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  if (!openModal) {
    return null;
  }

  // 이미지가 로드 됐을 때 실행 될 함수. 화면에 crop 영역을 표기함.
  const onImageLoadToCrop = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(crop);
    setCompletedCrop(convertToPixelCrop(crop, width, height));
  };

  // 비율과 픽셀로 계산된 이미지를 실제로 자르는 함수, 이미지와 crop된 픽셀 정보를 받아서, formData로 전송하기 위한 blob형태로 반환
  const executeImageCrop = (image: HTMLImageElement, completedCrop: PixelCrop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const context = canvas.getContext('2d')!;
    context.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    // 캔버스에 그려진 이미지를 Bolb으로 전환하여 반환함.
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!));
    });
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgRef.current && completedCrop) {
      const croppedImageBlob = await executeImageCrop(imgRef.current, completedCrop);
      const originalFileType = imgRef.current.src.split(';')[0].split(':')[1];
      const newFileName = `cropped-${originalFileName}`;
      const croppedImageFile = new File([croppedImageBlob], newFileName, {
        type: originalFileType,
      });

      // onCropComplete 콜백 호출
      onCropComplete(croppedImageFile);

      // 모달 닫기
      handleModalClose();
    }
  };

  return (
    <Modal
      openModal={openModal}
      handleModalClose={() => {}}
      className="p-[25px] flex flex-col w-[500px] h-auto max-h-[80vh] items-center">
      <div className="relative flex-1 w-full mb-4">
        <ReactCrop
          crop={crop}
          onComplete={(c) => setCompletedCrop(c)}
          onChange={(c, percentCrop) => {
            setCrop(percentCrop);
            setCompletedCrop(c);
          }}
          aspect={1}
          circularCrop>
          <img
            src={selectedImg}
            ref={imgRef}
            alt="이미지"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            onLoad={onImageLoadToCrop}
          />
        </ReactCrop>
      </div>

      <div className="flex gap-[50px]">
        <button className="w-1/2 h-[40px] rounded-[4px] bg-primary text-white" onClick={handleUpload}>
          저장
        </button>
        <button className="w-1/2 h-[40px] rounded-[4px] bg-[#615f5d]" onClick={handleModalClose}>
          취소
        </button>
      </div>
    </Modal>
  );
};

export default ImageCropModal;
