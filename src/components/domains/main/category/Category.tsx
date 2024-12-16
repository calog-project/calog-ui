'use client';

import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import { CgAddR } from 'react-icons/cg';
import Popover from '@/components/commons/popover/Popover';
import { useCategoryStore } from '@/stores/categoryStore';
import CategoryModal from './CategoryModal';
import useModal from '@/hooks/useModal';

const defaultCategories = ['새로운 카테고리', '기본', '공유'];
const customCategories = ['캘로그 회의', '술', '운동', '공부', '여행'];

const Category = () => {
  const ITEMS_PER_PAGE = 3;
  const { currentItems, currentPage, totalPages, goToNextPage, goToPrevPage } = usePagination(
    customCategories,
    ITEMS_PER_PAGE,
  );
  const { selectedCategories, setSelectedCategories } = useCategoryStore();
  const [isPopoverOpen, setPopoverOpen] = useState<number | null>(null);
  const {
    openModal: isOpenModal,
    handleModalClose: categoryFormModalClose,
    handleModalOpen: categoryFormModalOpen,
  } = useModal();

  const [editCategory, setEditCategory] = useState<boolean>(false);

  const popoverItems = [
    {
      label: '수정',
      onClick: () => {
        categoryFormModalOpen();
        setEditCategory(true);
      },
    },
    { label: '삭제', onClick: () => {} }, // 수정 예정
  ];

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
          {defaultCategories.map((category, index) => (
            <div
              key={index}
              className={`flex justify-center items-center w-full h-[70px] bg-white border rounded-[10px] text-center font-medium gap-[5px] cursor-pointer ${
                selectedCategories.includes(category) ? 'border-blue-33' : 'border-gray-98'
              }`}
              onClick={() => {
                category === '새로운 카테고리'
                  ? (categoryFormModalOpen(), setEditCategory(false))
                  : handleCategoryClick(category);
              }}>
              {category}
              {category === '새로운 카테고리' && <CgAddR className="text-blue-33" />}
            </div>
          ))}
          {isOpenModal && (
            <CategoryModal
              mode={editCategory ? 'edit' : 'add'}
              categoryFormModalClose={categoryFormModalClose}
              isOpenModal={isOpenModal}
            />
          )}
          {currentItems.map((category, index) => (
            <div
              key={index}
              className={`relative flex justify-center items-center w-full h-[70px] bg-white border rounded-[10px] text-center font-medium gap-[5px] cursor-pointer ${
                selectedCategories.includes(category) ? 'border-blue-33' : 'border-gray-98'
              }`}
              onClick={() => handleCategoryClick(category)}>
              {category}
              <button
                className="absolute right-4 top-1 text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setPopoverOpen((prevIndex) => (prevIndex === index ? null : index));
                }}>
                <IoIosMore className="w-8 h-8 font-bold" />
              </button>
              {isPopoverOpen === index && <Popover items={popoverItems} onClose={() => setPopoverOpen(null)} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
