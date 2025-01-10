import Input from '@/components/commons/input/Input';
import { TSchedule } from '@/types/schedule';
import { ChangeEvent, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const ScheduleTitleField = ({
  register,
  errors,
}: {
  register: UseFormRegister<TSchedule>;
  errors: FieldErrors<TSchedule>;
}) => {
  const [titleCount, setTitleCount] = useState<number>(0);

  const handleOnInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleCount(e.target.value.length);
  };

  return (
    <Input
      title="제목"
      type="text"
      name="title"
      inputSize="normal"
      placeholder="제목을 입력해 주세요."
      register={register('title', {
        required: '제목은 필수로 입력해 주세요.',
      })}
      onChange={handleOnInput}
      error={errors.title}
      className="h-[46px] text-[14px]"
      maxLength={23}
      inputCount={titleCount}
    />
  );
};

export default ScheduleTitleField;
