import Button from '@/components/commons/button/Button';
import DropdownBox from '@/components/commons/dropdown/DropdownBox';
import Input from '@/components/commons/input/Input';
import dayjs, { Dayjs } from 'dayjs';
import { forwardRef, KeyboardEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { FaCalendar } from 'react-icons/fa';
import { MdOutlineCancel, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import '@/style/customDatepicker.css';

interface AddScheduleFormProps {
  handleModalClose: () => void;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}

const AddScheduleForm = ({ handleModalClose }: AddScheduleFormProps) => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [tags, setTags] = useState<string[]>([]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDateRange([start ? dayjs(start) : null, end ? dayjs(end) : null]);
  };

  const removeTag = (tagId: number) => {
    setTags(tags.filter((tag, id) => id != tagId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return; // 엔터키가 아닌 경우 무시
    const value = e.currentTarget.value.trim(); // 공백 제거
    if (value && !tags.includes(value)) {
      // 중복 태그 방지
      setTags([...tags, value]); // 새로운 태그 추가
    }
    e.currentTarget.value = '';
  };

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick, className }, ref) => (
    <Button className={className} onClick={onClick} ref={ref} buttonSize="normal" bgColor="ghost">
      <FaCalendar />
      <span className={`flex-1 text-center font-normal text-base ${!value ? 'text-gray-a9' : null}`}>
        {value ? value : '날짜를 선택해주세요'}
      </span>
    </Button>
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    // react-hook-form 사용
    <form className="flex flex-col gap-[30px]">
      {/* 입력한 글자수 표기 */}
      <Input
        title="제목"
        type="text"
        name="title"
        inputSize="normal"
        placeholder="제목"
        className="h-[46px] text-base"
      />

      <div className="w-[332px]">
        <label className="flex flex-col text-xl font-semibold">
          <span className="mb-2">날짜</span>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년MM월dd일"
            selectsRange={true}
            startDate={startDate ? startDate.toDate() : undefined}
            endDate={endDate ? endDate.toDate() : undefined}
            onChange={handleDateChange}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-between items-center px-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // 기본 동작 방지
                    decreaseMonth();
                  }}
                  disabled={prevMonthButtonDisabled}
                  className="text-xl">
                  <MdKeyboardArrowLeft />
                </button>
                <span className="text-lg">
                  {dayjs(date).format('YYYY년 MM월')} {/* "2024년 10월" 형식으로 표시 */}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // 기본 동작 방지
                    increaseMonth();
                  }}
                  disabled={nextMonthButtonDisabled}
                  className="text-xl">
                  <MdKeyboardArrowRight />
                </button>
              </div>
            )}
            customInput={
              <CustomInput className="flex justify-center items-center h-[46px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98" />
            }
            className="w-[332px]"
            calendarClassName="custom-calendar"
          />
        </label>
      </div>

      <div className="flex gap-[11px]">
        <DropdownBox dataType="time" title="시작 시간" className="w-[166px] h-[46px]" dropdownClassName="w-[166px]" />
        <DropdownBox dataType="time" title="종료 시간" className="w-[166px] h-[46px]" dropdownClassName="w-[166px]" />
      </div>

      <div className="flex gap-[11px]">
        <DropdownBox
          dataType="category"
          title="카테고리"
          className="w-[166px] h-[46px]"
          dropdownClassName="w-[166px]"
        />
        <DropdownBox dataType="color" title="색상" className="w-[166px] h-[46px]" dropdownClassName="w-[166px]" />
      </div>

      {/* 태그 최대개수 제한 논의 */}
      <label className="flex flex-col text-xl font-semibold">
        <span className="mb-2">태그</span>
        <div className="px-4 flex items-center flex-wrap gap-2 rounded-lg border border-gray-d9 focus-within:border-gray-98">
          {tags.map((tag, id) => (
            <div key={id} className="flex gap-1 py-2 px-3 rounded-lg bg-gray-200 text-sm">
              <span className="text-[15px]">{tag}</span>
              <span onClick={() => removeTag(id)} className="flex items-center text-[15px] cursor-pointer">
                <MdOutlineCancel />
              </span>
            </div>
          ))}
          <input
            title="태그"
            type="text"
            name="tag"
            placeholder={tags.length == 0 ? '엔터를 입력하여 태그를 등록해주세요' : ''}
            className="py-3 h-[46px] flex-grow rounded-lg text-base font-normal"
            onKeyDown={handleKeyDown}
          />
        </div>
      </label>

      {/* 입력한 글자수 표기 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="memo" className="text-xl font-semibold">
          메모
        </label>
        <textarea
          name="memo"
          id="memo"
          placeholder="메모를 입력해주세요"
          className="h-[143px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98 focus:outline-none resize-none text-base"
        />
      </div>

      <div className="flex gap-[20px]">
        <Button
          buttonSize="normal"
          bgColor="ghost"
          onClick={handleModalClose}
          className="w-[200px] h-[52px] bg-gray-ef border-none font-bold text-[18px]">
          취소
        </Button>
        <Button
          buttonSize="normal"
          bgColor="filled"
          className="w-[390px] h-[52px] bg-blue-33 border-none font-bold text-[18px]">
          작성
        </Button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
