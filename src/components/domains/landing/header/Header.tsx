'use client';

import Link from 'next/link';
import Button from '@/components/commons/button/Button';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 right-0 left-0 bg-white shadow-custom py-2 z-50">
      <div className="relative flex items-center h-[64px] m-0 mx-auto max-w-[1400px] justify-between">
        <Link href="/" className="text-4xl font-bold">
          <Image src="/images/logo.svg" alt="로고" width={150} height={40} />
        </Link>

        <div className="flex gap-3">
          <Link href="/register">
            <Button buttonSize="normal" bgColor="filled" className="w-[110px] h-[42px] bg-blue-33 text-xl">
              회원가입
            </Button>
          </Link>
          <Link href="/login">
            <Button buttonSize="normal" bgColor="ghost" className="w-[110px] h-[42px] text-xl">
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
