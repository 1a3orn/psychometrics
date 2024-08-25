import { Link } from "react-router-dom"

type ListElement = {
  title: string
  decoration?: React.ReactNode
  to: string
}

export const List = ({ elements }: { elements: ListElement[] }) => {
  return (
    <nav className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
      {elements.map((element) => (
        <Link
          to={element.to}
          className="flex items-center justify-between p-4 text-gray-700 hover:bg-gray-50 hover:text-gray-700 active:bg-white dark:text-gray-200 dark:hover:bg-gray-800/50 dark:active:bg-gray-900"
        >
          <span className="mr-1 text-sm font-semibold">{element.title}</span>
          {element.decoration}
        </Link>
      ))}
    </nav>
  )
}
