'use client';

import { useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

type PopoverProps = {
  items: { label: string; onClick: () => void }[];
  onClose: () => void;
};

const Popover = ({ items, onClose }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popoverRef, onClose);

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-10 z-50 w-40 bg-white border border-gray-200 shadow-md rounded-md">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 text-[14px] text-gray-700 hover:bg-gray-98 hover:bg-opacity-10 cursor-pointer"
            onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popover;
