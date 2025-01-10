export type TCategoryProps = {
  openModal?: boolean;
  handleModalClose: () => void;
  mode: 'add' | 'edit';
  categoryId?: number;
};

export type TCategory = {
  aggregateId: string;
  id: number;
  userId: number;
  name: string;
  color: string;
};

export type TCategoryState = {
  categories: TCategory[];
  setCategories: (categories: TCategory[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

export type TEditCategoryState = {
  editCategory: boolean;
  setEditCategory: (category: boolean) => void;
};
