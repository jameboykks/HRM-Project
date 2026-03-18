import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmployeeManagement from './pages/EmployeeManagement'
import ProjectManagement from './pages/ProjectManagement'
import WorkingTimeManagement from './pages/WorkingTimeManagement'
import OTPlanManagement from './pages/OTPlanManagement'
import LeaveManagement from './pages/LeaveManagement'
import MyTimeReport from './pages/MyTimeReport'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Authenticated routes with sidebar + topbar layout */}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports/my-time" element={<MyTimeReport />} />
        <Route path="/admin/employees" element={<EmployeeManagement />} />
        <Route path="/admin/projects" element={<ProjectManagement />} />
        <Route path="/admin/working-time" element={<WorkingTimeManagement />} />
        <Route path="/admin/ot-plans" element={<OTPlanManagement />} />
        <Route path="/admin/leave-requests" element={<LeaveManagement />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
