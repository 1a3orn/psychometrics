import React from "react";

export const CardBase = ({ greyChildren, children }: { greyChildren?: React.ReactNode; children: React.ReactNode }) => {
  return (
    <>
      {/* Card Headings: Title with Subtitle */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
        {/* Card Header */}
        {greyChildren && <div className="bg-gray-50 px-5 py-5 dark:bg-gray-700/50">{greyChildren}</div>}
        {/* END Card Header */}

        {/* Card Body */}
        <div className="grow p-5">{children}</div>
        {/* Card Body */}
      </div>
      {/* END Card Headings: Title with Subtitle */}
    </>
  );
};
