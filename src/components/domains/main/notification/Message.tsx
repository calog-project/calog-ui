import React from 'react';
import Image from 'next/image';
import { NotificationItem } from '@/types/notification';
import { NOTIFICATION_CONFIG, getNotificationMessage } from '@/constants/notificationConfig';
import { formatTime } from '@/constants/formatTime';

interface MessageProps {
  notification: NotificationItem;
  onRead?: (id: number) => void;
  onButtonClick?: (action: 'accept' | 'reject') => void;
}

const Message: React.FC<MessageProps> = ({ notification, onRead, onButtonClick }) => {
  const config = NOTIFICATION_CONFIG[notification.type];

  const handleClick = () => {
    if (onRead && notification.id) {
      onRead(notification.id);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, action: 'accept' | 'reject') => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick(action);
    }
  };

  return (
    <div className="rounded-lg m-4 p-6 transition-colors cursor-pointer bg-blue-33 bg-opacity-10" onClick={handleClick}>
      <div className="flex items-start gap-4">
        <Image src={config.icon} alt={config.title} width={24} height={24} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-12 font-semibold text-blue-33">{config.title}</span>
            {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
          </div>
          <p className="text-12 text-gray-900 mb-1 whitespace-pre-line">
            {getNotificationMessage(notification.type, notification.meta)}
          </p>

          {notification.createdAt && (
            <p className="text-[12px] text-gray-500">{formatTime(new Date(notification.createdAt))}</p>
          )}

          {notification.actionable && (
            <div className="flex justify-between w-full mt-8 gap-10">
              <button
                onClick={(e) => handleButtonClick(e, 'reject')}
                className="px-3 py-1 text-12 border-2 w-full border-blue-33 text-blue-33 hover:opacity-80 rounded-lg font-semibold transition-colors">
                거절
              </button>
              <button
                onClick={(e) => handleButtonClick(e, 'accept')}
                className="px-3 py-3 text-12 w-full bg-blue-33 hover:opacity-80 text-white font-semibold rounded-lg transition-colors">
                수락
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
