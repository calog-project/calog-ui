import { TSchedule, TScheduleProps } from '@/types/schedule';
import { useForm } from 'react-hook-form';
import ScheduleDatePicker from './ScheduleDatePicker';
import { useScheduleStore } from '@/stores/scheduleStore';
import ScheduleDropdowns from './ScheduleDropdowns';
import JoinerTagField from './JoinerTagField';
import ScheduleMemoField from './ScheduleMemoField';
import Button from '@/components/commons/button/Button';
import dayjs from 'dayjs';
import { addSchedule, deleteSchedule, editSchedule, getScheduleDetail } from '@/actions/schedule';
import ScheduleTitleField from './ScheduleTitleField';
import { IoIosClose } from 'react-icons/io';
import { fetchCalendar } from '@/actions/calendar';
import useCalendar from '@/hooks/useCalendar';
import { useCalendarStore } from '@/stores/calendarStore';
import { useEffect } from 'react';

const ScheduleForm = ({ handleModalClose, mode, scheduleData }: TScheduleProps) => {
  const {
    joiner,
    // setJoiner, 추후 기능 구현 예정
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
  const { setCurrentDate } = useCalendar();
  const { setUpdateCalendarData } = useCalendarStore();
  const scheduleId = scheduleData?.id;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TSchedule>({
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      if (mode === 'detail' && scheduleId) {
        const scheduleDetail = await getScheduleDetail(scheduleId);

        if (scheduleDetail) {
          reset({
            title: scheduleDetail.title,
            joiner: scheduleDetail.joiner,
            description: scheduleDetail.description,
          });
          setCategoryId(scheduleDetail.categoryId);
          setStartDate(new Date(dayjs(scheduleDetail.start).format('YYYY-MM-DD')));
          setEndDate(new Date(dayjs(scheduleDetail.end).format('YYYY-MM-DD')));
          setStartTime(dayjs(scheduleDetail.start).format('HH:mm'));
          setEndTime(dayjs(scheduleDetail.end).format('HH:mm'));
        }
      }
    };

    fetchScheduleDetail();
  }, [mode, scheduleId, reset, setCategoryId, setStartDate, setEndDate, setStartTime, setEndTime]);

  const formatDateTime = (date: Date | null, time: string | null) => {
    return dayjs(date)
      .hour(Number((time || '00:00').split(':')[0]))
      .minute(Number((time || '00:00').split(':')[1]))
      .toISOString();
  };

  const onSubmit = async (data: TSchedule) => {
    const startDateTime = formatDateTime(startDate, startTime);
    const endDateTime = formatDateTime(endDate, endTime);

    if (mode === 'add') {
      await addSchedule(data, joiner, startDateTime, endDateTime, categoryId, setScheduleFormReset);
      const updatedCalendarData = await fetchCalendar({
        date: dayjs(startDateTime).format('YYYY-MM-DD'),
      });
      setCurrentDate(dayjs(startDateTime));
      setUpdateCalendarData(updatedCalendarData);
    }

    if (mode === 'detail' && scheduleId) {
      const confirmEdit = confirm('해당 일정을 수정하시겠습니까?');
      if (!confirmEdit) return;
      await editSchedule(scheduleId, data, joiner, startDateTime, endDateTime, categoryId);
      const updatedCalendarData = await fetchCalendar({
        date: dayjs(startDateTime).format('YYYY-MM-DD'),
      });
      setUpdateCalendarData(updatedCalendarData);
    }
    handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative w-full ">
      <button
        className="absolute z-100 -top-10 -right-10 text-[40px] hover:opacity-80"
        type="button"
        onClick={() => {
          handleModalClose();
          reset();
          setScheduleFormReset();
        }}>
        <IoIosClose />
      </button>
      <ScheduleTitleField register={register} errors={errors} />
      <div className="flex flex-col gap-[30px]">
        <ScheduleDatePicker errors={errors} control={control} mode={mode} />
        <ScheduleDropdowns />
        <JoinerTagField register={register} />
        <ScheduleMemoField register={register} />
        <div className="flex justify-between w-full gap-10 mt-10">
          <Button
            type="button"
            bgColor="ghost"
            buttonSize="normal"
            className="text-black-17 font-bold py-5 rounded-[5px]"
            onClick={async () => {
              if (mode === 'detail' && scheduleId) {
                const confirmDelete = confirm('해당 일정을 삭제하시겠습니까?');
                if (!confirmDelete) return;

                await deleteSchedule(scheduleId);

                const updatedCalendarData = await fetchCalendar({
                  date: dayjs(startDate).format('YYYY-MM-DD'),
                });
                setUpdateCalendarData(updatedCalendarData);
                handleModalClose();
              } else {
                handleModalClose();
                reset();
                setScheduleFormReset();
              }
            }}>
            {mode === 'add' ? '취소' : '삭제'}
          </Button>
          <Button
            type="submit"
            bgColor="filled"
            buttonSize="normal"
            className={`bg-blue-33 text-white font-bold py-5 rounded-[5px] ${!isValid && 'cursor-not-allowed bg-gray-ef !text-black-17'}`}>
            {mode === 'add' ? '작성' : '수정'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ScheduleForm;
