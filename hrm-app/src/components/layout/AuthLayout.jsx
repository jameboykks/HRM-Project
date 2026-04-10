import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { clsx } from 'clsx'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AuthLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar expanded={sidebarExpanded} onExpandChange={setSidebarExpanded} />
      <div className={clsx('transition-all duration-300', sidebarExpanded ? 'ml-72' : 'ml-16')}>
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
