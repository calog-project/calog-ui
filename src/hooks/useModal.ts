import { useRef, useState } from 'react';
import useHandleModalClick from './useHandleModalClick';

const useModal = () => {
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
    // 모달이 열려있을때 전체 페이지에서 스크롤 비활성화
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setOpenModal(false);
    // 모달이 닫히면 전체 페이지에서 스크롤을 다시 활성화
    document.body.style.overflow = 'auto';
  };

  useHandleModalClick(modalRef, handleModalClose);

  return {
    modalRef,
    openModal,
    handleModalOpen,
    handleModalClose,
  };
};

export default useModal;
