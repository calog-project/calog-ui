import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/addSchedule/AddScheduleButton';

export default function MainPage() {
  return (
    <section className="h-dvh flex relative">
      <Sidebar />
      <AddScheduleButton />
    </section>
  );
}
