import DropdownBox from '@/components/commons/dropdown/DropdownBox';
import { FiAlertCircle } from 'react-icons/fi';
import { useScheduleStore } from '@/stores/scheduleStore';

const ScheduleDropdowns = () => {
  const { startTime, endTime, categoryId, setStartTime, setEndTime, setCategoryId } = useScheduleStore();

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-20">
          <DropdownBox
            dataType="time"
            title="시작 시간"
            className="w-[180px] h-[46px]"
            dropdownClassName="w-[180px]"
            value={startTime === null ? '시작 시간' : startTime}
            onChange={(value) => {
              setStartTime(value);
            }}
          />
          <DropdownBox
            dataType="time"
            title="종료 시간"
            className="w-[180px] h-[46px]"
            dropdownClassName="w-[180px]"
            value={endTime === null ? '종료 시간' : endTime}
            onChange={(value) => setEndTime(value)}
          />
        </div>
        <div className="flex items-center ml-2 gap-2 text-[12px] text-gray-78">
          <FiAlertCircle className="text-[16px] font-medium text-red" />
          <p>시간 미선택 시 하루 종일(00:00 ~ 00:00)로 표시 됩니다.</p>
        </div>
      </div>
      <div className="flex gap-[11px]">
        <DropdownBox
          dataType="category"
          title="카테고리"
          className="w-[180px] h-[46px]"
          dropdownClassName="w-[180px]"
          value={categoryId}
          onChange={(value) => {
            setCategoryId(value);
          }}
        />
      </div>
    </>
  );
};

export default ScheduleDropdowns;
