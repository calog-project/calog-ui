import { addCategory, editCategory } from '@/actions/category';
import Button from '@/components/commons/button/Button';
import { useState, useEffect } from 'react';

type TCategoryProps = {
  categoryFormModalClose: () => void;
  mode: string;
  categoryId?: number;
};

const CategoryForm = ({ categoryFormModalClose, mode, categoryId }: TCategoryProps) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#EFEFEF');

  useEffect(() => {
    if (mode === 'edit' && categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/${categoryId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) throw new Error('카테고리 상세를 불러오는데 실패했습니다.');

          const data = await response.json();
          setName(data.payload.data.name);
          setColor(data.payload.data.color);
        } catch (error) {
          console.error('카테고리 데이터 불러오기 실패:', error);
        }
      };

      fetchCategory();
    }
  }, [mode, categoryId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (mode === 'add') {
        await addCategory(formData);
      } else {
        await editCategory(formData);
      }
      categoryFormModalClose();
    } catch (error) {
      console.error(`${mode === 'add' ? '추가' : '수정'} 실패:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center font-bold mb-10 text-[18px]">
        {mode === 'add' ? '새로운 카테고리' : '카테고리 수정'}
      </h1>
      <div className="flex flex-col gap-5 w-full">
        <input
          type="text"
          name="name"
          className="w-full p-5 border border-gray-300 rounded-lg mb-3"
          placeholder={mode === 'add' ? '카테고리 이름' : '수정할 카테고리 이름'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="relative flex items-center gap-10 w-full">
          <input
            type="color"
            name="color"
            className="absolute inset-0 opacity-0 w-[50px] h-[50px] cursor-pointer"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            required
          />
          <button
            type="button"
            className="w-[60px] h-[50px] rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
          <label id="list" className="w-full p-5 border border-gray-300 rounded-lg font-medium">
            {color}
          </label>
        </div>
        {mode === 'edit' && <input type="hidden" name="categoryId" value={categoryId} />}
      </div>
      <div className="flex justify-between w-full gap-10 mt-10">
        <Button
          type="button"
          bgColor="ghost"
          buttonSize="normal"
          className="text-black-17 font-bold py-5 rounded-[5px]"
          onClick={categoryFormModalClose}>
          취소
        </Button>
        <Button
          type="submit"
          bgColor="filled"
          buttonSize="normal"
          className="bg-blue-33 text-white font-bold py-5 rounded-[5px]">
          {mode === 'add' ? '추가' : '수정'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
