import { clsx } from 'clsx'

const colorMap = {
  red: {
    bg: 'bg-gradient-to-br from-card-red-from to-card-red-to',
    text: 'text-danger-600',
    icon: 'bg-danger-500',
  },
  blue: {
    bg: 'bg-gradient-to-br from-card-blue-from to-card-blue-to',
    text: 'text-primary-600',
    icon: 'bg-primary-500',
  },
  orange: {
    bg: 'bg-gradient-to-br from-card-orange-from to-card-orange-to',
    text: 'text-orange-500',
    icon: 'bg-orange-500',
  },
  green: {
    bg: 'bg-gradient-to-br from-card-green-from to-card-green-to',
    text: 'text-success-600',
    icon: 'bg-success-500',
  },
}

export default function StatCard({ count, label, sublabel, icon: Icon, color = 'blue', active = false, onClick }) {
  const scheme = colorMap[color]

  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all',
        scheme.bg,
        active && 'ring-2 ring-primary-500 ring-offset-2'
      )}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={clsx('text-3xl font-bold', scheme.text)}>{count}</span>
          {sublabel && (
            <span className="text-xs bg-white/70 rounded-full px-2 py-0.5 text-gray-600">
              {sublabel}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
      </div>
      {Icon && (
        <div className={clsx('p-3 rounded-xl text-white', scheme.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      {active && (
        <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary-500 rounded-full" />
      )}
    </div>
  )
}
