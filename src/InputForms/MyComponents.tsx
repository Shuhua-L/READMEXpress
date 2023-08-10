/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, label, placeholder, required, className, ...rest } = props;

  return (
    <>
      <label className='block' htmlFor={name}>
        <span
          className={`label-text ${
            required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
          }`}>
          {label}
        </span>
        <input
          name={name}
          placeholder={placeholder}
          {...rest}
          ref={ref}
          className={`input w-full ${className}`}
        />
      </label>
    </>
  );
});
