import React from "react";
import Labels from "../atoms/labels";
import Inputs from "../atoms/inputs";

interface FormFieldProps {
  children: React.ReactNode;
  htmlFor: string;
  placeholder: string;
  type: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
}

const FormField = ({
  children,
  htmlFor,
  type,
  value,
  placeholder,
  onChange,
  onKeyDown,
  className,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Labels htmlFor={htmlFor}>{children}</Labels>
      <Inputs
        type={type}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default FormField;
