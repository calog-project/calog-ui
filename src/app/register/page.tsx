'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { checkEmail, checkNickname } from '@/api/user/user';

interface InputProps {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    getValues,
  } = useForm<InputProps>({
    mode: 'onBlur',
  });

  const [nicknameLength, setNicknameLength] = useState(0);

  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }
      console.log(response);
      console.log('Registration successful');
      router.push('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (fieldName: keyof InputProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (fieldName === 'nickname') {
      setNicknameLength(value.length);
    }
    if (fieldName === 'password') {
      setIsPasswordLongEnough(value.length >= 8);
      setHasSpecialCharacter(/[!@#$]/.test(value));
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-[603px] mx-auto p-[40px] flex flex-col">
        <span className="mt-[80px] text-[32px] font-bold mx-auto">회원가입</span>
        <form className="mt-[40px] flex flex-col gap-[24px]" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-bold">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
                validate: async (value) => {
                  if (!value) return true; // 값이 없으면 검증하지 않음
                  try {
                    const isEmailAvailable = await checkEmail(value);
                    return isEmailAvailable || '이미 사용 중인 이메일입니다.';
                  } catch (error) {
                    console.error('Email check failed', error);
                    return '이메일 확인 중 오류가 발생했습니다.';
                  }
                },
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
            />
            <p className="text-[14px] mt-[4px] text-[#FF3B34]">
              {errors.email && <span className="text-[14px] absolute text-red">{errors.email.message}</span>}
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-bold">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력하세요',
                pattern: {
                  value: /^(?=.*[!@#$])[A-Za-z\d!@#$]{8,}$/,
                  message: '',
                },
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
              onChange={handleInputChange('password')}
            />
            <p className="mt-[6px] text-[12px] bottom-[-10px] flex gap-[10px]">
              <span className={`flex gap-1 ${isPasswordLongEnough ? 'text-blue-33' : 'text-[#9FA6B2]'}`}>
                <Image
                  src={isPasswordLongEnough ? '/images/check-small-color.svg' : '/images/check-small.svg'}
                  alt="check"
                  width={10}
                  height={70}
                />
                8글자 이상
              </span>
              <span className={`flex gap-1 ${hasSpecialCharacter ? 'text-blue-33' : 'text-[#9FA6B2]'}`}>
                <Image
                  src={hasSpecialCharacter ? '/images/check-small-color.svg' : '/images/check-small.svg'}
                  alt="check"
                  width={10}
                  height={70}
                />
                특수문자(!, @, #, $) 포함
              </span>
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 font-bold">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register('confirmPassword', {
                required: '비밀번호를 입력하세요',
                validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
            />
            <p className="text-[14px] mt-[4px] text-[#FF3B34]">
              {errors.confirmPassword && (
                <span className="text-[14px] absolute text-red">{errors.confirmPassword.message}</span>
              )}
            </p>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="nickname" className="mb-2 font-bold">
              닉네임
            </label>
            <div className="flex relative items-center justify-center">
              <input
                type="text"
                placeholder="닉네임을 입력하세요"
                {...register('nickname', {
                  required: '닉네임을 입력하세요',
                  minLength: {
                    value: 2,
                    message: '닉네임은 2자 이상이어야 합니다.',
                  },
                  maxLength: {
                    value: 10,
                    message: '닉네임은 10자 이하로 입력하세요.',
                  },
                  validate: async (value) => {
                    try {
                      const isAvailable = await checkNickname(value);
                      return isAvailable || '이미 사용 중인 닉네임입니다.';
                    } catch (error) {
                      console.error('닉네임 중복 확인 실패:', error);
                      return '닉네임 확인 중 오류가 발생했습니다.';
                    }
                  },
                })}
                className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
                onChange={handleInputChange('nickname')}
                maxLength={10}
              />
              <div className="absolute text-[14px] right-[10px] text-[#9FA6B2]">
                {nicknameLength}
                <span className="">/10</span>
              </div>
            </div>

            <p className="text-[14px] mt-[4px] text-[#FF3B34]">
              {errors.nickname && <span className="text-[14px] absolute text-red">{errors.nickname.message}</span>}
            </p>
          </div>

          <button
            className={`h-[52px] mt-[24px] w-full rounded-[4px] text-white ${isValid ? 'bg-blue-33' : 'bg-[#9FA6B2]'}`}
            disabled={isSubmitting || !isValid}
            type="submit">
            회원가입
          </button>
        </form>
        <p className="mt-[40px] inline mx-auto">
          이미 캘로그 회원이신가요?{' '}
          <Link href="/login" className="text-blue-33 underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
