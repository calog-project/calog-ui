'use client';

import React from 'react';
import useCalendar from '@/hooks/useCalendar';
import { DAY_LIST } from '@/constants/calendar';
import { getDayClass } from '@/utils/calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const MiniCalendar: React.FC = () => {
  const { weekCalendarList, currentDate, today, goToNextMonth, goToPrevMonth } = useCalendar();

  return (
    <div className="w-[300px] h-[250px] flex flex-col items-center gap-4 rounded-[8px] shadow p-4">
      <header className="flex w-full justify-between items-center">
        <h2 className="text-[14px] font-bold">{currentDate.format('YYYY년 MMM')}</h2>
        <div className="flex justify-between gap-4">
          <button onClick={goToPrevMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowBack />
          </button>
          <button onClick={goToNextMonth} className="px-2 py-1 text-gray-98">
            <IoIosArrowForward />
          </button>
        </div>
      </header>

      <div className="w-full h-full grid grid-cols-7 gap-2 text-[12px]">
        {DAY_LIST.map((day) => (
          <div
            key={day}
            className={`flex w-full justify-center items-center font-semibold text-center ${
              day === '토' ? 'text-blue-33' : day === '일' && 'text-red'
            }`}>
            {day}
          </div>
        ))}

        {weekCalendarList.flat().map((day, index) => {
          const isSunday = day.day() === 0;
          const isSaturday = day.day() === 6;
          const isCurrentMonth = day.isSame(currentDate, 'month');
          const isToday = day.isSame(today, 'day');

          return (
            <div
              key={index}
              className={`flex w-10 h-10 m-auto justify-center items-center text-center cursor-pointer hover:bg-blue-76 hover:bg-opacity-10 hover:rounded-full ${
                isToday && 'rounded-full m-auto bg-blue-33 text-white'
              } ${!isCurrentMonth && 'opacity-20 text-gray-89'} ${getDayClass(isSunday, isSaturday)}`}>
              {day.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
