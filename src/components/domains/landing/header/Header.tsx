'use client';

import Link from 'next/link';
import Button from '@/components/commons/button/Button';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-custom py-2 z-50">
      <div className="relative flex items-center h-[100px] m-0 mx-auto max-w-[1400px] justify-between">
        <Link href="/" className="text-4xl font-bold">
          Calog
        </Link>

        <div className="flex gap-3">
          {/* 버튼 공통컴포넌트 만든 후 적용 */}
          <Button buttonSize="normal" bgColor="filled" className="w-[110px] h-[42px] bg-blue-33 text-xl">
            <Link href="/">회원가입</Link>
          </Button>
          <Button buttonSize="normal" bgColor="ghost" className="w-[110px] h-[42px] text-xl">
            <Link href="/login">로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
