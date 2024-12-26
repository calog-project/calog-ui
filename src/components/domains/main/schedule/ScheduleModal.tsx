import Button from '@/components/commons/button/Button';
import Modal from '@/components/commons/modal/Modal';

interface ScheduleModalProps {
  isOpenModal: boolean;
  scheduleModalClose: () => void;
}

const ScheduleModal = ({ isOpenModal, scheduleModalClose }: ScheduleModalProps) => {
  if (!isOpenModal) {
    return null;
  }

  return (
    <Modal openModal={isOpenModal} handleModalClose={scheduleModalClose} className="p-10 rounded-[5px] w-[500px]">
      <div className="flex justify-between w-full gap-10 mt-10">
        <Button
          type="button"
          bgColor="ghost"
          buttonSize="normal"
          className="text-black-17 font-bold py-5 rounded-[5px]">
          삭제
        </Button>
        <Button
          type="button"
          bgColor="filled"
          buttonSize="normal"
          className="bg-blue-33 text-white font-bold py-5 rounded-[5px]">
          수정
        </Button>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
