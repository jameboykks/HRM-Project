import { useEffect } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

export default function Modal({ isOpen, onClose, title, icon: Icon, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div
        className={clsx(
          'relative bg-white rounded-xl shadow-xl w-full max-h-[85vh] overflow-y-auto',
          {
            'max-w-md': size === 'sm',
            'max-w-lg': size === 'md',
            'max-w-2xl': size === 'lg',
            'max-w-4xl': size === 'xl',
          }
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-surface-200">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-primary-600" />}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-surface-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
