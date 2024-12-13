'use client';

import Link from 'next/link';
import Button from '@/components/commons/button/Button';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-custom py-2 z-50">
      <div className="relative flex items-center h-[64px] m-0 mx-auto max-w-[1400px] justify-between">
        <Link href="/" className="text-[36px] font-bold">
          Calog
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
