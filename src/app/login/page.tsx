'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import KaKaoIcon from '../../../public/images/KaKaoIcon.svg';
import GoogleIcon from '../../../public/images/GoogleIcon.svg';
import useAuthStore from '@/stores/authStore';
import Button from '@/components/commons/button/Button';
import Input from '@/components/commons/input/Input';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      console.log('로그인', data.email, data.password);
      const response = await fetch(`${process.env.NEXT_PUBLIC_CALOG_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const result = await response.json();
      const { email, accessToken } = result;

      useAuthStore.getState().login(email, accessToken);
      router.push("/")
    } catch (err) {
      console.error('로그인 에러', err);
      throw new Error('로그인 실패');
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 overflow-y-auto">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-[603px] h-[802px]">
        <h2 className="text-[32px] font-extrabold mb-10 text-center leading-[48px] tracking-[-0.6px]">로그인</h2>
        <form className="space-y-6 w-[523px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-9">
            <div className="h-[83px] w-[523px]">
              <Input
                title="이메일"
                inputSize="normal"
                type="email"
                name="email"
                placeholder="이메일을 입력해 주세요."
                register={register('email', {
                  required: '이메일은 필수 입력값입니다.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '유효한 이메일 형식을 입력해 주세요.',
                  },
                })}
                error={errors.email}
                className="w-full"
              />
            </div>
            <div className="relative w-[523px]">
              <Input
                title="비밀번호"
                inputSize="normal"
                type={showPassword ? 'text' : 'password'} // 비밀번호 필드 타입 동적 변경
                name="password"
                placeholder="비밀번호를 입력해 주세요."
                register={register('password', {
                  required: '비밀번호는 필수 입력값입니다.',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: '비밀번호는 최소 8자, 하나 이상의 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.',
                  },
                })}
                error={errors.password}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-11 right-3 flex items-center justify-center text-gray-500 h-[50px]">
                <Image src={showPassword ? "/images/eyes-open.svg" : "/images/eyes.svg"} alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"} width={24} height={24} />
              </button>
            </div>
            <div className="h-[52px] w-[523px]">
              <Button
                buttonSize="normal"
                bgColor="filled"
                type="submit"
                className={`w-full h-full ${!isValid ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-80' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={!isValid}>
                로그인
              </Button>
            </div>
          </div>
        </form>
        <div className="relative flex items-center justify-between my-6 w-[523px] mx-auto">
          <hr className="w-[120px] h-px bg-gray-300"></hr>
          <span className="px-3 text-gray-400 bg-white z-10">SNS 로그인</span>
          <hr className="w-[120px] h-px bg-gray-300"></hr>
        </div>
        <div className="flex justify-around mt-6" >
          <Button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center bg-[#FFEA00]  flex items-center justify-center gap-4 "
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('kakao')}>
            <Image src={KaKaoIcon} alt="카카오 로고 아이콘" className="w-[22px] h-[25px] rounded-[5px]" />
            <p className='text-black font-medium'>
            카카오톡
            </p>
          </Button>
          <Button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center bg-[#EFEFEF] flex items-center justify-center gap-4 "
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('google')}>
            <Image src={GoogleIcon} alt="구글 로고 아이콘" className="w-[32px] h-[32px] rounded-[5px]" />
            <p className='text-black font-medium'>
            구글
            </p>
          </Button>
        </div>
        <div className="mt-6 text-center">
          아직 캘로그 회원이 아니신가요? {/* TODO 이후 href 회원가입 경로로 변경 */}
          <Link href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
