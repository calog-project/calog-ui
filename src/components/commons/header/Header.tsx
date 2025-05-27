'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/commons/button/Button';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import useAuthStore from '@/stores/authStore';

export default function Header() {
  const { data: session, status } = useSession();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const pathName = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user && session.accessToken) {
      login(session.user, session.accessToken);
    } else if (status === 'unauthenticated') {
      logout();
    }
  }, [status, session, login, logout]);

  const showAuthButtons = useMemo(() => {
    return !session && pathName === '/';
  }, [session, pathName]);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  if (status === 'loading') return null;

  const user = session?.user as { id: number; email: string; image?: string; name?: string };
  const profileImage = user?.image || '/images/user.svg';

  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-custom py-2 px-10 z-50">
      <div className="relative flex items-center h-[64px] m-0 mx-auto justify-between">
        <div className="text-4xl font-bold">
          <Image src="/images/logo.svg" alt="로고" width={150} height={40} priority />
        </div>

        {/* 비로그인 상태 - 홈페이지 */}
        {showAuthButtons && (
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
        )}

        {/* 로그인 상태 */}
        {session && (
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 mr-6">
              <Link href="/main" className="text-gray-700 hover:text-blue-500 font-medium">
                대시보드
              </Link>
              <Link href="/notifications" className="text-gray-700 hover:text-blue-500 font-medium">
                알림
              </Link>
            </nav>

            <div className="relative">
              <button onClick={toggleProfileMenu} className="flex items-center gap-2 focus:outline-none">
                <div className="w-[25px] h-[25px] rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="프로필"
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/mypage" className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">
                    프로필 관리
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block w-full text-left px-4 py-2 text-[14px] text-red-600 hover:bg-gray-100">
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
