import { DropdownProps } from '@/app/types/DropdownType';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Dropdown = ({ children, className, itemRef }: DropdownProps) => {
  const DefaultDropDownClass =
    'absolute rounded-lg border border-solid border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 z-10 shadow-custom-shadow overflow-y-auto max-h-[200px]';

  const DropDownClass = twMerge(DefaultDropDownClass, className);
  return (
    <div ref={itemRef} className={DropDownClass}>
      {children}
    </div>
  );
};

const TextItem = ({ children, className, onClick }: DropdownProps) => {
  const DefaultTextItemClass =
    'text-nowrap cursor-pointer p-1 text-gray-900 font-semibold hover:bg-gray-100 rounded text-lg';
  const TextItemClass = twMerge(DefaultTextItemClass, className);

  return (
    <p className={TextItemClass} onClick={onClick}>
      {children}
    </p>
  );
};

Dropdown.TextItem = TextItem;

export default Dropdown;
