import Image from 'next/image';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleHook from '@/hooks/useToggleHook';
import downArrow from '../../../../public/images/downArrow.svg';
import upArrow from '../../../../public/images/upArrow.svg';
import Dropdown from './Dropdown';
import DropdownList from './DropdownList';
import { twMerge } from 'tailwind-merge';

// 추후에 분리
export const CATEGORIES_DATA = {
  project: '프로젝트',
  job: '직장',
};

export const CATEGORIES_COLORS_DATA = {
  blue: '#00FFF0',
};

// 주어진 시작 시간과 종료 시간 사이의 시간 슬롯 생성
const generateTimeSlots = (startHour: number, endHour: number, interval: number) => {
  const timeSlots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }
  return timeSlots;
};

interface DropdownBoxProps {
  dataType: string;
  title?: string;
  className?: string;
  dropdownClassName?: string;
}

const DropdownBox = ({ dataType, title, className, dropdownClassName }: DropdownBoxProps) => {
  const { isOpen, toggleState } = useToggleHook();
  const itemRef = useRef<HTMLDivElement>(null);
  const exceptionRef = useRef<HTMLDivElement>(null);

  const [item, setItem] = useState('');

  const DropdownClass = twMerge(
    'mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-solid border-gray-200 p-2 text-[18px]',
    className,
  );

  const timeSlots = generateTimeSlots(0, 23, 30); // 00AM to 11PM

  const categoryArray = Object.values(CATEGORIES_DATA);
  const colorArray = Object.values(CATEGORIES_COLORS_DATA);

  const dataMap: Record<string, string[]> = {
    time: timeSlots,
    category: categoryArray,
    color: colorArray,
  };

  const data = dataMap[dataType] || [];

  const handleItemClick = (value: string) => {
    setItem(value);
    toggleState();
  };

  useOutsideClick(itemRef, toggleState, exceptionRef);

  return (
    <div className="relative">
      <label htmlFor="introduction" className="mb-2 text-xl font-semibold">
        {title}
      </label>

      <div className={DropdownClass} onClick={toggleState} ref={exceptionRef}>
        <div className="h-5 w-5 cursor-pointer">
          {isOpen ? (
            <Image src={upArrow} width={24} height={24} alt="드롭다운 닫기" priority />
          ) : (
            <Image src={downArrow} width={24} height={24} alt="드롭다운 열기" priority />
          )}
        </div>
        {dataType === 'color' ? (
          item ? (
            <span className="w-5 h-5 rounded-[9999px]" style={{ backgroundColor: item }} />
          ) : (
            <p className="text-gray-a9 text-base">{title}</p>
          )
        ) : (
          <p className={` ${item ? 'text-black text-[18px]' : 'text-gray-a9 text-base'}`}>{item || `${title}`}</p>
        )}
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
