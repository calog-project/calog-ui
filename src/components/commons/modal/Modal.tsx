'use client';

import ModalPortal from '@/utils/modalPortal';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps extends PropsWithChildren {
  openModal: boolean;
  handleModalClose?: () => void;
  className?: string;
}

const Modal = ({ children, openModal, className }: ModalProps) => {
  const modalClass = twMerge('bg-white rounded-[10px] z-50', className);

  const open = 'block';
  return (
    <ModalPortal>
      <div className="fixed inset-0 py-10 mx-auto z-[1200] h-full w-full flex justify-center items-center bg-black-overlay">
        <div onClick={(event) => event.stopPropagation()} className={`${modalClass} ${openModal ? open : ''}`}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
