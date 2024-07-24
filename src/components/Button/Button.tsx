import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  buttonSize: ButtonSize;
  bgColor: BgColor;
}

type ButtonSize = 'normal';

type BgColor = 'blue' | 'white';

const buttonSizeClasses = {
  normal: 'min-w-[110px] h-[42px] rounded-lg',
};

const bgColorClasses: Record<BgColor, string> = {
  white: 'bg-white border border-gray-98',
  blue: 'bg-blue-33 text-white',
};

const Button = ({ children, type = 'button', buttonSize, bgColor, onClick, className, disabled }: ButtonProps) => {
  const buttonClass = twMerge(buttonSizeClasses[buttonSize], className);
  const bgColorClass = bgColorClasses[bgColor];

  return (
    <button
      className={`${buttonClass} ${bgColorClass} whitespace-nowrap`}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
