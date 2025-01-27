import Modal from '@/components/commons/modal/Modal';
import ScheduleForm from './form/ScheduleForm';
import { TScheduleProps } from '@/types/schedule';

const ScheduleModal = ({ openModal, handleModalClose, mode }: TScheduleProps) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal
      openModal={openModal}
      className="flex flex-col p-[30px] w-[670px] h-full overflow-scroll overflow-x-auto scrollbar-hide">
      <ScheduleForm handleModalClose={handleModalClose} mode={mode} />
    </Modal>
  );
};

export default ScheduleModal;
