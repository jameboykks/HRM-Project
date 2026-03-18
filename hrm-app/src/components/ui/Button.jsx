import { clsx } from 'clsx'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-white text-gray-700 border border-surface-200 hover:bg-surface-50 focus:ring-primary-500',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500',
  success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500',
  ghost: 'text-gray-600 hover:bg-surface-100 focus:ring-primary-500',
  dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
      {IconRight && <IconRight className="w-4 h-4" />}
    </button>
  )
}
