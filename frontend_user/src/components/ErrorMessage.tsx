import React from "react";

interface ErrorMessageProps {
  error?: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return <div className="h-6 min-h-[1.5rem]">{error && <p className="text-red-500 text-sm font-bold">{error}</p>}</div>;
};
