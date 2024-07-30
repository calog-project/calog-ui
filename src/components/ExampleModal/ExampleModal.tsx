import Modal from '../Modal/Modal';

interface LoginModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const ExampleModal = ({ openModal, handleModalClose }: LoginModalProps) => {
  if (!openModal) {
    return null;
  }

  return <Modal openModal={openModal} handleModalClose={handleModalClose} className="w-[670px] h-[845px]" />;
};

export default ExampleModal;
