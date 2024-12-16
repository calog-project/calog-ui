import Button from '@/components/commons/button/Button';
import { useState } from 'react';

const CategoryForm = ({ categoryFormModalClose, mode }: { categoryFormModalClose: () => void; mode: string }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#EFEFEF');

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      setNewCategoryName('');
      categoryFormModalClose();
    }
  };

  const handleEditCategory = () => {
    if (newCategoryName.trim() !== '') {
      setNewCategoryName('');
      categoryFormModalClose();
    }
  };

  return (
    <form>
      <h2 className="text-center font-bold mb-10 text-[18px]">
        {mode === 'add' ? '새로운 카테고리' : '카테고리 수정'}
      </h2>
      <div className="flex flex-col gap-5 w-full">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full p-5 border border-gray-300 rounded-lg mb-3"
          placeholder={mode === 'add' ? '카테고리 이름' : '수정할 카테고리 이름'}
        />
        <div className="relative flex items-center gap-10 w-full">
          <input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
            className="absolute inset-0 opacity-0 w-[50px] h-[50px] cursor-pointer"
          />
          <button
            type="button"
            className="w-[60px] h-[50px] rounded-full"
            style={{ backgroundColor: newCategoryColor }}
          />
          <label id="list" className="w-full p-5 border border-gray-300 rounded-lg font-medium">
            {newCategoryColor}
          </label>
        </div>
      </div>
      <div className="flex justify-between w-full gap-10 mt-10">
        <Button
          type="button"
          bgColor="ghost"
          buttonSize="normal"
          className="text-black-17 font-bold py-5 rounded-[5px] "
          onClick={categoryFormModalClose}>
          취소
        </Button>
        <Button
          type="submit"
          bgColor="filled"
          buttonSize="normal"
          className="bg-blue-33 text-white font-bold py-5 rounded-[5px]"
          onClick={mode === 'add' ? handleAddCategory : handleEditCategory}>
          {mode === 'add' ? '추가' : '수정'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
