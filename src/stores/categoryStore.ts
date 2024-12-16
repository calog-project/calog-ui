import { TCategoryState } from '@/types/category';
import { create } from 'zustand';

export const useCategoryStore = create<TCategoryState>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
}));
