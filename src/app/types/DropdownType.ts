import { PropsWithChildren, RefObject } from 'react';

export interface DropdownProps extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
  itemRef?: RefObject<HTMLDivElement>;
}
