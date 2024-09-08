'use client';
import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Link from 'next/link';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log('로그인', data.email, data.password);
    //TODO 로그인 후 메인페이지로 가도록
  };

  const handleOAuthLogin = async (provider: string) => {
    try {
      console.log(`${provider} OAuth 로그인 시도`);
      //TODO 백엔드에 fetch 요청 
    } catch (err) {
      console.error('OAuth 로그인 에러 발생', err);
    }
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
                <Image
                  src="/images/eyes.svg"
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
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
          <div className="w-[120px] h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 bg-white z-10">SNS 로그인</span>
          <div className="w-[120px] h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-around mt-6">
          <button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: "url('/images/KaKao.svg')",
              backgroundColor: '#FFEA00',
            }}
            onClick={() => handleOAuthLogin('kakao')}>
            <span className="sr-only">카카오톡 로그인</span>
          </button>
          <button
            className="w-[250px] h-[50px] rounded-lg bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: "url('/images/Google.svg')",
              backgroundColor: '#EFEFEF',
            }}
            onClick={() => handleOAuthLogin('google')}>
            <span className="sr-only">구글 로그인</span>
          </button>
        </div>
        <div className="mt-6 text-center">
          아직 캘로그 회원이 아니신가요?{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
