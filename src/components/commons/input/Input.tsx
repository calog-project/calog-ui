import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  inputSize: InputSize;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type InputSize = 'normal';

const inputClasses = {
  normal: 'w-full',
};

const Input = ({ title, inputSize, className, register, type, name, placeholder, error, onChange }: InputProps) => {
  const inputClass = twMerge(inputClasses[inputSize], className);
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-xl font-semibold">
        {title}
      </label>
      <input
        {...register}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`${inputClass} h-[50px] rounded-lg px-4 py-3 border border-gray-d9 focus:border-gray-98`}
      />
      <div>{error?.message && <span className="text-sm text-red">{error.message}</span>}</div>
    </div>
  );
};

export default Input;
