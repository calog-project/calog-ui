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
