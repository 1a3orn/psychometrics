import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  outline?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, outline = false, className = "" }) => {
  const baseClasses = "px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const filledClasses = "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500";
  const outlineClasses = "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100 focus:ring-blue-500";

  const buttonClasses = `${baseClasses} ${outline ? outlineClasses : filledClasses} ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonDark: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
  >
    {children}
  </button>
);
