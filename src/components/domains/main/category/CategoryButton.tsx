'use client';

import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import Popover from '@/components/commons/popover/Popover';
import { useCategoryStore } from '@/stores/categoryStore';
import { TCategory } from '@/types/category';
import useModal from '@/hooks/useModal';
import CategoryModal from './CategoryModal';
import { deleteCategory } from '@/actions/category';

type TCategoryButtonProps = {
  handleCategoryClick: (category: string) => void;
  category: TCategory;
};

const CategoryButton = ({ handleCategoryClick, category }: TCategoryButtonProps) => {
  const { aggregateId, id: categoryId, name, color } = category;
  const [isPopoverOpen, setPopoverOpen] = useState<number | null>(null);
  const { selectedCategories } = useCategoryStore();
  const { openModal, handleModalClose, handleModalOpen } = useModal();

  const categoryPopoverItems = [
    {
      label: '수정',
      onClick: () => {
        handleModalOpen();
      },
    },
    {
      label: '삭제',
      onClick: async () => {
        if (confirm('정말 삭제하시겠습니까?'))
          try {
            const isDeleted = await deleteCategory(categoryId);
            if (isDeleted) {
              alert('카테고리를 성공적으로 삭제했습니다.');
            } else {
              alert('카테고리 삭제를 실패했습니다.');
            }
          } catch (error) {
            alert('삭제 중 에러가 발생했습니다.');
          }
      },
    },
  ];

  return (
    <>
      <div
        className={`relative flex justify-center items-center w-full h-[50px] bg-white border rounded-[10px] text-center font-medium gap-[5px] cursor-pointer ${
          selectedCategories.includes(name) ? 'border-blue-33' : 'border-gray-98'
        }`}
        onClick={() => handleCategoryClick(name)}>
        <span className="w-[20px] h-[20px] mr-2 rounded-full" style={{ backgroundColor: color }} />
        {name}
        {aggregateId === 'defaultPersonalCategory' || aggregateId === 'defaultSharedCategory' ? null : (
          <button
            className="absolute right-4 top-1 text-black"
            onClick={(e) => {
              e.stopPropagation();
              setPopoverOpen((prevId) => (prevId === categoryId ? null : categoryId));
            }}>
            <IoIosMore className="w-8 h-8 font-bold" />
          </button>
        )}
        {isPopoverOpen === categoryId && <Popover items={categoryPopoverItems} onClose={() => setPopoverOpen(null)} />}
      </div>
      {openModal && (
        <CategoryModal mode="edit" handleModalClose={handleModalClose} openModal={openModal} categoryId={categoryId} />
      )}
    </>
  );
};

export default CategoryButton;
