import { clsx } from 'clsx'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-surface-200 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
