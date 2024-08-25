import React from "react"

export const BasicCard = ({
  title,
  subtext,
  children,
}: {
  title: string
  subtext?: string
  children: React.ReactNode
}) => {
  return (
    <>
      {/* Card Headings: Title with Subtitle */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
        {/* Card Header */}
        <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
          <h3 className="mb-1 font-semibold">{title}</h3>
          {subtext && (
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {subtext}
            </h4>
          )}
        </div>
        {/* END Card Header */}

        {/* Card Body */}
        <div className="grow p-5">{children}</div>
        {/* Card Body */}
      </div>
      {/* END Card Headings: Title with Subtitle */}
    </>
  )
}
