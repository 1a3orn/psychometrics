import React from "react"

interface InputFieldProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  placeholder?: string
  errorMessage?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  label,
  onChange,
  type = "text",
  placeholder = "",
  errorMessage = "",
}) => {
  const borderColor = errorMessage ? "border-red-400" : "border-gray-400"
  const textColor = errorMessage ? "text-red-700" : "text-gray-700"
  const ringFocusColor = errorMessage
    ? "focus:ring-red-500"
    : "focus:ring-gray-500"
  const baseClass = `block w-full rounded-lg border px-3 py-2 leading-6 placeholder-gray-500 focus:ring`
  const totalClass = `${baseClass} ${borderColor} ${textColor} ${ringFocusColor}`

  const usedLabel = label ?? `${name.charAt(0).toUpperCase()}${name.slice(1)}`

  return (
    <div>
      <label htmlFor={name} className="font-medium">
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
      />
      <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
    </div>
  )
}
