import Notification from '@/components/domains/main/notification/Notification';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthenticatedUserMenu = ({
  toggleProfileMenu,
  showProfileMenu,
  profileImage,
}: {
  toggleProfileMenu: () => void;
  showProfileMenu: boolean;
  profileImage: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex gap-6 mr-6">
        <Link href="/main" className="text-gray-700 hover:text-blue-500 font-medium">
          대시보드
        </Link>
        <Notification />
      </nav>

      <div className="relative">
        <button type="button" onClick={toggleProfileMenu} className="flex items-center gap-2 focus:outline-none">
          <div className="w-[30px] h-[30px] rounded-full bg-gray-200 overflow-hidden">
            <Image src={profileImage} alt="프로필" width={50} height={50} className="w-full h-full object-cover" />
          </div>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 mt-5 w-48 bg-white rounded-md shadow-lg py-1 z-[9999]">
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
  );
};

export default AuthenticatedUserMenu;
