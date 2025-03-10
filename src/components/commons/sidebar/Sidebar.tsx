'use client';

import Menu from './Menu';
import UserProfile from './UserProfile';

const MOCK_USER = {
  email: 'test@email.com',
  name: '모몽가',
  imgUrl: null,
};

const Sidebar = () => {
  return (
    <aside className={`h-dvh bg-white rounded-[8px] border border-gray-89 w-[250px] text-gray-900 px-4`}>
      <div className="flex flex-col justify-center items-center mt-10">
        <UserProfile user={MOCK_USER} />
        <Menu />
      </div>
    </aside>
  );
};

export default Sidebar;
