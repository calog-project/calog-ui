import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleHook from '@/hooks/useToggleHook';
import downArrow from '../../../../public/images/downArrow.svg';
import upArrow from '../../../../public/images/upArrow.svg';
import DropdownList from './DropdownList';
import { twMerge } from 'tailwind-merge';
import Dropdown from './Dropdown';
import { useCategoryStore } from '@/stores/categoryStore';
import { generateTimeSlots } from '@/constants/generateTimeSlots';

interface DropdownBoxProps {
  dataType: 'category' | 'time';
  title?: string;
  className?: string;
  dropdownClassName?: string;
  value: string;
  onChange?: (value: string) => void;
}

const DropdownBox = ({ dataType, title, className, dropdownClassName, value, onChange }: DropdownBoxProps) => {
  const { isOpen, toggleState } = useToggleHook();
  const { categories } = useCategoryStore();
  const itemRef = useRef<HTMLDivElement>(null);
  const exceptionRef = useRef<HTMLDivElement>(null);

  const findItemByCategoryId = (value: string) => {
    if (!categories.length) {
      return { name: '기본', color: '#DDDDDD', id: '1' };
    }
    const selectedCategory = categories.find((category) => String(category.id) === String(value));
    return selectedCategory ?? { name: '기본', color: '#DDDDDD', id: '1' };
  };

  const findTimeSlotByValue = (value: string) => {
    return { name: value || '' };
  };

  const [item, setItem] = useState<{ name: string; color?: string; id?: string }>(
    dataType === 'category' ? findItemByCategoryId(value) : findTimeSlotByValue(value),
  );

  const categoryArray = categories.map((category) => ({
    id: String(category.id),
    name: category.name,
    color: category.color,
  }));

  const timeData = generateTimeSlots(0, 23, 30).map((time) => ({
    name: time,
  }));

  const dataMap: Record<string, any[]> = {
    time: timeData,
    category: categoryArray,
  };

  const data = dataMap[dataType] || [];

  const handleItemClick = (value: string) => {
    const selectedItem = data.find((item) => item.name === value || item.id === value);
    setItem(selectedItem || { name: value });
    toggleState();
    onChange?.(value);
  };

  useEffect(() => {
    setItem(dataType === 'category' ? findItemByCategoryId(value) : findTimeSlotByValue(value));
  }, [value, dataType, categories]);

  useOutsideClick(itemRef, toggleState, exceptionRef);

  return (
    <div className="relative">
      <label htmlFor="introduction" className="mb-2 text-[20px] font-semibold">
        {title}
      </label>

      <div
        className={twMerge(
          'mt-2 flex cursor-pointer justify-between items-center gap-2 rounded-lg border border-solid border-gray-200 py-2 px-3 text-[18px]',
          className,
        )}
        onClick={toggleState}
        ref={exceptionRef}>
        {dataType === 'category' ? (
          <div className="flex items-center gap-5">
            {item.color ? <span className="w-7 h-7 rounded-full" style={{ backgroundColor: item.color }} /> : null}
            <span className="text-black text-[14px]">{item.name}</span>
          </div>
        ) : (
          <span
            className={`text-[14px] ${item.name === '시작 시간' || item.name === '종료 시간' ? 'text-gray-78' : 'text-black font-medium'}`}>
            {item.name || title}
          </span>
        )}
        <div className="h-5 w-5 cursor-pointer">
          <Image
            src={isOpen ? upArrow : downArrow}
            width={24}
            height={24}
            alt={isOpen ? '드롭다운 열기' : '드롭다운 닫기'}
            priority
          />
        </div>
      </div>

      {isOpen && (
        <Dropdown className={dropdownClassName} itemRef={itemRef}>
          <DropdownList data={data} handleItemClick={handleItemClick} />
        </Dropdown>
      )}
    </div>
  );
};

export default DropdownBox;
