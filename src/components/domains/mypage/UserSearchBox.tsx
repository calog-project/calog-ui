'use client';

import { useState } from 'react';
import Link from 'next/link';
import { highlightText } from '@/utils/highlightText';
import { FiSearch } from 'react-icons/fi';

type UserType = {
  id: number;
  nickname: string;
  email?: string;
  image?: string;
};

type UserSearchBoxProps = {
  inputValue: string;
  onInputChange: (value: string) => void;
  searchResult: UserType[];
  myUserId?: number;
};

export default function UserSearchBox({ inputValue, onInputChange, searchResult, myUserId }: UserSearchBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[60px]">
      <div
        className={`flex items-center transition-all duration-300 h-[48px] ${
          open ? 'w-[100%] border' : 'w-[40px]'
        } rounded-full px-4 py-1`}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="유저 검색"
          className={`flex-1 outline-none transition-all duration-300 ${open ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}
        />

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-gray-600 hover:text-black transition-colors h-full">
          <FiSearch size={20} />
        </button>
      </div>

      {open && (
        <div className="mt-4 w-full flex flex-wrap justify-between">
          {searchResult
            .filter((u) => u.id !== myUserId)
            .map((user) => (
              <Link
                href={`/profile/${user.id}`}
                key={user.id}
                className="flex items-center p-3 gap-4 border rounded w-[49%] h-[60px] my-2">
                <img
                  src={user.image || '/images/user.svg'}
                  alt="유저 이미지"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{highlightText(user.nickname, inputValue)}</p>
                  <p className="font-semibold text-[14px]">{highlightText(user.email ?? '', inputValue)}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
