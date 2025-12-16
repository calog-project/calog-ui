'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import KaKaoIcon from '/public/images/KaKaoIcon.svg';
import GoogleIcon from '/public/images/GoogleIcon.svg';
import Button from '@/components/commons/button/Button';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  //기본 로그인
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError('이메일 또는 비밀번호를 확인하세요.');
      } else if (result?.ok) {
        router.push('/main');
      }
    } catch (err) {
      console.error('로그인 에러', err);
      setLoginError('로그인 중 오류가 발생했습니다.');
    }
  };

  //Oauth 로그인
  const handleOAuthLogin = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <section className="w-full h-full">
      <div className="w-[500px] mx-auto p-[40px] flex flex-col">
        <div className="flex flex-col gap-[20px] justify-around mt-[100px]">
          <Button
            className="w-full h-[50px] rounded-lg bg-cover bg-center bg-[#FEE500] flex items-center justify-start gap-4 px-6"
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('kakao')}>
            <Image src={KaKaoIcon} alt="카카오 로고 아이콘" className="w-[22px] h-[22px] rounded-[5px]" />
            <p className="text-[#191919] font-medium w-full">카카오로 시작하기</p>
          </Button>
          <Button
            className="w-full h-[50px] rounded-lg bg-cover bg-center bg-[#F2F2F2] flex items-center justify-start gap-4 px-4"
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('google')}>
            <Image src={GoogleIcon} alt="구글 로고 아이콘" className="w-[28px] h-[28px] rounded-[5px]" />
            <p className="text-[#1F1F1F] font-medium w-full">구글로 시작하기</p>
          </Button>
        </div>
        <div className="relative flex items-center justify-between mt-8 mb-2 w-full mx-auto">
          <hr className="w-1/3 bg-gray-400 h-1" />
          <span className="px-3 text-gray-700">이메일</span>
          <hr className="w-1/3 bg-gray-400 h-1" />
        </div>
        <form className="mt-[20px] flex flex-col gap-[16px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
            />
          </div>

          <div className="flex flex-col relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력하세요',
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-[-1px] flex items-center justify-center text-gray-500 h-[52px]">
              <Image
                src={showPassword ? '/images/eyes-open.svg' : '/images/eyes.svg'}
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="flex flex-col items-center gap-[10px]">
            <div className="relative mx-auto">{loginError && <p className="text-[16px] text-red">{loginError}</p>}</div>

            <button
              className={`h-[50px] w-full rounded-[4px] text-white ${isValid ? 'bg-blue-33' : 'bg-[#9FA6B2]'}`}
              disabled={!isValid}
              type="submit">
              로그인
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          아직 캘로그 회원이 아니신가요? {/* TODO 이후 href 회원가입 경로로 변경 */}
          <Link href="/register" className="text-blue-600 underline">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
