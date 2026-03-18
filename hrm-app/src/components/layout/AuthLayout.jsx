import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <div className="ml-16">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
