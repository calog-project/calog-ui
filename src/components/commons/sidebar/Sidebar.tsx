'use client';

import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import Menu from './Menu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`m-10 bg-white rounded-lg shadow ${isOpen ? 'w-[200px]' : 'w-[55px]'} duration-500 text-gray-900 px-4`}>
      <div className={`py-3 flex mt-5 ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <HiMenuAlt3 size={25} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <Menu isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
