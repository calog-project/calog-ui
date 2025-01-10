import Image from 'next/image';
import { useRef, useState } from 'react';
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
  onChange?: (value: string) => void;
}

const DropdownBox = ({ dataType, title, className, dropdownClassName, onChange }: DropdownBoxProps) => {
  const { isOpen, toggleState } = useToggleHook();
  const { categories } = useCategoryStore();
  const itemRef = useRef<HTMLDivElement>(null);
  const exceptionRef = useRef<HTMLDivElement>(null);

  const [item, setItem] = useState<{ name: string; color?: string; id?: string }>({ name: '' });

  const DropdownClass = twMerge(
    'mt-2 flex cursor-pointer justify-between items-center gap-2 rounded-lg border border-solid border-gray-200 py-2 px-3 text-[18px]',
    className,
  );

  const timeSlots = generateTimeSlots(0, 23, 30);

  const categoryArray = categories.map((category) => ({
    id: category.id,
    name: category.name,
    color: category.color,
  }));

  const timeData = timeSlots.map((time) => ({
    name: time,
  }));

  const dataMap: Record<string, any[]> = {
    time: timeData,
    category: categoryArray,
  };

  const data = dataMap[dataType] || [];

  const handleItemClick = (value: string) => {
    const selectedItem = data.find((item) => item.name === value || item.id === value);
    setItem(selectedItem || value);
    toggleState();
    onChange?.(String(value));
  };

  useOutsideClick(itemRef, toggleState, exceptionRef);

  return (
    <div className="relative">
      <label htmlFor="introduction" className="mb-2 text-[20px] font-semibold">
        {title}
      </label>

      <div className={DropdownClass} onClick={toggleState} ref={exceptionRef}>
        <div className={dataType === 'category' ? 'flex items-center gap-5' : ''}>
          {dataType === 'category' && item.color && (
            <span className="w-7 h-7 rounded-full" style={{ backgroundColor: item.color }} />
          )}
          <span className={`text-[14px] ${item.name ? 'text-black font-medium' : 'text-gray-78'}`}>
            {item.name || `${title}`}
          </span>
        </div>
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
