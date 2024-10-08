'use client';

import ModalPortal from '@/utils/modalPortal';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps extends PropsWithChildren {
  openModal: boolean;
  handleModalClose: () => void;
  className?: string;
}

const Modal = ({ children, openModal, handleModalClose, className }: ModalProps) => {
  const modalClass = twMerge(
    'fixed top-1/2 left-1/2 bg-white rounded-lg z-50 transform -translate-x-1/2 -translate-y-1/2',
    className,
  );

  const open = 'block';
  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-[100] h-full w-full bg-black-overlay" onClick={handleModalClose}>
        <div onClick={(event) => event.stopPropagation()} className={`${modalClass} ${openModal ? open : ''}`}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
