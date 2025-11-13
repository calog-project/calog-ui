import { IoNotifications } from 'react-icons/io5';
import React, { useState } from 'react';
import NotificationSidebar from './NotificationSidebar';
import { useSocketStore } from '@/stores/socketStore';

export type NotificationProps = {
  hasNew?: boolean;
};

const Notification = ({ hasNew }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  const unreadCount = useSocketStore(s => s.getUnreadCount());
  const hasNewNotifications = hasNew ?? unreadCount > 0;

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="ml-auto flex items-center justify-center w-10 h-10 transition relative"
        onClick={handleToggle}
        aria-label="알림 열기">
        <IoNotifications size={30} className="text-gray-a9" />
        {hasNewNotifications && (
          <span className="absolute left-1/2 bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-5 h-5 bg-blue-33 rounded-full border-2 border-white flex items-center justify-center">
            {unreadCount > 0 && (
              <span className="text-white text-xs font-bold">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </span>
        )}
      </button>
      <NotificationSidebar open={open} onClose={handleClose} />
    </>
  );
};

export default Notification;
