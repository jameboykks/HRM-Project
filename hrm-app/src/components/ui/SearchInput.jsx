import { Search } from 'lucide-react'
import { clsx } from 'clsx'

export default function SearchInput({ placeholder = 'Tìm kiếm theo tên...', className, ...props }) {
  return (
    <div className={clsx('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-surface-400"
        {...props}
      />
    </div>
  )
}
