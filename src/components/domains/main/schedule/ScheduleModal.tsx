import Modal from '@/components/commons/modal/Modal';
import ScheduleForm from './form/ScheduleForm';
import { TScheduleProps } from '@/types/schedule';
import AddScheduleForm from '../addSchedule/AddScheduleForm';

const ScheduleModal = ({ openModal, handleModalClose, mode }: TScheduleProps) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal
      openModal={openModal}
      handleModalClose={handleModalClose}
      className="flex flex-col p-[30px] w-[670px] h-full overflow-scroll overflow-x-auto">
      <ScheduleForm handleModalClose={handleModalClose} mode={mode} />
    </Modal>
  );
};

export default ScheduleModal;
