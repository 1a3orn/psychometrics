import React from "react";

interface CardProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const CardClickable: React.FC<CardProps> = ({ onClick, children }) => {
  console.log("CardClickable");
  return (
    <div
      className="bg-white border-2 border-gray-100 overflow-hidden cursor-pointer
                 transition-all duration-300 ease-in-out
                 hover:bg-gray-100 hover:shadow-sm
                 shadow-sm"
      onClick={onClick}
    >
      <div className="p-2 flex flex-col justify-between">{children}</div>
    </div>
  );
};
