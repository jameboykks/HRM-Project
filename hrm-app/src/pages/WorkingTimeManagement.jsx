import { useState, useRef, useEffect } from 'react'
import { FileDown, Calendar, Search, ChevronDown, X, Pencil } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableEmpty,
  Pagination,
} from '../components/ui/Table'

// ─── Fake Employees ───
const employees = [
  { id: 1, name: 'Le Thi Chi Thuong' },
  { id: 2, name: 'Le Thi Hoa' },
  { id: 3, name: 'Le Thi Kim Yen' },
  { id: 4, name: 'Nguyen Van An' },
  { id: 5, name: 'Tran Minh Duc' },
  { id: 6, name: 'Pham Ngoc Linh' },
  { id: 7, name: 'Vo Hoang Nam' },
  { id: 8, name: 'Phan Khai' },
  { id: 9, name: 'Le Viet Thy' },
  { id: 10, name: 'Hoang Thi Mai' },
]

// ─── Fake Working Time Data (for Le Thi Chi Thuong) ───
const workingTimeData = [
  { date: '13/03/2026', firstIn: '08:30:50', lastOut: '---:---', officeHours: 0, inOut: 1, lateTime: 0, earlyLeave: 0, status: 'Yêu cầu thiếu đơn' },
  { date: '12/03/2026', firstIn: '08:31:55', lastOut: '17:49:19', officeHours: 8.28, inOut: 3, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '11/03/2026', firstIn: '08:28:52', lastOut: '17:38:19', officeHours: 8.17, inOut: 2, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '10/03/2026', firstIn: '08:11:12', lastOut: '17:35:07', officeHours: 8.38, inOut: 3, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '09/03/2026', firstIn: '08:33:35', lastOut: '17:56:46', officeHours: 8.38, inOut: 2, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '06/03/2026', firstIn: '08:32:08', lastOut: '17:42:46', officeHours: 8.17, inOut: 2, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '05/03/2026', firstIn: '08:38:03', lastOut: '18:00:47', officeHours: 8.37, inOut: 2, lateTime: 0.13, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '04/03/2026', firstIn: '08:30:01', lastOut: '17:53:36', officeHours: 8.38, inOut: 4, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '03/03/2026', firstIn: '08:32:17', lastOut: '17:40:30', officeHours: 8.13, inOut: 2, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '02/03/2026', firstIn: '08:32:14', lastOut: '17:46:03', officeHours: 8.22, inOut: 3, lateTime: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
]

export default function WorkingTimeManagement() {
  const [startDate, setStartDate] = useState('2026-03-01')
  const [endDate, setEndDate] = useState('2026-03-14')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const data = selectedEmployee ? workingTimeData : []
  const totalRecords = data.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Chỉnh sửa thời gian làm việc
        </h1>
        <Button variant="primary" icon={FileDown}>
          Xuất báo cáo
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-end gap-4">
          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Ngày bắt đầu:
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-44 px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Ngày kết thúc:
            </label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-44 px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Employee Dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
            <label className="text-sm font-medium text-gray-700">
              Chọn nhân viên
            </label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-64 flex items-center justify-between px-3 py-2 text-sm border border-surface-200 rounded-lg bg-white hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
            >
              {selectedEmployee ? (
                <div className="flex items-center gap-2">
                  <Avatar name={selectedEmployee.name} size="sm" className="!w-6 !h-6 !text-[10px]" />
                  <span className="text-gray-700">{selectedEmployee.name}</span>
                </div>
              ) : (
                <span className="text-surface-400">Chọn nhân viên</span>
              )}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-surface-200 rounded-lg shadow-lg z-50">
                {/* Search */}
                <div className="p-2 border-b border-surface-200">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm nhân viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Employee List */}
                <div className="max-h-60 overflow-y-auto py-1">
                  {selectedEmployee && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEmployee(null)
                        setDropdownOpen(false)
                        setSearchTerm('')
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-surface-50 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Bỏ chọn</span>
                    </button>
                  )}
                  {filteredEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => {
                        setSelectedEmployee(emp)
                        setDropdownOpen(false)
                        setSearchTerm('')
                        setCurrentPage(1)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-surface-50 cursor-pointer ${
                        selectedEmployee?.id === emp.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      <Avatar name={emp.name} size="sm" className="!w-7 !h-7 !text-[10px]" />
                      <span>{emp.name}</span>
                    </button>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <div className="px-3 py-4 text-sm text-center text-surface-400">
                      Không tìm thấy nhân viên
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <Table>
          <TableHead>
            <TableHeader>Ngày</TableHeader>
            <TableHeader>Lần vào đầu tiên</TableHeader>
            <TableHeader>Lần ra cuối cùng</TableHeader>
            <TableHeader>Thời gian trong văn phòng</TableHeader>
            <TableHeader>Số lần vô ra</TableHeader>
            <TableHeader>Thời gian đi trễ</TableHeader>
            <TableHeader>Thời gian về sớm</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableEmpty message="Danh sách trống" colSpan={9} />
            ) : (
              data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.firstIn}</TableCell>
                  <TableCell>{row.lastOut}</TableCell>
                  <TableCell>{row.officeHours || '-'}</TableCell>
                  <TableCell>{row.inOut}</TableCell>
                  <TableCell>{row.lateTime}</TableCell>
                  <TableCell>{row.earlyLeave}</TableCell>
                  <TableCell>
                    <span className={row.status === 'Yêu cầu thiếu đơn' ? 'text-danger-500' : 'text-gray-500'}>
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalRecords={totalRecords}
            onPageChange={setCurrentPage}
          />
        )}
      </Card>
    </div>
  )
}
