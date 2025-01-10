import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/schedule/form/AddScheduleButton';
import MainCalendar from '@/components/domains/main/calendar/MainCalendar';
import MiniCalendar from '@/components/domains/main/calendar/MiniCalendar';
import Category from '@/components/domains/main/category/Category';
import ScheduleList from '@/components/domains/main/schedule/ScheduleList';
import { fetchCategories } from '@/actions/category';
import Header from '@/components/domains/landing/header/Header';

const schedules = [
  { id: 1, start: '2024-12-20', end: '2024-12-23', title: '캘로그', color: '#000000' },
  { id: 2, start: '2024-12-25', end: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { id: 3, start: '2024-12-25', end: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { id: 4, start: '2024-12-25', end: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { id: 5, start: '2024-12-25', end: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { id: 6, start: '2024-12-25', end: '2024-12-25', title: '크리스마스', color: '#3366fe' },
  { id: 7, start: '2025-1-1', end: '2025-1-1', title: '새해', color: '#3366fe' },
];

export default async function MainPage() {
  const categoriesData = await fetchCategories();

  return (
    <>
      <Header />
      <main className="relative flex w-full h-full max-w-[1440px] mx-auto my-10">
        <Sidebar />
        <AddScheduleButton categoriesData={categoriesData} />
        <div className="flex flex-1 flex-col w-full h-full px-10 gap-10">
          <section className="flex justify-center items-center gap-10 w-full">
            <MiniCalendar />
            <Category categories={categoriesData} />
          </section>
          <section className="flex gap-10 w-full h-full">
            <MainCalendar schedules={schedules} />
            <ScheduleList schedules={schedules} />
          </section>
        </div>
      </main>
    </>
  );
}
