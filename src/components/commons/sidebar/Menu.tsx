import Link from 'next/link';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { LuLogOut } from 'react-icons/lu';
import { FaThreads } from 'react-icons/fa6';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { MdOutlineDashboard } from 'react-icons/md';

const menus = [
  { name: 'Dashboard', link: '/', icon: MdOutlineDashboard },
  { name: 'Thread', link: '/', icon: FaThreads },
  { name: 'Chat', link: '/', icon: IoChatbubbleEllipsesOutline },
  { name: 'Mypage', link: '/', icon: AiOutlineUser, margin: true },
  { name: 'Logout', icon: LuLogOut },
];

const Menu = () => {
  return (
    <div className={`flex flex-col items-start justify-between mt-8 w-full transition-all duration-300`}>
      <div className="mt-10 w-full inline-flex flex-col flex-1 gap-5 relative">
        {menus?.map((menu) =>
          menu.name !== 'logout' ? (
            <Link
              href={menu?.link || ''}
              key={menu?.name}
              className={`group flex items-center text-4 gap-5 font-medium p-4 ${menu?.margin && 'mt-10'} hover:bg-blue-33 hover:text-white hover:rounded-md`}>
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2 className="whitespace-pre duration-500">{menu?.name}</h2>
              {/* <h2
                className={`${isOpen && 'hidden'} absolute left-60 bg-blue-33 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-[55px] group-hover:duration-300 group-hover:w-fit`}>
                {menu?.name}
              </h2> */}
            </Link>
          ) : (
            <button
              type="button"
              key={menu?.name}
              className="group flex items-center text-4 gap-5 font-medium mb-10 p-4 hover:bg-blue-33 hover:text-white hover:rounded-md">
              <div>{React.createElement(LuLogOut, { size: '20' })}</div>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Menu;
