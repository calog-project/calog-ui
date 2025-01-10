'use client';

import { usePagination } from '@/hooks/usePagination';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { CgAddR } from 'react-icons/cg';
import { useCategoryStore } from '@/stores/categoryStore';
import CategoryModal from './CategoryModal';
import useModal from '@/hooks/useModal';
import CategoryButton from './CategoryButton';
import { TCategory } from '@/types/category';

const Category = ({ categories }: { categories: TCategory[] }) => {
  const ITEMS_PER_PAGE = 5;
  const { currentItems, currentPage, totalPages, goToNextPage, goToPrevPage } = usePagination(
    categories,
    ITEMS_PER_PAGE,
  );
  const { selectedCategories, setSelectedCategories } = useCategoryStore();

  const { openModal, handleModalClose, handleModalOpen } = useModal();

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex flex-col gap-[20px] w-full h-[250px] rounded-[8px] border border-gray-89 py-5 px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-bold">카테고리</h1>
        <div className="flex items-center gap-10">
          <MdArrowLeft
            className={`bg-white rounded-full border border-blue-33 text-[30px] text-blue-33  ${
              currentPage === 0 ? 'border-gray-78 text-gray-78 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={goToPrevPage}
          />
          <MdArrowRight
            className={`bg-white rounded-full border border-blue-33 text-[30px] text-blue-33  ${
              currentPage === totalPages - 1 ? 'border-gray-78 text-gray-78 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={goToNextPage}
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 w-full">
        <div className="grid grid-cols-3 grid-rows-2 gap-[20px] w-full">
          <div
            className="flex justify-center items-center w-full h-[70px] bg-white border rounded-[10px] text-center font-medium gap-[5px] cursor-pointer border-gray-98"
            onClick={handleModalOpen}>
            새로운 카테고리
            <CgAddR className="text-blue-33" />
          </div>
          {openModal && <CategoryModal mode="add" handleModalClose={handleModalClose} openModal={openModal} />}
          {currentItems.map((category) => (
            <CategoryButton key={category.id} category={category} handleCategoryClick={handleCategoryClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
