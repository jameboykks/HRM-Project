import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Table({ children, className }) {
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

export function TableHead({ children }) {
  return (
    <thead>
      <tr className="border-b border-surface-200 bg-surface-50">
        {children}
      </tr>
    </thead>
  )
}

export function TableHeader({ children, className, ...props }) {
  return (
    <th
      className={clsx(
        'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-surface-200">{children}</tbody>
}

export function TableRow({ children, className, ...props }) {
  return (
    <tr className={clsx('hover:bg-surface-50 transition-colors', className)} {...props}>
      {children}
    </tr>
  )
}

export function TableCell({ children, className, ...props }) {
  return (
    <td className={clsx('px-4 py-3 text-gray-700 whitespace-nowrap', className)} {...props}>
      {children}
    </td>
  )
}

export function TableEmpty({ message = 'Không có dữ liệu', colSpan = 1 }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-sm text-surface-400">
        {message}
      </td>
    </tr>
  )
}

export function Pagination({ currentPage = 1, totalPages = 1, totalRecords = 0, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-surface-200">
      <span className="text-sm text-gray-500">{totalRecords} bản ghi</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={clsx(
              'w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer',
              page === currentPage
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-surface-100'
            )}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg hover:bg-surface-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
