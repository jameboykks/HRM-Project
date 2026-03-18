import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  Clock,
  LayoutDashboard,
  Users,
  FolderOpen,
  FileText,
  CalendarClock,
  Timer,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

const navSections = [
  {
    title: 'Thời gian làm việc',
    items: [
      { label: 'Tổng quan', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Thời Gian Làm Việc', path: '/reports/my-time', icon: Clock },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      { label: 'Quản lý đơn nghỉ phép', path: '/admin/leave-requests', icon: FileText },
      { label: 'Quản lý dự án', path: '/admin/projects', icon: FolderOpen },
      { label: 'Quản lý thông tin nhân viên', path: '/admin/employees', icon: Users },
      { label: 'Quản lý kế hoạch OT', path: '/admin/ot-plans', icon: CalendarClock },
      { label: 'Quản lý thời gian làm việc', path: '/admin/working-time', icon: Timer },
    ],
  },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const [openSections, setOpenSections] = useState({ 0: true, 1: true })
  const location = useLocation()

  const toggleSection = (idx) => {
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <>
      {/* Collapsed sidebar (icon only) */}
      <aside
        className={clsx(
          'fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-surface-200 flex flex-col transition-all duration-300',
          expanded ? 'w-72' : 'w-16'
        )}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-3 border-b border-surface-200">
          {expanded ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍻</span>
                <div>
                  <div className="font-bold text-sm text-gray-900">HAIBAZO</div>
                  <div className="text-[10px] text-gray-500">Time Management System</div>
                </div>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-gray-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="w-full flex justify-center p-2 rounded-lg hover:bg-surface-100 text-gray-500 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {expanded ? (
            /* Expanded navigation with sections */
            navSections.map((section, idx) => (
              <div key={idx} className="mb-4">
                <button
                  onClick={() => toggleSection(idx)}
                  className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 cursor-pointer"
                >
                  {section.title}
                  {openSections[idx] ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                {openSections[idx] && (
                  <div className="mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          clsx(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                            isActive
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-gray-600 hover:bg-surface-100'
                          )
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            /* Collapsed: icon-only */
            <div className="space-y-1">
              {navSections.flatMap((section) => section.items).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center justify-center p-2.5 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-400 hover:bg-surface-100 hover:text-gray-600'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </aside>

      {/* Overlay when sidebar is expanded on mobile */}
      {expanded && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  )
}
