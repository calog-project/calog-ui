import { create } from 'zustand';
import { NotificationType } from '@/types/notification';

export type TNotification = {
  id: number;
  aggregateId: string;
  type: NotificationType;
  receiverId: number;
  meta?: Record<string, any>;
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
};

export const useSocketStore = create<SocketState>((set) => ({
  notifications: [],
  setNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
}));
