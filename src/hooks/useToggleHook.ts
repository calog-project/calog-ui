import { useState } from 'react';

const useToggleHook = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleState = () => {
    setIsOpen((prev) => !prev);
  };

  const changeCloseState = () => {
    setIsOpen(false);
  };

  const changeOpenState = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    toggleState,
    changeCloseState,
    changeOpenState,
  };
};

export default useToggleHook;
