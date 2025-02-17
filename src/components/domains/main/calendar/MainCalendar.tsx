'use client';

import useCalendar from '@/hooks/useCalendar';
import { DAY_LIST } from '@/constants/calendar';
import { getDayClass } from '@/utils/calendar';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
import { TCalendar } from '@/types/calendar';
import { getLuminance } from '@/constants/getLuminance';
import { useEffect } from 'react';
import { fetchCalendar } from '@/actions/calendar';
import { useCalendarStore } from '@/stores/calendarStore';

dayjs.locale('ko');
dayjs.extend(isBetween);

const MainCalendar = ({ calendarData }: { calendarData: TCalendar }) => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const initialDate = dayjs().format('YYYY-MM-DD');
  const { updateCalendarData, setUpdateCalendarData } = useCalendarStore();

  const schedules = updateCalendarData.schedules;

  const goToNextMonth = async () => {
    const nextDate = currentDate.add(1, 'month');
    setCurrentDate(nextDate);
    const data = await fetchCalendar({ date: nextDate.format('YYYY-MM-DD') });
    setUpdateCalendarData(data);
  };

  const goToPrevMonth = async () => {
    const prevDate = currentDate.subtract(1, 'month');
    setCurrentDate(prevDate);
    const data = await fetchCalendar({ date: prevDate.format('YYYY-MM-DD') });
    setUpdateCalendarData(data);
  };

  useEffect(() => {
    const isAddedNewSchedule =
      updateCalendarData.schedules.length > 0 &&
      !dayjs(updateCalendarData.schedules[0].start).isSame(currentDate, 'day');

    if (currentDate.format('YYYY-MM-DD') === initialDate) {
      setUpdateCalendarData(calendarData);
    } else if (isAddedNewSchedule) {
      const firstScheduleStart = dayjs(updateCalendarData.schedules[0].start);
      setCurrentDate(firstScheduleStart);
    }
  }, [calendarData, updateCalendarData.schedules, setUpdateCalendarData, setCurrentDate]);

  return (
    <div className="w-full h-full flex flex-col items-center rounded-4 border border-gray-89 rounded-[8px] p-5">
      <header className="flex w-full justify-between items-center">
        <div className="flex items-center justify-between gap-4">
          <MdArrowLeft onClick={goToPrevMonth} size={30} className="cursor-pointer" />
          <h1 className="text-[20px] font-bold">{currentDate.format('YYYY년 MMM')}</h1>
          <MdArrowRight onClick={goToNextMonth} size={30} className="cursor-pointer" />
        </div>
      </header>

      <div className="flex w-full h-16 mb-4">
        {DAY_LIST.map((day) => (
          <div
            key={day}
            className={`flex justify-center items-center border-b border-b-black w-full text-[16px] font-semibold text-center ${
              day === '토' ? 'text-blue-33' : day === '일' && 'text-red'
            }`}>
            {day}
          </div>
        ))}
      </div>

      <div className="w-full h-full grid grid-cols-7 auto-rows-fr">
        {weekCalendarList.flat().map((day) => {
          const isSunday = day.day() === 0;
          const isSaturday = day.day() === 6;
          const isCurrentMonth = day.isSame(currentDate, 'month');

          const daySchedules = schedules.filter((schedule: any) =>
            day.isBetween(dayjs(schedule.start), dayjs(schedule.end), 'day', '[]'),
          );

          const displayedSchedules = daySchedules.length > 2 ? [...daySchedules.slice(0, 2)] : daySchedules;
          const moreSchedules = `+ ${daySchedules.length - 2}건`;

          return (
            <div
              key={day.format('YYYY-MM-DD')}
              className="p-2 flex flex-col gap-[3px] border border-gray-89 text-center hover:bg-blue-76 hover:bg-opacity-10">
              <span
                className={`flex ml-1 gap-1 font-medium text-[14px] ${getDayClass(isSunday, isSaturday)} ${!isCurrentMonth && 'opacity-20 text-gray-89'}`}>
                {day.date()}
              </span>
              {displayedSchedules.map((schedule: any) => {
                const luminance = getLuminance(schedule.categoryColor);
                const textColor = luminance > 0.5 ? 'text-black' : 'text-white';

                return (
                  <div
                    key={schedule.id}
                    className={`flex items-center w-full h-[20px] px-1 rounded overflow-hidden ${!isCurrentMonth ? 'opacity-20 text-gray-89' : 'cursor-pointer'}`}
                    style={{ backgroundColor: schedule.categoryColor }}>
                    <span className={`${textColor} truncate text-center text-[14px]`}>{schedule.title}</span>
                  </div>
                );
              })}
              {daySchedules.length > 4 && <span className="text-gray-78 text-center text-[16px]">{moreSchedules}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCalendar;
