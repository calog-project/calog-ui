import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  buttonSize: ButtonSize;
  bgColor: BgColor;
}

type ButtonSize = 'normal';

type BgColor = 'ghost' | 'filled';

const buttonSizeClasses = {
  normal: 'w-full rounded-lg',
};

const bgColorClasses: Record<BgColor, string> = {
  ghost: 'border border-gray-98',
  filled: 'text-white',
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
