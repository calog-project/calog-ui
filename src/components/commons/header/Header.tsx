'use client';

import Link from 'next/link';
import Button from '@/components/commons/button/Button';
import Image from 'next/image';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const Header = ({ session }: { session: Session | null }) => {
  const pathName = usePathname();

  const shouldShowAuthButtons = useMemo(() => {
    return !session && pathName === '/';
  }, [session, pathName]);

  return (
    <header className="sticky top-0 right-0 left-0 bg-white shadow-custom py-2 px-10 z-50">
      <div className="relative flex items-center h-[64px] m-0 mx-auto justify-between">
        <div className="text-4xl font-bold">
          <Image src="/images/logo.svg" alt="로고" width={150} height={40} priority />
        </div>
        {shouldShowAuthButtons && (
          <div className="flex gap-3">
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
        )}
      </div>
    </header>
  );
};

export default Header;
