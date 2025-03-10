import { ChangeEvent, forwardRef, KeyboardEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineCancel, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import { FaCalendar } from 'react-icons/fa';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import utc from 'dayjs/plugin/utc';
import Button from '@/components/commons/button/Button';
import DropdownBox from '@/components/commons/dropdown/DropdownBox';
import Input from '@/components/commons/input/Input';
import '@/style/customDatepicker.css';

dayjs.extend(utc);

interface AddScheduleFormProps {
  handleModalClose: () => void;
}

interface AddScheduleForm {
  author: number;
  title: string;
  date: Date;
  start: Date;
  end: Date;
  category?: string;
  tag?: number[]; // 친구 태그로 변경 시 "joiner"로 필드명 변경 예정
  description?: string;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}

const AddScheduleForm = ({ handleModalClose }: AddScheduleFormProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [inputCount, setInputCount] = useState<number>(0);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddScheduleForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AddScheduleForm> = async (data) => {
    try {
      const startDateTime = dayjs(startDate)
        .hour(Number(startTime?.split(':')[0]))
        .minute(Number(startTime?.split(':')[1]))
        .utc()
        .toISOString();

      const endDateTime = dayjs(endDate)
        .hour(Number(endTime?.split(':')[0]))
        .minute(Number(endTime?.split(':')[1]))
        .utc()
        .toISOString();

      const requestData = {
        // TODO: author 하드코딩 변경
        author: 1,
        title: data.title,
        start: startDateTime,
        end: endDateTime,
        category: category || null,
        tag: tags,
        description: data.description || null,
      };
      console.log('requestData', requestData);
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_CALOG_API_URL}/api/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('일정추가 실패');
      }

      const result = await response.json();
      console.log('일정추가 성공', result);
    } catch (error) {
      console.error('일정추가 에러', error);
      throw new Error('일정추가 실패');
    }
  };

  const removeTag = (tagId: number) => {
    setTags(tags.filter((tag, id) => id != tagId));
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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
      <span className={`flex-1 text-center text-[14px] font-normal ${!value ? 'text-gray-a9' : null}`}>
        {value ? value : '날짜를 선택해주세요'}
      </span>
    </Button>
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    <form className="flex flex-col gap-[30px]" onSubmit={handleSubmit(onSubmit)}>
      {/* 입력한 글자수 표기 */}
      <div>
        <Input
          title="제목"
          type="text"
          name="title"
          inputSize="normal"
          placeholder="제목"
          register={register('title', {
            required: '제목은 필수 입력값입니다.',
          })}
          onChange={handleOnInput}
          error={errors.title}
          className="h-[46px] text-[14px]"
          maxLength={24}
          inputCount={inputCount}
        />
      </div>

      <div className="w-[332px]">
        <label className="flex flex-col text-[20px] font-semibold">
          <span className="mb-2">날짜</span>
          <Controller
            control={control}
            name="date"
            rules={{ required: '날짜는 필수 입력값입니다.' }}
            render={({ field: { onBlur, onChange } }) => {
              return (
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy년MM월dd일"
                  selectsRange={true}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  onChange={(dates) => {
                    const [start, end] = dates as [Date | null, Date | null];
                    setStartDate(start);
                    setEndDate(end);
                    onChange([start, end]);
                  }}
                  onCalendarClose={onBlur} // 포커스를 잃을 때 onBlur 호출
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
                          e.stopPropagation();
                          decreaseMonth();
                        }}
                        disabled={prevMonthButtonDisabled}
                        className="text-xl">
                        <MdKeyboardArrowLeft />
                      </button>
                      <span className="text-[14px]">{dayjs(date).format('YYYY년 MM월')}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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
              );
            }}
          />
        </label>
        {errors?.date && <span className="text-[14px] text-red">{errors.date.message}</span>}
      </div>

      <div className="flex gap-[11px]">
        <DropdownBox
          dataType="time"
          title="시작 시간"
          className="w-[166px] h-[46px]"
          dropdownClassName="w-[166px]"
          onChange={(value) => setStartTime(value)}
        />
        <DropdownBox
          dataType="time"
          title="종료 시간"
          className="w-[166px] h-[46px]"
          dropdownClassName="w-[166px]"
          onChange={(value) => setEndTime(value)}
        />
      </div>

      <div className="flex gap-[11px]">
        <DropdownBox
          dataType="category"
          title="카테고리"
          className="w-[166px] h-[46px]"
          dropdownClassName="w-[166px]"
          onChange={(value) => setCategory(value)}
        />
        <DropdownBox dataType="category" title="색상" className="w-[166px] h-[46px]" dropdownClassName="w-[166px]" />
      </div>

      {/* 태그 최대개수 제한 논의 */}
      <label className="flex flex-col text-[20px] font-semibold">
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
            className="py-3 h-[46px] flex-grow rounded-lg text-[14px] font-normal"
            onKeyUp={handleKeyUp}
          />
        </div>
      </label>

      {/* 입력한 글자수 표기 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="memo" className="text-[20px] font-semibold">
          메모
        </label>
        <textarea
          name="memo"
          id="memo"
          placeholder="메모를 입력해주세요"
          className="h-[143px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98 focus:outline-none resize-none text-[14px]"
          maxLength={500}
          onChange={handleOnInput}
        />
        <p className="flex justify-end text-[12px]">
          <span>{inputCount}</span>
          <span>/500</span>
        </p>
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
          type="submit"
          buttonSize="normal"
          bgColor="filled"
          disabled={!isValid}
          className={`w-[390px] h-[52px] ${!isValid ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-80' : 'bg-blue-600 hover:bg-blue-700'} border-none font-bold text-[18px]`}>
          작성
        </Button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
