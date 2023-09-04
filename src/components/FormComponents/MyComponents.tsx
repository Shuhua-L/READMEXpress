/* eslint-disable react/display-name */
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";

// import { InputProps } from "@/types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, label, placeholder, required, className = "", ...rest } = props;

  return (
    <label className='block' htmlFor={name}>
      <span
        className={`text-sm ${
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        }`}>
        {label}
      </span>
      <input
        name={name}
        placeholder={placeholder}
        {...rest}
        ref={ref}
        className={`input w-full input-bordered ${className}`}
      />
    </label>
  );
});

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { name, label, placeholder, required, className = "", ...rest } = props;

  return (
    <label className='block' htmlFor={name}>
      <span
        className={`text-sm ${
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        }`}>
        {label}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        {...rest}
        ref={ref}
        className={`textarea textarea-bordered w-full ${className}`}
      />
    </label>
  );
});

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SaveButton = forwardRef<HTMLButtonElement, SaveButtonProps>((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <button
      type='submit'
      className={`btn btn-wide mx-auto btn-outline btn-neutral dark:btn ${className}`}
      {...rest}
      ref={ref}>
      Save
    </button>
  );
});

interface ResetClearButtonsProps extends HTMLAttributes<HTMLDivElement> {
  handleReset: () => void;
  handleClear: () => void;
  className?: string;
}

export const ResetClearButtons = forwardRef<HTMLDivElement, ResetClearButtonsProps>(
  (props, ref) => {
    const { handleReset, handleClear, className = "", ...rest } = props;

    return (
      <div ref={ref} {...rest}>
        <button
          type='button'
          className='btn btn-sm w-1/2 btn-outline btn-neutral dark:btn dark:btn-sm '
          onClick={handleReset}>
          Reset
        </button>
        <button
          type='button'
          className='btn btn-sm w-1/2 btn-outline btn-neutral dark:btn dark:btn-sm'
          onClick={handleClear}>
          Clear
        </button>
      </div>
    );
  }
);

interface CodeProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  className?: string;
}

export const CodeInput = forwardRef<HTMLInputElement, CodeProps>((props, ref) => {
  const { name, label, placeholder, className = "", ...rest } = props;

  return (
    <label className='block'>
      <span className='text-sm'>{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        {...rest}
        ref={ref}
        className={`input input-sm kbd w-full ${className}`}
        spellCheck={false}
      />
    </label>
  );
});

// interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
//   name: string;
//   label: string;
//   required: boolean;
//   options: string[];
//   className?: string;
// }

// export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
//   const { name, label = "Pick one", required, options, className = "", ...rest } = props;

//   return (
//     <select
//       className={`select select-bordered w-full max-w-xs  ${className}`}
//       // defaultValue={options[0].value}
//       {...rest}
//       ref={ref}>
//       {label && <option disabled>{label}</option>}
//       {options.map((value) => (
//         <option key={value} value={value}>
//           {value}
//         </option>
//       ))}
//     </select>
//   );
// });
