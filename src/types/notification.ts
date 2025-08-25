export type NotificationProps = {
  hasNew?: boolean;
};

export interface NotificationItem {
  aggregateId?: string;
  id?: number;
  type: NotificationType;
  receiverId: number;
  meta?: Record<string, string>;
  url?: string;
  message: string;
  actionable: boolean;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum NotificationType {
  COMMON = 'COMMON',
  FOLLOW_REQUESTED = 'FOLLOW_REQUESTED',
  FOLLOWED = 'FOLLOWED',
  SCHEDULE_INVITED = 'SCHEDULE_INVITED',
  SCHEDULE_UPCOMING = 'SCHEDULE_UPCOMING',
  SCHEDULE_SHARED = 'SCHEDULE_SHARED',
  SCHEDULE_DELETED = 'SCHEDULE_DELETED',
}

export interface NotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}
