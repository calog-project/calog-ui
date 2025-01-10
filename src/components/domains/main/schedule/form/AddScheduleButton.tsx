'use client';

import Image from 'next/image';
import useModal from '@/hooks/useModal';
import whiteCircle from '../../../../../../public/images/whiteCircle.svg';
import plus from '../../../../../../public/images/plus.svg';
import { TCategory } from '@/types/category';
import { useCategoryStore } from '@/stores/categoryStore';
import { useEffect } from 'react';
import ScheduleModal from '../ScheduleModal';

const AddScheduleButton = ({ categoriesData }: { categoriesData: TCategory[] }) => {
  const { openModal, handleModalClose, handleModalOpen } = useModal();
  const { categories, setCategories } = useCategoryStore();

  useEffect(() => {
    if (JSON.stringify(categories) !== JSON.stringify(categoriesData)) {
      setCategories(categoriesData);
    }
  }, [categoriesData, setCategories, categories]);

  return (
    <>
      <ScheduleModal openModal={openModal} handleModalClose={handleModalClose} mode="add" />
      <div className="fixed right-10 bottom-14 cursor-pointer z-[1000]" onClick={handleModalOpen}>
        <Image src={whiteCircle} alt="whiteCircle" />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image src={plus} alt="plus" />
        </div>
      </div>
    </>
  );
};

export default AddScheduleButton;
