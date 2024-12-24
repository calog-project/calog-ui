export type TCategory = {
  aggregateId: string;
  id: number;
  userId: number;
  name: string;
  color: string;
};

export type TCategoryState = {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

export type TEditCategoryState = {
  editCategory: boolean;
  setEditCategory: (category: boolean) => void;
};
