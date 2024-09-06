import React from "react";

interface PillProps {
  children: React.ReactNode;
}

export const Pill: React.FC<PillProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div className={`text-white px-1 py-0.5 text-xs ${className}`} {...props}>
      {children}
    </div>
  );
};
