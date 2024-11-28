import { ButtonHTMLAttributes, forwardRef, PropsWithChildren, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  buttonSize: ButtonSize;
  bgColor: BgColor;
  ref?: Ref<HTMLButtonElement>;
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = 'button', buttonSize, bgColor, onClick, className, disabled }, ref) => {
    const buttonClass = twMerge(buttonSizeClasses[buttonSize], className);
    const bgColorClass = bgColorClasses[bgColor];

    return (
      <button
        className={`${buttonClass} ${bgColorClass} whitespace-nowrap`}
        type={type}
        onClick={onClick}
        ref={ref}
        disabled={disabled}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
