import { NotificationType } from '@/types/notification';

export interface NotificationConfig {
  icon: string;
  title: string;
}

export const NOTIFICATION_CONFIG: Record<NotificationType, NotificationConfig> = {
  [NotificationType.COMMON]: {
    icon: '/images/plus.svg',
    title: '일반 알림',
  },
  [NotificationType.FOLLOW_REQUESTED]: {
    icon: '/images/people-add.svg',
    title: '팔로우 신청',
  },
  [NotificationType.FOLLOWED]: {
    icon: '/images/check-small-color.svg',
    title: '팔로우 완료',
  },
  [NotificationType.SCHEDULE_INVITED]: {
    icon: '/images/calendar.svg',
    title: '일정 초대',
  },
  [NotificationType.SCHEDULE_UPCOMING]: {
    icon: '/images/calendar.svg',
    title: '일정 시작',
  },
  [NotificationType.SCHEDULE_SHARED]: {
    icon: '/images/calendar.svg',
    title: '일정 공유',
  },
  [NotificationType.SCHEDULE_DELETED]: {
    icon: '/images/calendar.svg',
    title: '일정 삭제',
  },
};

export const getNotificationMessage = (type: NotificationType, meta?: Record<string, string>): string => {
  switch (type) {
    case NotificationType.FOLLOW_REQUESTED:
      return `${meta?.senderName || '사용자'}님이 팔로우를 신청했습니다.`;
    case NotificationType.FOLLOWED:
      return `${meta?.senderName || '사용자'}님이 회원님을 팔로우했습니다.`;
    case NotificationType.SCHEDULE_INVITED:
      return `${meta?.senderName || '사용자'}님이 ${meta?.scheduleTitle || '일정'}에 초대했습니다.\n아래 버튼을 눌러 참석 여부를 알려주세요.`;
    case NotificationType.SCHEDULE_UPCOMING:
      return `'${meta?.scheduleTitle || null}' 일정이 곧 시작됩니다.\n자세한 내용은 캘린더에서 확인해 주세요.`;
    case NotificationType.SCHEDULE_SHARED:
      return `${meta?.senderName || '사용자'}님이 일정을 공유했습니다.\n자세한 내용은 캘린더에서 확인해 주세요.`;
    case NotificationType.SCHEDULE_DELETED:
      return `${meta?.scheduleTitle || '일정'}이 삭제되었습니다.`;
    default:
      return '새로운 알림이 있습니다.';
  }
};
