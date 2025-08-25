import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { NotificationItem } from '@/types/notification';
import { getNotifications } from '@/actions/notification';
import Message from './Message';

export interface NotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotifications(6);
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알림을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 개별 알림 읽음 처리
  const handleNotificationRead = async (notificationId: number) => {
    try {
      // await markNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification,
        ),
      );
    } catch (err) {
      console.error('알림 읽음 처리 오류:', err);
    }
  };

  // 버튼 클릭 처리
  const handleButtonClick = async (notificationId: number, action: 'accept' | 'reject') => {
    try {
      if (action === 'accept') {
        // await acceptFollowRequest(notificationId); // 팔로우 수락
        // await acceptScheduleInvite(notificationId); // 일정 참석
      } else if (action === 'reject') {
        // await rejectFollowRequest(notificationId); // 팔로우 거절
        // await rejectScheduleInvite(notificationId); // 일정 거절
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification,
        ),
      );
    } catch (err) {
      console.error('버튼 클릭 처리 오류:', err);
    }
  };

  // 모든 알림 읽음 처리
  // const handleReadAll = async () => {
  //   try {
  //     await allNotificationsAsRead();

  //     setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  //   } catch (err) {
  //     console.error('모든 알림 읽음 처리 오류:', err);
  //   }
  // };

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  let content;
  if (loading) {
    content = (
      <div className="flex flex-col mt-10 justify-center items-center">
        <Image
          src={'/images/ready.svg'}
          alt="로딩 아이콘"
          width={32}
          height={32}
          className="animate-[spin_5s_linear_infinite]"
        />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex justify-center items-center text-center text-red-500 p-4">
        <button onClick={fetchNotifications} className="mt-2 text-blue-33 hover:text-blue-33">
          다시 시도
        </button>
      </div>
    );
  } else if (notifications.length === 0) {
    content = (
      <div className="text-center text-gray-400 p-8">
        <p className="text-8">알림이 없습니다.</p>
      </div>
    );
  } else {
    content = (
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto flex flex-col">
        {notifications.map((notification) => (
          <Message
            key={notification.id}
            notification={notification}
            onRead={handleNotificationRead}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {open && (
        <div
          className="fixed left-0 right-0 z-50 bg-black bg-opacity-30"
          style={{ top: 48, bottom: 0 }}
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed right-0 h-full w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300`}
        style={{
          top: 48,
          bottom: 0,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        tabIndex={-1}>
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-3xl font-bold">알림</h2>
          {notifications.length > 0 && (
            <button type="button" className="text-2xl text-gray-a9 hover:text-gray-700 transition-colors">
              모두읽음
            </button>
          )}
        </div>
        <div className="flex-1 overflow-hidden">{content}</div>
      </aside>
    </>
  );
};

export default NotificationSidebar;
