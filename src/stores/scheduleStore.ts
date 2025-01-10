import { create } from 'zustand';
import { TScheduleStore } from '@/types/schedule';

export const useScheduleStore = create<TScheduleStore>((set) => ({
  title: null,
  startDate: null,
  endDate: null,
  startTime: '00:00',
  endTime: '00:00',
  categoryId: '1',
  joiner: [],
  description: null,
  setScheduleFormReset: () =>
    set({
      joiner: [],
      startDate: null,
      endDate: null,
      startTime: '00:00',
      endTime: '00:00',
      categoryId: '1',
    }),
  setTitle: (title) => set({ title }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setJoiner: (joiner) => set({ joiner }),
  setDescription: (description) => set({ description }),
}));
