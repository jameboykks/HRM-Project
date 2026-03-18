import { clsx } from 'clsx'

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

const colors = [
  'bg-primary-100 text-primary-700',
  'bg-success-100 text-success-600',
  'bg-warning-100 text-warning-600',
  'bg-danger-100 text-danger-600',
  'bg-pink-100 text-pink-500',
  'bg-orange-100 text-orange-500',
]

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function Avatar({ name = '', src, size = 'md', className }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={clsx('rounded-full object-cover', sizes[size], className)}
      />
    )
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-medium',
        sizes[size],
        getColor(name),
        className
      )}
    >
      {getInitials(name || '?')}
    </div>
  )
}
