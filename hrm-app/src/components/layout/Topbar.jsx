import Avatar from '../ui/Avatar'

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-surface-200 flex items-center justify-between px-6">
      {/* Left: Logo (visible alongside collapsed sidebar) */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🍻</span>
        <div>
          <div className="font-bold text-sm text-gray-900 leading-tight">HAIBAZO</div>
          <div className="text-[10px] text-gray-500">Time Management System</div>
        </div>
      </div>

      {/* Right: User info */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Le Thi Kim Yen</span>
        <Avatar name="Le Thi Kim Yen" size="md" />
      </div>
    </header>
  )
}
