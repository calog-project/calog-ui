export interface NotificationItem {
  aggregateId?: string;
  id?: number;
  type: NotificationType;
  receiverId: number;
  meta?: NotificationMeta;
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

export interface FollowRequestedMeta {
  followerId: number;
  followerNickname: string;
}

export interface FollowedMeta {
  followerId: number;
  followerNickname: string;
}

export interface ScheduleUpcomingMeta {
  scheduleId: number;
  scheduleTitle: string;
  scheduleStartTime: Date;
}

export interface ScheduleInvitedMeta {
  scheduleId: number;
  scheduleTitle: string;
  inviterId: number;
  inviterNickname: string;
}

export interface ScheduleSharedMeta {
  //TODO
  inviterId: number;
  inviterNickname: string;
}

export interface ScheduleDeletedMeta {
  //TODO
  scheduleId: number;
  scheduleTitle: string;
}

export interface CommonMeta {
  message?: string;
}

export type NotificationMeta =
  | FollowRequestedMeta
  | FollowedMeta
  | ScheduleUpcomingMeta
  | ScheduleInvitedMeta
  | ScheduleSharedMeta
  | ScheduleDeletedMeta;

export type NotificationMetaMap = {
  [NotificationType.FOLLOW_REQUESTED]: FollowRequestedMeta;
  [NotificationType.FOLLOWED]: FollowedMeta;
  [NotificationType.SCHEDULE_INVITED]: ScheduleInvitedMeta;
  [NotificationType.SCHEDULE_UPCOMING]: ScheduleUpcomingMeta;
  [NotificationType.SCHEDULE_SHARED]: ScheduleSharedMeta;
  [NotificationType.SCHEDULE_DELETED]: ScheduleDeletedMeta;
  [NotificationType.COMMON]: CommonMeta;
};
