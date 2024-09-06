import React from "react";

interface CardProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const CardClickable: React.FC<CardProps> = ({ onClick, children }) => {
  return (
    <div
      className="bg-white border-2 border-teal-500 overflow-hidden cursor-pointer
                 transition-all duration-300 ease-in-out
                 hover:bg-teal-50 hover:shadow-md
                 shadow-sm"
      onClick={onClick}
    >
      <div className="p-2 flex flex-col justify-between">{children}</div>
    </div>
  );
};
