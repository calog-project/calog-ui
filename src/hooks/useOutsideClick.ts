import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  handleDropdownClose: () => void,
  exceptionRef?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 마우스다운 이벤트가 버튼에서 발생한 경우 드롭다운 열지 않음
      if (exceptionRef && exceptionRef.current && exceptionRef.current.contains(e.target as Node)) {
        return;
      }

      // 드롭다운 외부 클릭 시 닫기
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleDropdownClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handleDropdownClose, exceptionRef]);
};

export default useOutsideClick;
