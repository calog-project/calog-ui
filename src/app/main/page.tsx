import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/addSchedule/AddScheduleButton';
import MainCalendar from '@/components/domains/main/calendar/MainCalendar';
import MiniCalendar from '@/components/domains/main/calendar/MiniCalendar';

export default function MainPage() {
  return (
    <>
      <Sidebar />
      <AddScheduleButton />
      <div className="flex flex-1 flex-col w-full h-full px-10 gap-10">
        <div className="flex justify-center items-center gap-10 w-full">
          <MiniCalendar />
        </div>
        <MainCalendar />
      </div>
    </>
  );
}
