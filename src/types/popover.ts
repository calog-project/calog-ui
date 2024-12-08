export type TPopoverItem = {
  label: string;
  onClick: () => void;
};

export type TPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  items: TPopoverItem[];
  children: React.ReactNode;
};
