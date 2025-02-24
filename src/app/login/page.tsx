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
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: 'onBlur',
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
    window.location.href = `${process.env.NEXT_PUBLIC_URL}/api/auth/${provider}`;
  };

  return (
    <section className="w-full h-full">
      <div className="w-[603px] mx-auto p-[40px] flex flex-col">
        <h2 className="mt-[80px] text-[32px] font-bold mx-auto">로그인</h2>
        <form className="mt-[40px] flex flex-col gap-[24px]" onSubmit={handleSubmit(onSubmit)}>
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
              })}
              className="h-[50px] grow rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98"
            />
            <p className="text-[14px] mt-[4px] text-[#FF3B34]">
              {errors.email && <span className="text-[14px] absolute text-red">{errors.email.message}</span>}
            </p>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-2 font-bold">
              비밀번호
            </label>
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

          <div className="relative mx-auto">{loginError && <p className="text-[16px] text-red">{loginError}</p>}</div>

          <button
            className={`h-[52px] mt-[24px] w-full rounded-[4px] text-white ${isValid ? 'bg-blue-33' : 'bg-[#9FA6B2]'}`}
            disabled={!isValid}
            type="submit">
            로그인
          </button>
        </form>
        <div className="relative flex items-center justify-between my-8 w-[523px] mx-auto">
          <hr className="w-[120px] h-px bg-gray-300" />
          <span className="px-3 text-gray-400 bg-white z-10">SNS 로그인</span>
          <hr className="w-[120px] h-px bg-gray-300" />
        </div>
        <div className="flex justify-around mt-6">
          <Button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center bg-[#FFEA00]  flex items-center justify-center gap-4 "
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('kakao')}>
            <Image src={KaKaoIcon} alt="카카오 로고 아이콘" className="w-[22px] h-[25px] rounded-[5px]" />
            <p className="text-black font-medium">카카오톡</p>
          </Button>
          <Button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center bg-[#EFEFEF] flex items-center justify-center gap-4 "
            buttonSize="normal"
            bgColor="filled"
            onClick={() => handleOAuthLogin('google')}>
            <Image src={GoogleIcon} alt="구글 로고 아이콘" className="w-[32px] h-[32px] rounded-[5px]" />
            <p className="text-black font-medium">구글</p>
          </Button>
        </div>
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
