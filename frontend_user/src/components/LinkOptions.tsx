import React from "react";
import { Link } from "react-router-dom";

interface LinkOption {
  text: string;
  to?: string;
  handleClick?: () => void;
}

interface LinkOptionsProps {
  options: LinkOption[];
}

export const LinkOptions: React.FC<LinkOptionsProps> = ({ options }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <GreyLink key={index} {...option} />
      ))}
    </div>
  );
};

export const GreyLink: React.FC<LinkOption & { className?: string }> = ({ text, to, handleClick, className }) => {
  const commonClasses = "text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer";

  if (to) {
    return (
      <Link to={to} className={`${className || commonClasses}`}>
        {text}
      </Link>
    );
  } else if (handleClick) {
    return (
      <div onClick={handleClick} className={`${className || commonClasses}`}>
        {text}
      </div>
    );
  }
  return null;
};
