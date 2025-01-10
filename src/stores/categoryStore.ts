import { TCategory, TCategoryState } from '@/types/category';
import { create } from 'zustand';

export const useCategoryStore = create<TCategoryState>((set) => ({
  categories: [],
  setCategories: (categories: TCategory[]) =>
    set((state) => {
      if (state.categories !== categories) {
        return { categories };
      }
      return state;
    }),
  selectedCategories: [],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
}));
