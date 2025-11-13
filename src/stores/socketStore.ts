import { create } from 'zustand';
import { NotificationMeta, NotificationType } from '@/types/notification';

export type TNotification = {
  id?: number;
  aggregateId: string;
  type: NotificationType;
  receiverId: number;
  meta?: NotificationMeta;
  message: string;
  url?: string;
  isRead: boolean;
  actionable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SocketState = {
  notifications: TNotification[];
  setNotification: (notification: TNotification) => void;
  markAsRead: (notificationId: number) => void;
  getUnreadCount: () => number;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  notifications: [],
  setNotification: (notification) => set((state) => ({ 
    notifications: [notification, ...state.notifications] // 최신 알림을 위로
  })),
  markAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    )
  })),
  getUnreadCount: () => get().notifications.filter(n => !n.isRead).length,
}));
