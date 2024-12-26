'use client';

import useCalendar from '@/hooks/useCalendar';
import { DAY_LIST } from '@/constants/calendar';
import { getDayClass } from '@/utils/calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(isBetween);

const MainCalendar = ({ schedules }: any) => {
  const { weekCalendarList, currentDate, goToNextMonth, goToPrevMonth } = useCalendar();

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 rounded-4 border border-gray-89 rounded-[8px] p-10">
      <header className="flex w-full justify-between items-center">
        <div className="flex justify-between gap-4">
          <button onClick={goToPrevMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowBack />
          </button>
          <h1 className="text-[20px] font-bold">{currentDate.format('YYYY년 MMM')}</h1>
          <button onClick={goToNextMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowForward />
          </button>
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

      <div className="w-full h-full grid grid-cols-7">
        {weekCalendarList.flat().map((day, idx) => {
          const isSunday = day.day() === 0;
          const isSaturday = day.day() === 6;
          const isCurrentMonth = day.isSame(currentDate, 'month');

          const daySchedules = schedules.filter((schedule: any) =>
            day.isBetween(dayjs(schedule.startDate), dayjs(schedule.endDate), 'day', '[]'),
          );

          const moreSchedules = `+ ${daySchedules.length - 4}건`;

          const displayedSchedules = daySchedules.length > 4 ? [...daySchedules.slice(0, 3)] : daySchedules;

          return (
            <>
              <div
                key={idx}
                className="p-2 pb-5 grid grid-cols-1 grid-rows-5 gap-2 border border-gray-89 text-center cursor-pointer hover:bg-blue-76 hover:bg-opacity-10">
                <span
                  className={`flex ml-1 gap-1 font-medium text-[16px] ${getDayClass(isSunday, isSaturday)} ${!isCurrentMonth && 'opacity-20 text-gray-89'}`}>
                  {day.date()}
                </span>
                {displayedSchedules.map((schedule: any) => (
                  <div
                    key={schedule}
                    className={`w-full rounded ${!isCurrentMonth ? 'opacity-20 text-gray-89' : 'cursor-pointer'}`}
                    style={{ backgroundColor: schedule.color }}>
                    <span className="text-white text-center text-[16px]">{schedule.title}</span>
                  </div>
                ))}
                {daySchedules.length > 4 && (
                  <span className="text-gray-78 text-center text-[16px]">{moreSchedules}</span>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MainCalendar;
