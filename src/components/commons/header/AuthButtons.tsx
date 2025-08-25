import Link from 'next/link';
import Button from '@/components/commons/button/Button';

const AuthButtons = () => (
  <div className="flex gap-3">
    <Link href="/register">
      <Button buttonSize="normal" bgColor="filled" className="w-[110px] h-[32px] bg-blue-33 text-xl">
        회원가입
      </Button>
    </Link>
    <Link href="/login">
      <Button buttonSize="normal" bgColor="ghost" className="w-[110px] h-[32px] text-xl">
        로그인
      </Button>
    </Link>
  </div>
);

export default AuthButtons;
