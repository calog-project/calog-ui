'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/stores/authStore';
import { getUserInfo } from '@/api/user/user';
import { updateUserProfile } from '@/actions/user';
import Button from '@/components/commons/button/Button';
import ImageCropModal from '@/components/commons/modal/imageCropModal/ImageCropModal';

interface IProfileEditForm {
  nickname: string;
  description: string;
  image?: File;
}

export default function ProfileEditPage() {
  const { user, accessToken, login } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<IProfileEditForm>({
    mode: 'onChange',
  });
  const [imagePreview, setImagePreview] = useState<string>(user?.image || '/images/user.svg');
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id && accessToken) {
        try {
          const userInfo = await getUserInfo(user.id, accessToken);
          setValue('nickname', userInfo.nickname);
          setValue('description', userInfo.description);
          setImagePreview(userInfo.image || '/images/user.svg');
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
        }
      }
    };
    fetchUserData();
  }, [user, accessToken, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageToCrop(reader.result as string);
          setOriginalFileName(file.name);
          setIsCropModalOpen(true);
        } else {
          alert('파일을 읽는 중 오류가 발생했습니다.');
        }
      };
      reader.onerror = () => {
        console.error('FileReader error');
        alert('파일을 읽는 중 오류가 발생했습니다.');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    setCroppedImageFile(croppedFile);
    setValue('image', croppedFile, { shouldDirty: true });
    setImagePreview(URL.createObjectURL(croppedFile));
  };

  const onSubmit: SubmitHandler<IProfileEditForm> = async (data) => {
    if (!isDirty) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('description', data.description);
    if (croppedImageFile) {
      formData.append('image', croppedImageFile);
    }

    try {
      const result = await updateUserProfile(formData);
      alert('프로필이 성공적으로 업데이트되었습니다.');

      if (user && accessToken) {
        const newImageUrl = result.payload.data.image;
        const updatedUser = { ...user, nickname: data.nickname, image: newImageUrl || imagePreview };
        login(updatedUser, accessToken);
      }

      router.push('/mypage');
    } catch (error) {
      console.error(error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      {imageToCrop && (
        <ImageCropModal
          openModal={isCropModalOpen}
          handleModalClose={() => setIsCropModalOpen(false)}
          selectedImg={imageToCrop}
          originalFileName={originalFileName}
          onCropComplete={handleCropComplete}
        />
      )}
      <h1 className="text-3xl font-bold mb-8">프로필 수정</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <Image src={imagePreview} alt="프로필 이미지" fill className="rounded-full object-cover" />
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" ref={imageInputRef} />
          <Button
            type="button"
            buttonSize="normal"
            bgColor="ghost"
            onClick={() => imageInputRef.current?.click()}
            className="w-auto px-4 py-2">
            이미지 변경
          </Button>
        </div>

        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            {...register('nickname', { required: '닉네임을 입력해주세요.' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nickname && <p className="mt-2 text-sm text-red-600">{errors.nickname.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            소개
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            buttonSize="normal"
            bgColor="ghost"
            onClick={() => router.back()}
            className="w-auto px-6 py-2">
            취소
          </Button>
          <Button
            type="submit"
            buttonSize="normal"
            bgColor="filled"
            disabled={!isDirty || !isValid}
            className={`w-auto px-6 py-2 ${!isDirty || !isValid ? 'bg-gray-400' : 'bg-blue-500'}`}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
