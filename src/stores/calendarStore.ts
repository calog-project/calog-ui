import { TCalendarState } from '@/types/calendar';
import { create } from 'zustand';

export const useCalendarStore = create<TCalendarState>((set) => ({
  updateCalendarData: {
    categories: [],
    schedules: [],
  },
  setUpdateCalendarData: (calendar) => set({ updateCalendarData: calendar }),
}));
