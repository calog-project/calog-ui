import Link from 'next/link';

const LandingHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-custom z-sticky py-2">
      <div className="relative flex items-center h-[100px] m-0 mx-auto max-w-[1400px] justify-between">
        <Link href="/" className="text-[36px] font-bold">
          Calog
        </Link>

        <div>
          {/* 버튼 공통컴포넌트 만든 후 적용 */}
          <button>회원가입</button>
          <button>로그인</button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
