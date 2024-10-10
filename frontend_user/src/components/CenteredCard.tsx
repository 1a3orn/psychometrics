import React from "react";

export const CenteredCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative border-2 border-teal-500 p-6 max-w-lg w-full bg-white dark:bg-gray-800">
        <div className="absolute top-0 left-0 bg-teal-500 text-white py-1 px-3 transform -translate-y-full">
          <strong>{title}</strong>
        </div>
        {children}
      </div>
    </div>
  );
};
