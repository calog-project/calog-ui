import Modal from '@/components/commons/modal/Modal';
import CategoryForm from './CategoryForm';

type TCategoryModalProps = {
  isOpenModal: boolean;
  categoryFormModalClose: () => void;
  mode: 'add' | 'edit';
  categoryId?: number;
};

const CategoryModal = ({ isOpenModal, categoryFormModalClose, mode, categoryId }: TCategoryModalProps) => {
  if (!isOpenModal) {
    return null;
  }

  return (
    <Modal openModal={isOpenModal} handleModalClose={categoryFormModalClose} className="p-10 rounded-[5px] w-[500px]">
      <CategoryForm categoryFormModalClose={categoryFormModalClose} mode={mode} categoryId={categoryId} />
    </Modal>
  );
};

export default CategoryModal;
