import { clsx } from 'clsx'

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-1 border-b border-surface-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={clsx(
            'px-4 py-2.5 text-sm font-medium transition-colors relative cursor-pointer whitespace-nowrap',
            activeTab === tab.key
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium',
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-200 text-gray-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
