import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import utc from 'dayjs/plugin/utc';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Button from '@/components/commons/button/Button';
import { FaCalendar } from 'react-icons/fa6';
import { forwardRef } from 'react';
import { TSchedule } from '@/types/schedule';
import DatePicker from 'react-datepicker';
import '@/style/customDatepicker.css';
import { useScheduleStore } from '@/stores/scheduleStore';

dayjs.extend(utc);

type TCustomInputProps = {
  value?: string;
  onClick?: () => void;
  className?: string;
};

const CustomInput = forwardRef<HTMLButtonElement, TCustomInputProps>(({ value, onClick, className }, ref) => (
  <Button className={className} onClick={onClick} ref={ref} buttonSize="normal" bgColor="ghost">
    <FaCalendar />
    <span className={`text-[14px] font-medium ${!value ? 'text-gray-a9' : null}`}>
      {value ? value : '날짜를 선택해 주세요'}
    </span>
  </Button>
));

CustomInput.displayName = 'CustomInput';

const ScheduleDatePicker = ({
  control,
  errors,
  mode,
}: {
  errors: FieldErrors<TSchedule>;
  control: Control<TSchedule, any>;
  mode: 'add' | 'detail';
}) => {
  const { startDate, setStartDate, endDate, setEndDate } = useScheduleStore();

  return (
    <div className="relative flex flex-col w-[400px]">
      <label className="text-[20px] font-semibold mb-2">날짜</label>
      <Controller
        control={control}
        name="date"
        rules={mode === 'add' ? { required: '날짜는 필수 입력값입니다.' } : {}}
        render={({ field: { onBlur, onChange } }) => {
          return (
            <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              selectsRange={true}
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              onChange={(dates) => {
                const [start, end] = dates as [Date, Date];
                setStartDate(start);
                setEndDate(end);
                onChange([start, end]);
              }}
              onCalendarClose={onBlur}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex justify-between items-center px-2 w-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      decreaseMonth();
                    }}
                    disabled={prevMonthButtonDisabled}
                    className="text-[20px]">
                    <MdKeyboardArrowLeft />
                  </button>
                  <span className="text-[15px]">{dayjs(date).format('YYYY년 MM월')}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      increaseMonth();
                    }}
                    disabled={nextMonthButtonDisabled}
                    className="text-[20px]">
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              )}
              customInput={
                <CustomInput className="flex gap-5 items-center w-[400px] h-[46px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98" />
              }
              className="w-[300px]"
              calendarClassName="custom-calendar"
            />
          );
        }}
      />
      {errors?.date && <span className="text-[14px] text-red">{errors.date.message}</span>}
    </div>
  );
};

export default ScheduleDatePicker;
