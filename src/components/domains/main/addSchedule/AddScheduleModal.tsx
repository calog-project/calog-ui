import Modal from '@/components/commons/modal/Modal';
import AddScheduleForm from './AddScheduleForm';

interface AddScheduleModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const AddScheduleModal = ({ openModal, handleModalClose }: AddScheduleModalProps) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal
      openModal={openModal}
      handleModalClose={handleModalClose}
      className="w-[670px] h-full p-[30px] overflow-y-scroll">
      <AddScheduleForm handleModalClose={handleModalClose} />
    </Modal>
  );
};

export default AddScheduleModal;
