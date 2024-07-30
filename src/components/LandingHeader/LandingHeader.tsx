'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import ExampleModal from '../ExampleModal/ExampleModal';
import useModal from '@/hooks/useModal';

const LandingHeader = () => {
  const {
    openModal: exampleOpenModal,
    handleModalClose: exampleModalClose,
    handleModalOpen: exampleModalOpen,
  } = useModal();

  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-custom py-2 z-50">
      <div className="relative flex items-center h-[100px] m-0 mx-auto max-w-[1400px] justify-between">
        <Link href="/" className="text-[36px] font-bold">
          Calog
        </Link>

        <div className="flex gap-3">
          {/* 버튼 공통컴포넌트 만든 후 적용 */}
          <Button buttonSize="normal" bgColor="filled" className="w-[110px] h-[42px] bg-blue-33">
            회원가입
          </Button>
          <Button buttonSize="normal" bgColor="ghost" className="w-[110px] h-[42px]">
            로그인
          </Button>

          {/* 예시를 위한 모달 및 버튼  나중에 지울것 */}
          <ExampleModal openModal={exampleOpenModal} handleModalClose={exampleModalClose} />
          <Button
            buttonSize="normal"
            bgColor="filled"
            className="w-[110px] h-[42px] bg-blue-33"
            onClick={exampleModalOpen}>
            예시모달
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
