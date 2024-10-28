'use client';

import React from 'react';
import useCalendar from '@/hooks/useCalendar';
import { DAY_LIST } from '@/constants/calendar';
import { getDayClass } from '@/utils/calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const MainCalendar: React.FC = () => {
  const { weekCalendarList, currentDate, goToNextMonth, goToPrevMonth } = useCalendar();

  return (
    <div className="w-[1200px] h-[750px] flex flex-col items-center gap-4 rounded-4 shadow p-10">
      <header className="flex w-full justify-between items-center">
        <div className="flex justify-between gap-4">
          <button onClick={goToPrevMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowBack />
          </button>
          <h2 className="text-[20px] font-bold">{currentDate.format('YYYY년 MMM')}</h2>
          <button onClick={goToNextMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowForward />
          </button>
        </div>
      </header>

      <div className="flex w-full h-16 mb-4">
        {DAY_LIST.map((day) => (
          <div
            key={day}
            className={`flex justify-center items-center border-b border-b-black w-full font-semibold text-center ${
              day === '토' ? 'text-blue-33' : day === '일' && 'text-red'
            }`}>
            {day}
          </div>
        ))}
      </div>

      <div className="w-full h-full grid grid-cols-7 text-[12px]">
        {weekCalendarList.flat().map((day, index) => {
          const isSunday = day.day() === 0;
          const isSaturday = day.day() === 6;
          const isCurrentMonth = day.isSame(currentDate, 'month');

          return (
            <div key={index} className={`flex relative border border-gray-89 text-center`}>
              <span
                className={`absolute top-1 left-1 flex flex-col gap-1 font-medium ${!isCurrentMonth && 'opacity-20 text-gray-89'} ${getDayClass(isSunday, isSaturday)}`}>
                {day.date()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCalendar;
