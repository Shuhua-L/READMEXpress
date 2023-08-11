/* eslint-disable react/display-name */
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";

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
    <>
      <label className='block' htmlFor={name}>
        <span
          className={`label-text ${
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
    </>
  );
});

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SaveButton = forwardRef<HTMLButtonElement, SaveButtonProps>((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <>
      <button type='submit' className={`btn btn-wide mx-auto ${className}`} {...rest} ref={ref}>
        Save
      </button>
    </>
  );
});

interface CodeProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  className?: string;
}

export const CodeInput = forwardRef<HTMLInputElement, CodeProps>((props, ref) => {
  const { name, label, placeholder, className = "", ...rest } = props;

  return (
    <>
      <label className='block'>
        <span className='label-text'>{label}</span>
        <input
          name={name}
          placeholder={placeholder}
          {...rest}
          ref={ref}
          className={`input input-sm kbd w-full ${className}`}
          spellCheck={false}
        />
      </label>
    </>
  );
});
