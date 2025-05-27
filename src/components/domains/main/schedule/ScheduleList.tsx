/* eslint-disable @typescript-eslint/no-explicit-any */

import { TSchedule } from '@/types/schedule';
import { LuAlarmClock } from 'react-icons/lu';
import dayjs from 'dayjs';
import { useState } from 'react';
import ScheduleModal from './ScheduleModal';
import useModal from '@/hooks/useModal';

const ScheduleList = ({ schedules, date }: { schedules: TSchedule[]; date: string }) => {
  const formattedDate = dayjs(date).format('YYYY년 MM월 DD일');
  const { openModal, handleModalClose, handleModalOpen } = useModal();
  const [selectedSchedule, setSeletedSchedule] = useState<TSchedule | null>(null);

  return (
    <div className="w-[300px] h-full flex flex-col items-center gap-4 rounded-4 border border-gray-89 rounded-[8px] p-5 overflow-hidden">
      <h1 className="text-[20px] font-bold mb-5">{formattedDate}</h1>
      {schedules.length > 0 ? (
        <div className="flex flex-col gap-5 w-full flex-grow overflow-y-auto scrollbar-hide">
          {schedules.map((schedule: TSchedule, idx: number) => {
            const isAllDay =
              dayjs(schedule.start).isSame(dayjs(schedule.end), 'day') &&
              dayjs(schedule.start).format('HH:mm:ss') === '00:00:00';

            const formattedTime = isAllDay
              ? '하루종일'
              : `${dayjs(schedule.start).format('A hh:mm')} ~ ${dayjs(schedule.end).format('A hh:mm')}`;

            return (
              <div
                key={idx}
                className={`flex gap-5 p-5 w-full rounded hover:bg-blue-76 hover:bg-opacity-10 cursor-pointer`}
                onClick={() => {
                  handleModalOpen();
                  setSeletedSchedule(schedule);
                }}>
                <span className="w-2" style={{ backgroundColor: schedule.categoryColor }} />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-black text-[16px] font-semibold truncate">{schedule.title}</span>
                  <div className="flex items-center gap-2">
                    <LuAlarmClock />
                    <span className="text-black text-[14px]">{formattedTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <span className="text-gray-98 text-[16px] font-medium">등록된 일정이 없습니다.</span>
      )}
      {openModal && (
        <ScheduleModal
          mode="detail"
          handleModalClose={handleModalClose}
          openModal={openModal}
          scheduleData={selectedSchedule}
        />
      )}
    </div>
  );
};

export default ScheduleList;
