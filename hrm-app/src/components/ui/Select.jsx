import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'

export default function Select({ label, required, options = [], placeholder, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={clsx(
            'w-full px-3 py-2 text-sm border border-surface-200 rounded-lg appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'bg-white cursor-pointer',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
      </div>
    </div>
  )
}
