import Modal from '@/components/commons/modal/Modal';
import CategoryForm from './CategoryForm';

interface CategoryModalProps {
  isOpenModal: boolean;
  categoryFormModalClose: () => void;
  mode: 'add' | 'edit';
}

const CategoryModal = ({ isOpenModal, categoryFormModalClose, mode }: CategoryModalProps) => {
  if (!isOpenModal) {
    return null;
  }

  return (
    <Modal openModal={isOpenModal} handleModalClose={categoryFormModalClose} className="p-10 rounded-[5px] w-[500px]">
      <CategoryForm categoryFormModalClose={categoryFormModalClose} mode={mode} />
    </Modal>
  );
};

export default CategoryModal;
