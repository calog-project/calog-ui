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
    <Modal openModal={openModal} handleModalClose={handleModalClose} className="w-[670px] p-[30px]">
      <AddScheduleForm handleModalClose={handleModalClose} />
    </Modal>
  );
};

export default AddScheduleModal;
