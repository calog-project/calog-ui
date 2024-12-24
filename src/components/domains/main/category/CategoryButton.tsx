'use client';

import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import Popover from '@/components/commons/popover/Popover';
import { useCategoryStore } from '@/stores/categoryStore';
import { TCategory } from '@/types/category';
import useModal from '@/hooks/useModal';
import CategoryModal from './CategoryModal';

type TCategoryButtonProps = {
  handleCategoryClick: (category: string) => void;
  category: TCategory;
};

const CategoryButton = ({ handleCategoryClick, category }: TCategoryButtonProps) => {
  const { aggregateId, id, name } = category;
  const [isPopoverOpen, setPopoverOpen] = useState<number | null>(null);
  const { selectedCategories } = useCategoryStore();
  const {
    openModal: isOpenModal,
    handleModalClose: categoryFormModalClose,
    handleModalOpen: categoryFormModalOpen,
  } = useModal();

  const popoverItems = [
    {
      label: '수정',
      onClick: () => {
        categoryFormModalOpen();
      },
    },
    { label: '삭제', onClick: () => {} },
  ];

  return (
    <>
      <div
        className={`relative flex justify-center items-center w-full h-[70px] bg-white border rounded-[10px] text-center font-medium gap-[5px] cursor-pointer ${
          selectedCategories.includes(name) ? 'border-blue-33' : 'border-gray-98'
        }`}
        onClick={() => handleCategoryClick(name)}>
        {name}
        {aggregateId === 'defaultPersonalCategory' || aggregateId === 'defaultSharedCategory' ? null : (
          <button
            className="absolute right-4 top-1 text-black"
            onClick={(e) => {
              e.stopPropagation();
              setPopoverOpen((prevId) => (prevId === id ? null : id));
            }}>
            <IoIosMore className="w-8 h-8 font-bold" />
          </button>
        )}
        {isPopoverOpen === id && <Popover items={popoverItems} onClose={() => setPopoverOpen(null)} />}
      </div>
      {isOpenModal && (
        <CategoryModal
          mode="edit"
          categoryFormModalClose={categoryFormModalClose}
          isOpenModal={isOpenModal}
          categoryId={id}
        />
      )}
    </>
  );
};

export default CategoryButton;
