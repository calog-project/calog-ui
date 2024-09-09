'use client';

import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import Menu from './Menu';
import UserProfile from './UserProfile';

const MOCK_USER = {
  email: 'test@email.com',
  name: '모몽가',
  imgUrl: null,
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`m-10 bg-white rounded-lg shadow ${isOpen ? 'w-[200px]' : 'w-[60px]'} duration-500 text-gray-900 px-4`}>
      <div className={`py-3 flex mt-5 ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <HiMenuAlt3 size={25} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <UserProfile user={MOCK_USER} isOpen={isOpen} />
        <Menu isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
