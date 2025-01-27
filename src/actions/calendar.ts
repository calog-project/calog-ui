'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TCalendar } from '@/types/calendar';
import { TCategory } from '@/types/category';
import { TSchedule } from '@/types/schedule';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchCalendar({ date }: { date: string }): Promise<TCalendar> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/calendar/init?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('캘린더의 데이터를 조회하는 데 실패했습니다.');
    }

    const data = await response.json();

    const categories = data.payload.data.categories || [];

    const categoryMap = categories.reduce((acc: Record<number, string>, category: TCategory) => {
      acc[category.id] = category.color;
      return acc;
    }, {});

    const schedulesWithColors = data.payload.data.schedules.map((schedule: TSchedule) => {
      const categoryColor = categoryMap[schedule.categoryId] || '#EFEFEF';
      return {
        ...schedule,
        categoryColor,
      };
    });

    revalidatePath('/main');
    return {
      ...data.payload.data,
      schedules: schedulesWithColors,
    };
  } catch (error) {
    console.error('캘린더 데이터 조회 실패:', error);
    throw error;
  }
}
