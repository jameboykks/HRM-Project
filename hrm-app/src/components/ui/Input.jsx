import { clsx } from 'clsx'

export default function Input({ label, required, className, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-3 py-2 text-sm border rounded-lg transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'placeholder:text-surface-400',
          error ? 'border-danger-500' : 'border-surface-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  )
}
