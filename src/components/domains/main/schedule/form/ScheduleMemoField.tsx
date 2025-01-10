import { TSchedule } from '@/types/schedule';
import { ChangeEvent, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

const ScheduleMemoInput = ({ register }: { register: UseFormRegister<TSchedule> }) => {
  const [memoCount, setMemoCount] = useState<number>(0);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemoCount(e.target.value.length);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className="text-[20px] font-semibold">
        메모
      </label>
      <textarea
        placeholder="메모를 입력해 주세요."
        id="description"
        {...register('description', {
          required: false,
          onChange: (e) => {
            handleOnInput(e);
          },
        })}
        maxLength={499}
        className="h-[143px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98 focus:outline-none resize-none text-[14px]"
      />
      <p className="flex justify-end text-[12px]">
        <span>{memoCount}</span>
        <span>/500</span>
      </p>
    </div>
  );
};

export default ScheduleMemoInput;
