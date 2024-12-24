import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/addSchedule/AddScheduleButton';
import MainCalendar from '@/components/domains/main/calendar/MainCalendar';
import MiniCalendar from '@/components/domains/main/calendar/MiniCalendar';
import Category from '@/components/domains/main/category/Category';
import ScheduleList from '@/components/domains/main/schedule/ScheduleList';
import { fetchCategories } from '@/actions/category';
import { Schedule } from '@/types/schedule';

const schedules: Schedule[] = [
  { startDate: '2024-12-20', endDate: '2024-12-23', title: '캘로그', color: '#000000' },
  { startDate: '2024-12-25', endDate: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { startDate: '2024-12-25', endDate: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { startDate: '2024-12-25', endDate: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { startDate: '2024-12-25', endDate: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { startDate: '2024-12-25', endDate: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { startDate: '2025-1-1', endDate: '2025-1-1', title: '새해', color: '#3366fe' },
];

export default async function MainPage() {
  const categories = await fetchCategories();

  return (
    <>
      <Sidebar />
      <AddScheduleButton />
      <div className="flex flex-1 flex-col w-full h-full px-10 gap-10">
        <div className="flex justify-center items-center gap-10 w-full">
          <MiniCalendar />
          <Category categories={categories} />
        </div>
        <section className="flex gap-10 w-full h-full">
          <MainCalendar schedules={schedules} />
          <ScheduleList schedules={schedules} />
        </section>
      </div>
    </>
  );
}
