import { CALENDAR_LENGTH, DAY_OF_WEEK } from '@/constants/calendar';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const today = dayjs();

  // 현재 달의 총 일수 계산
  const totalMonthDays = currentDate.daysInMonth();

  // 현재 달의 첫 번째 날을 가져옴
  const firstDayOfMonth = currentDate.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.day();

  // 이전 달의 마지막 날 가져오기
  const prevMonth = currentDate.subtract(1, 'month');
  const prevMonthLastDay = prevMonth.daysInMonth();

  // 이전 달의 날짜 리스트를 `dayjs` 객체로 채움
  const prevDayList: Dayjs[] = Array.from({ length: firstDayOfWeek }).map((_, i) =>
    prevMonth.date(prevMonthLastDay - firstDayOfWeek + i + 1),
  );

  // 현재 달의 날짜 리스트를 `dayjs` 객체로 채움
  const currentDayList: Dayjs[] = Array.from({ length: totalMonthDays }).map((_, i) => currentDate.date(i + 1));

  // 다음 달의 날짜 리스트를 `dayjs` 객체로 채움
  const nextDayCount = CALENDAR_LENGTH - currentDayList.length - prevDayList.length;
  const nextMonth = currentDate.add(1, 'month');
  const nextDayList: Dayjs[] = Array.from({ length: nextDayCount }).map((_, i) => nextMonth.date(i + 1));

  // 전체 캘린더 리스트를 만듦 (이전, 현재, 다음 달을 모두 포함)
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  // 주 단위로 캘린더 리스트를 나눔
  const weekCalendarList: Dayjs[][] = currentCalendarList.reduce((acc: Dayjs[][], cur: Dayjs, idx: number) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));

  return {
    weekCalendarList,
    prevDayList,
    currentDate,
    today,
    goToNextMonth,
    goToPrevMonth,
  };
};

export default useCalendar;
