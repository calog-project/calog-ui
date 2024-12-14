'use client';

import React, { useState } from 'react';
import Button from '@/components/commons/button/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import ImageCropModal from '@/components/imageCropModal/imageCropModal';
import useModal from '@/hooks/useModal';
import camera from '/public/images/camera.svg';

interface InputProps {
  nickname: string;
  introduce: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputProps>();

  const { openModal, handleModalClose, handleModalOpen } = useModal();

  const onSubmit: SubmitHandler<InputProps> = (data) => console.log(data);

  // 원본 이미지
  const [selectedImg, setSelectedImg] = useState('');
  // 크롭 이미지
  const [profileImg, setProfileImg] = useState<string>('');
  const [originalFileName, setOriginalFileName] = useState<string>('profileImage');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
        handleModalOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCompression = async (croppedFile: File) => {
    try {
      console.log('압축 전 크기:', croppedFile.size, 'bytes');

      const formData = new FormData();
      formData.append('file', croppedFile);

      const response = await fetch('/api/sharpjs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        console.log('압축 후 크기:', blob.size, 'bytes');

        const compressedImageUrl = URL.createObjectURL(blob);
        console.log('압축된 이미지 URL:', compressedImageUrl);

        setProfileImg(compressedImageUrl);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-[603px] mx-auto p-[40px] flex flex-col">
      <div className="w-full h-2 bg-blue-500 rounded-full" />
      <span className="mt-[80px] text-[32px] font-bold mx-auto">추가정보 입력</span>
      <form className="mt-[40px]" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p className="mb-2 font-bold">프로필 이미지</p>

          <ImageCropModal
            openModal={openModal}
            handleModalClose={handleModalClose}
            setProfileImg={setProfileImg}
            selectedImg={selectedImg}
            originalFileName={originalFileName}
            onCropComplete={handleImageCompression}
          />
          <div className="flex mb-[25px]">
            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-[4px]" htmlFor="profileImg">
              <Image src={camera} alt="camera" />
            </label>
            <input
              className="hidden"
              type="file"
              id="profileImg"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleImageChange}
            />

            {profileImg && (
              <div className="w-[70px] h-[70px] ml-[12px] overflow-hidden rounded-full">
                <Image priority layout="responsive" src={profileImg} alt="프로필 이미지" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="introduce" className="mb-2 font-bold">
            소개글
          </label>
          <textarea
            {...register('introduce', { maxLength: 170 })}
            placeholder="소개글을 입력하세요"
            className="rounded-[4px] h-[140px] px-4 py-3 border border-gray-d9 focus:border-gray-98 resize-none overflow-hidden"
            maxLength={50}
          />
          {errors.introduce && <span>This field is required</span>}
        </div>
        <Button buttonSize="normal" bgColor="gray" className="h-[52px] mt-[24px]" disabled={isSubmitting} type="submit">
          저장하기
        </Button>
      </form>
    </div>
  );
};

export default Register;
