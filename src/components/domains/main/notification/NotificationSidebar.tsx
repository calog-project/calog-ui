import Image from 'next/image';
import React, { useEffect, useState, useMemo } from 'react';
import {
  FollowRequestedMeta,
  NotificationItem,
  NotificationType,
  ScheduleInvitedMeta,
} from '@/types/notification';
import {
  allNotificationsAsRead,
  getNotifications,
  markNotificationAsRead,
  respondToFollowRequest,
  respondToScheduleInvite,
} from '@/actions/notification';
import { useSocketStore } from '@/stores/socketStore';
import Message from './Message';

export interface NotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ open, onClose }) => {
  const [serverNotifications, setServerNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 소켓 알림 가져오기
  const socketNotifications = useSocketStore(s => s.notifications);
  const markSocketAsRead = useSocketStore(s => s.markAsRead);

  // 서버 알림 + 소켓 알림 합치기 (중복 제거)
  const notifications = useMemo(() => {
    const serverIds = new Set(serverNotifications.map(n => n.id));
    const uniqueSocketNotifications = socketNotifications.filter(n => !serverIds.has(n.id));

    return [...uniqueSocketNotifications, ...serverNotifications].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [serverNotifications, socketNotifications]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotifications(6);
      setServerNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알림을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 개별 알림 읽음 처리
  const handleNotificationRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);

      // 서버 알림 읽음 처리
      setServerNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification,
        ),
      );

      // 소켓 알림 읽음 처리
      markSocketAsRead(notificationId);
    } catch (err) {
      console.error('알림 읽음 처리 오류:', err);
    }
  };

  // 버튼 클릭 처리
  const handleButtonClick = async (notification: NotificationItem, action: 'accept' | 'reject') => {
    if (!notification.id || !notification.meta) return;

    try {
      switch (notification.type) {
        case NotificationType.FOLLOW_REQUESTED:
          await respondToFollowRequest(notification.meta as FollowRequestedMeta, action);
          break;
        case NotificationType.SCHEDULE_INVITED:
          await respondToScheduleInvite(notification.meta as ScheduleInvitedMeta, action);
          break;
        default:
          return;
      }

      // 액션 후 알림 읽음 처리
      await handleNotificationRead(notification.id);
    } catch (err) {
      console.error('버튼 클릭 처리 오류:', err);
    }
  };

  // 모든 알림 읽음 처리
  const handleReadAll = async () => {
    try {
      await allNotificationsAsRead();

      setServerNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
      // 소켓 알림도 모두 읽음 처리 필요
    } catch (err) {
      console.error('모든 알림 읽음 처리 오류:', err);
    }
  };

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
        {notifications.map(notification => (
          <Message
            key={notification.id ?? notification.aggregateId}
            notification={notification}
            onRead={() => notification.id && handleNotificationRead(notification.id)}
            onButtonClick={action => handleButtonClick(notification, action)}
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
            <button
              type="button"
              onClick={handleReadAll}
              className="text-2xl text-gray-a9 hover:text-gray-700 transition-colors">
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
