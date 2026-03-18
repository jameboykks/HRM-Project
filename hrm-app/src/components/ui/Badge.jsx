import { clsx } from 'clsx'

const variants = {
  success: 'bg-success-100 text-success-600',
  warning: 'bg-warning-100 text-warning-600',
  danger: 'bg-danger-100 text-danger-600',
  info: 'bg-primary-100 text-primary-600',
  pink: 'bg-pink-100 text-pink-500',
  orange: 'bg-orange-100 text-orange-500',
  gray: 'bg-surface-100 text-gray-600',
  'success-solid': 'bg-success-500 text-white',
  'danger-solid': 'bg-danger-500 text-white',
  'warning-solid': 'bg-warning-500 text-white',
  'primary-solid': 'bg-primary-500 text-white',
}

export default function Badge({ children, variant = 'gray', className, dot = false }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-success-500': variant === 'success',
        'bg-warning-500': variant === 'warning',
        'bg-danger-500': variant === 'danger',
        'bg-primary-500': variant === 'info',
        'bg-gray-500': variant === 'gray',
      })} />}
      {children}
    </span>
  )
}
