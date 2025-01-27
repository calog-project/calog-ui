import { TCategory } from './category';
import { TSchedule } from './schedule';

export type TCalendar = {
  categories: TCategory[];
  schedules: TSchedule[];
};

export type TCalendarState = {
  updateCalendarData: TCalendar;
  setUpdateCalendarData: (calendar: TCalendar) => void;
};
