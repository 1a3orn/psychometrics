import React from "react";

interface PageFacingProps {
  children: React.ReactNode;
}

export const PageLogin: React.FC<PageFacingProps> = ({ children }) => {
  return (
    <div
      id="page-container"
      className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
    >
      {children}
    </div>
  );
};

export const PageLoginContent: React.FC<PageFacingProps> = ({ children }) => {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
      {children}
    </div>
  );
};
