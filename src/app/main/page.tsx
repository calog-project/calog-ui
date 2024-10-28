import MainCalendar from '@/components/commons/calendar/MainCalendar';
import MiniCalendar from '@/components/commons/calendar/MiniCalendar';
import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/addSchedule/AddScheduleButton';

export default function MainPage() {
  return (
    <section className="h-dvh flex relative">
      <Sidebar />
      <AddScheduleButton />
      <div className="m-10 flex-1 flex-col">
        <MiniCalendar />
        <MainCalendar />
      </div>
    </section>
  );
}
