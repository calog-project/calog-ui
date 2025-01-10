import Modal from '@/components/commons/modal/Modal';
import CategoryForm from './CategoryForm';
import { TCategoryProps } from '@/types/category';

const CategoryModal = ({ openModal, handleModalClose, mode, categoryId }: TCategoryProps) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal openModal={openModal} handleModalClose={handleModalClose} className="p-10 rounded-[5px] w-[500px]">
      <CategoryForm handleModalClose={handleModalClose} mode={mode} categoryId={categoryId} />
    </Modal>
  );
};

export default CategoryModal;
