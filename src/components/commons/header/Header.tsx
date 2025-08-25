'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useAuthStore from '@/stores/authStore';
import AuthButtons from './AuthButtons';
import AuthenticatedUserMenu from './AuthenticatedUserMenu';

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
      <div className="relative flex items-center h-16 m-0 mx-auto justify-between">
        <div className="text-4xl font-bold">
          <Image src="/images/logo.svg" alt="Calog 로고" width={100} height={40} priority />
        </div>

        {/* 비로그인 상태 - 홈페이지 */}
        {showAuthButtons && <AuthButtons />}

        {/* 로그인 상태 */}
        {session && (
          <AuthenticatedUserMenu
            toggleProfileMenu={toggleProfileMenu}
            showProfileMenu={showProfileMenu}
            profileImage={profileImage}
          />
        )}
      </div>
    </header>
  );
}
