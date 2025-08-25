'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/lib/authOption';
import { NotificationItem } from '@/types/notification';
import { getServerSession } from 'next-auth';

export async function getNotifications(userId: number): Promise<NotificationItem[]> {
  // const session = await getServerSession(authOptions);

  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/${userId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `${session?.accessToken}`,
  //     },
  //     cache: 'no-store',
  //   });

  //   if (!response.ok) {
  //     throw new Error('알림을 불러오는데 실패했습니다.');
  //   }

  //   const data = await response.json();
  //   return data.notifications || [];
  // } catch (error) {
  //   console.error('알림 조회 오류:', error);
  //   throw new Error('알림을 불러오는데 실패했습니다.');
  // }

  // 더미 데이터
  return [
    {
      id: 1,
      type: 'SCHEDULE_INVITED' as NotificationItem['type'],
      receiverId: userId,
      message: '',
      actionable: true,
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      meta: {
        senderName: '김준현',
        scheduleTitle: '팀 미팅',
      },
    },
    {
      id: 2,
      type: 'FOLLOW_REQUESTED' as NotificationItem['type'],
      receiverId: userId,
      message: '',
      actionable: true,
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      meta: {
        senderName: '이규민',
      },
    },
    {
      id: 3,
      type: 'SCHEDULE_UPCOMING' as NotificationItem['type'],
      receiverId: userId,
      message: '',
      actionable: false,
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      meta: {
        scheduleTitle: '프로젝트 발표',
        time: '1시간 후',
      },
    },
    {
      id: 4,
      type: 'FOLLOWED' as NotificationItem['type'],
      receiverId: userId,
      message: '',
      actionable: false,
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      meta: {
        senderName: '최병준',
      },
    },
  ];
}

// 알림 읽음 처리
export async function markNotificationAsRead(id: number): Promise<void> {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/${id}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('알림 읽음 처리에 실패했습니다.');
    }
  } catch (error) {
    throw new Error('알림 읽음 처리에 실패했습니다.');
  }
}

// 모든 알림 읽음 처리
export async function allNotificationsAsRead(): Promise<void> {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('모든 알림 읽음 처리에 실패했습니다.');
    }
  } catch (error) {
    console.error('모든 알림 읽음 처리 오류:', error);
    throw new Error('모든 알림 읽음 처리에 실패했습니다.');
  }
}
