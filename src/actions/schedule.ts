import { TSchedule } from '@/types/schedule';
import { getSession } from 'next-auth/react';

export const addSchedule = async (
  data: TSchedule,
  joiner: string[],
  startDateTime: string,
  endDateTime: string,
  categoryId: string,
  setScheduleFormReset: () => void,
) => {
  try {
    const session = await getSession();
    if (!session || !session.user || !session.user.id) {
      throw new Error('로그인된 사용자가 아닙니다.');
    }

    const requestData = {
      author: session?.user.id,
      title: data.title,
      start: startDateTime,
      end: endDateTime,
      categoryId: Number(categoryId),
      joiner: joiner,
      description: data.description,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('일정 추가 실패');
    }

    await response.json();
    setScheduleFormReset();
  } catch (error) {
    console.error('일정 추가 에러', error);
    setScheduleFormReset();
    alert('일정 작성을 실패하였습니다.');
  }
};

export const getScheduleDetail = async (scheduleId: number) => {
  try {
    const session = await getSession();
    if (!session || !session.user || !session.user.id) {
      throw new Error('로그인된 사용자가 아닙니다.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/${scheduleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('일정 추가 실패');
    }

    const data = await response.json();
    return data.payload.data;
  } catch (error) {
    console.error('일정 상세 정보 조회 에러', error);
    alert('일정 상세 정보를 불러오는 데 실패하였습니다.');
  }
};

export const editSchedule = async (
  scheduleId: number,
  data: TSchedule,
  joiner: string[],
  startDateTime: string,
  endDateTime: string,
  categoryId: string,
) => {
  try {
    const session = await getSession();
    if (!session || !session.user || !session.user.id) {
      throw new Error('로그인된 사용자가 아닙니다.');
    }

    const requestData = {
      author: session?.user.id,
      title: data.title,
      start: startDateTime,
      end: endDateTime,
      categoryId: Number(categoryId),
      joiner: joiner,
      description: data.description,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/${scheduleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('일정 수정 실패');
    }

    await response.json();
  } catch (error) {
    console.error('일정 수정 에러', error);
    alert('일정 수정을 실패하였습니다.');
  }
};
