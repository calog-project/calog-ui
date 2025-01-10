import { DropdownProps } from '@/types/DropdownType';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Dropdown = ({ children, className, itemRef }: DropdownProps) => {
  const DefaultDropDownClass =
    'absolute rounded-lg border border-solid border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-900 z-10 shadow-custom-shadow overflow-y-auto max-h-[200px]';

  const DropDownClass = twMerge(DefaultDropDownClass, className);
  return (
    <div ref={itemRef} className={DropDownClass}>
      {children}
    </div>
  );
};

const TextItem = ({ children, className, onClick }: DropdownProps) => {
  const DefaultTextItemClass =
    'text-nowrap cursor-pointer p-2 text-gray-900 font-medium hover:bg-blue-76 hover:bg-opacity-10 rounded text-[14px]';
  const TextItemClass = twMerge(DefaultTextItemClass, className);

  return (
    <div className={TextItemClass} onClick={onClick}>
      {children}
    </div>
  );
};

Dropdown.TextItem = TextItem;

export default Dropdown;
