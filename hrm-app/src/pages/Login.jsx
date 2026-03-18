import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <span className="text-6xl">🍻</span>
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1">HAIBAZO</h1>
        <p className="text-sm text-gray-500 mb-8">Time Management System</p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="text-xl">🍻</span>
          Log in with HAIBAZO
        </button>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400">Haibazo © 2025. All rights reserved</p>
      </div>
    </div>
  )
}
