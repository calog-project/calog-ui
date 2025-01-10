import { TSchedule, TScheduleProps } from '@/types/schedule';
import { useForm } from 'react-hook-form';
import ScheduleDatePicker from './ScheduleDatePicker';
import { useScheduleStore } from '@/stores/scheduleStore';
import ScheduleDropdowns from './ScheduleDropdowns';
import JoinerTagField from './JoinerTagField';
import ScheduleMemoField from './ScheduleMemoField';
import Button from '@/components/commons/button/Button';
import dayjs from 'dayjs';
import { AddSchedule } from '@/actions/schedule';
import ScheduleTitleField from './ScheduleTitleField';

const ScheduleForm = ({ handleModalClose, mode }: TScheduleProps) => {
  const {
    title,
    setTitle,
    joiner,
    setJoiner,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    categoryId,
    setCategoryId,
    setScheduleFormReset,
  } = useScheduleStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TSchedule>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: TSchedule) => {
    const startDateTime = dayjs(startDate)
      .hour(Number((startTime || '00:00').split(':')[0]))
      .minute(Number((startTime || '00:00').split(':')[1]))
      .utc()
      .toISOString();

    const endDateTime = dayjs(endDate)
      .hour(Number((endTime || '00:00').split(':')[0]))
      .minute(Number((endTime || '00:00').split(':')[1]))
      .utc()
      .toISOString();

    if (mode === 'add') await AddSchedule(data, joiner, startDateTime, endDateTime, categoryId, setScheduleFormReset);
    // if (mode === 'detail') await AddSchedule(data, joiner, startDateTime, endDateTime, categoryId, setScheduleFormReset);
    // if (mode === 'edit') await AddSchedule(data, joiner, startDateTime, endDateTime, categoryId, setScheduleFormReset);

    reset();
    setScheduleFormReset();
    handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ScheduleTitleField register={register} errors={errors} />
      <div className="flex flex-col gap-[30px]">
        <ScheduleDatePicker errors={errors} control={control} />
        <ScheduleDropdowns />
        <JoinerTagField />
        <ScheduleMemoField register={register} />
        <div className="flex justify-between w-full gap-10 mt-10">
          <Button
            type="button"
            bgColor="ghost"
            buttonSize="normal"
            className="text-black-17 font-bold py-5 rounded-[5px]"
            onClick={() => {
              handleModalClose();
              reset();
              setScheduleFormReset();
            }}>
            취소
          </Button>
          <Button
            type="submit"
            bgColor="filled"
            buttonSize="normal"
            className={`bg-blue-33 text-white font-bold py-5 rounded-[5px] ${!isValid && 'cursor-not-allowed bg-gray-ef !text-black-17'}`}>
            {mode === 'add' ? '작성' : mode === 'edit' ? '저장' : '수정'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ScheduleForm;
