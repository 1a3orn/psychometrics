import React from "react";

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  readonly?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  label,
  onChange,
  type = "text",
  placeholder = "",
  errorMessage = "",
  readonly = false,
}) => {
  const borderColor = errorMessage ? "border-red-500" : "border-teal-500";
  const textColor = errorMessage ? "text-red-700" : "text-gray-700 dark:text-gray-300";
  const focusColor = errorMessage ? "focus:border-red-500" : "focus:border-green-500";
  const baseClass = `block w-full border-2 px-3 py-2 leading-6 placeholder-gray-500 bg-white dark:bg-gray-700`;
  const totalClass = `${baseClass} ${borderColor} ${textColor} ${focusColor}`;

  const usedLabel = label ?? `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return (
    <div>
      <label htmlFor={name} className="font-bold text-teal-500 dark:text-teal-400">
        {usedLabel}
      </label>
      <input
        aria-label={name}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={totalClass}
        readOnly={readonly}
      />
      <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
    </div>
  );
};
