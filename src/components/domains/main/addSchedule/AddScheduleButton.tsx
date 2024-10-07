'use client';

import Image from 'next/image';
import useModal from '@/hooks/useModal';
import React from 'react';
import whiteCircle from '../../../../../public/images/whiteCircle.svg';
import plus from '../../../../../public/images/plus.svg';
import AddScheduleModal from './AddScheduleModal';

const AddScheduleButton = () => {
  const {
    openModal: addScheduleOpenModal,
    handleModalClose: addScheduleClose,
    handleModalOpen: addScheduleModalOpen,
  } = useModal();

  return (
    <>
      <AddScheduleModal openModal={addScheduleOpenModal} handleModalClose={addScheduleClose} />
      <div className="absolute right-10 bottom-14 cursor-pointer" onClick={addScheduleModalOpen}>
        <Image src={whiteCircle} alt="whiteCircle" />
        <div className="absolute inset-0 flex justify-center items-center">
          <Image src={plus} alt="plus" />
        </div>
      </div>
    </>
  );
};

export default AddScheduleButton;
