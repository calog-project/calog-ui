import AddScheduleButton from '@/components/domains/main/schedule/form/AddScheduleButton';
import MainCalendar from '@/components/domains/main/calendar/MainCalendar';
import MiniCalendar from '@/components/domains/main/calendar/MiniCalendar';
import Category from '@/components/domains/main/category/Category';
import { fetchCategories } from '@/actions/category';

export default async function MainPage() {
  const categoriesData = await fetchCategories();

  return (
    <main className="relative flex flex-1 w-full h-full px-10 pb-10 overflow-hidden mt-[70px]">
      <div className="flex flex-col gap-10">
        <MiniCalendar />
        <Category categoriesData={categoriesData} />
      </div>
      <AddScheduleButton categoriesData={categoriesData} />
      <div className="w-full h-full pl-10 flex-1">
        <MainCalendar />
      </div>
    </main>
  );
}
