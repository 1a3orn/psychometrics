import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  outline?: boolean;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  outline = false,
  className = "",
  style,
  type = "button",
  ref,
}) => {
  const baseClasses =
    "px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const filledClasses =
    "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500";
  const outlineClasses =
    "bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-100 focus:ring-teal-500";

  const buttonClasses = `${baseClasses} ${
    outline ? outlineClasses : filledClasses
  } ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={style}
      type={type}
      ref={ref}
    >
      {children}
    </button>
  );
};

export const ButtonLink: React.FC<
  Omit<ButtonProps, "onClick"> & { to: string }
> = ({ children, to, outline = false, className = "" }) => {
  const nav = useNavigate();
  const onClick = useCallback(() => {
    nav(to);
  }, [nav, to]);
  return (
    <Button onClick={onClick} className={className} outline={outline}>
      {children}
    </Button>
  );
};

export const ButtonDark: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
  >
    {children}
  </button>
);
