'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/lib/authOption';
import { FollowRequestMeta, NotificationItem, ScheduleInvitedMeta } from '@/types/notification';
import { getServerSession } from 'next-auth';

export async function getNotifications(userId: number): Promise<NotificationItem[]> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('알림을 불러오는데 실패했습니다.');
    }

    const data = await response.json();
    return data.notifications || [];
  } catch (error) {
    console.error('알림 조회 오류:', error);
    throw new Error('알림을 불러오는데 실패했습니다.');
  }
}

// 팔로우 요청 응답
export async function respondToFollowRequest(meta: FollowRequestMeta, response: 'accept' | 'reject'): Promise<void> {
  const session = await getServerSession(authOptions);
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify({ followerId: meta.followerId, response }),
    });

    if (!apiResponse.ok) {
      throw new Error('팔로우 요청 처리에 실패했습니다.');
    }
  } catch (error) {
    console.error('팔로우 요청 처리 오류:', error);
    throw new Error('팔로우 요청 처리에 실패했습니다.');
  }
}

// 일정 초대 응답
export async function respondToScheduleInvite(
  meta: ScheduleInvitedMeta,
  response: 'accept' | 'reject',
): Promise<void> {
  const session = await getServerSession(authOptions);
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/response`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify({ scheduleId: meta.scheduleId, response }),
    });

    if (!apiResponse.ok) {
      throw new Error('일정 초대 처리에 실패했습니다.');
    }
  } catch (error) {
    console.error('일정 초대 처리 오류:', error);
    throw new Error('일정 초대 처리에 실패했습니다.');
  }
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
