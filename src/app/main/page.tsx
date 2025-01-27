import Header from '@/components/domains/landing/header/Header';
import Sidebar from '@/components/commons/sidebar/Sidebar';
import AddScheduleButton from '@/components/domains/main/schedule/form/AddScheduleButton';
import MainCalendar from '@/components/domains/main/calendar/MainCalendar';
import MiniCalendar from '@/components/domains/main/calendar/MiniCalendar';
import Category from '@/components/domains/main/category/Category';
import { fetchCategories } from '@/actions/category';
import { fetchCalendar } from '@/actions/calendar';
import dayjs from 'dayjs';

export default async function MainPage() {
  const categoriesData = await fetchCategories();
  const calendarData = await fetchCalendar({ date: dayjs().format('YYYY-MM-DD') });

  return (
    <>
      <Header />
      <main className="relative flex w-full h-full max-w-[1440px] mx-auto my-10">
        <Sidebar />
        <AddScheduleButton categoriesData={categoriesData} />
        <div className="flex flex-1 flex-col w-full h-full px-10 gap-10">
          <section className="flex justify-center items-center gap-10 w-full">
            <MiniCalendar />
            <Category categoriesData={categoriesData} />
          </section>
          <section className="flex gap-10 w-full h-full">
            <MainCalendar calendarData={calendarData} />
          </section>
        </div>
      </main>
    </>
  );
}
