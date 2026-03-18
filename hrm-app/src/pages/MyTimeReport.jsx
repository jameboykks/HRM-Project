import { useState } from 'react'
import { Calendar, FileDown } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '../components/ui/Table'

// ─── Fake Working Time Data ───
const myTimeData = [
  { date: '1/3/26', firstIn: '08:30:55', lastOut: '-', actualWork: '-', officeHours: '-', inOut: 0, lateHours: '-', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '2/3/26', firstIn: '08:31:03', lastOut: '17:49:18', actualWork: '1', officeHours: '8.17', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '3/3/26', firstIn: '08:19:10', lastOut: '17:49:09', actualWork: '1', officeHours: '8.17', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '4/3/26', firstIn: '08:41:12', lastOut: '-', actualWork: '-', officeHours: '-', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '5/3/26', firstIn: '08:14:03', lastOut: '17:06:46', actualWork: '1', officeHours: '8.36', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '6/3/26', firstIn: '08:16:32', lastOut: '17:54:00', actualWork: '1', officeHours: '8.38', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '7/3/26', firstIn: '08:43:03', lastOut: '17:43:41', actualWork: '1', officeHours: '8.37', inOut: 4, lateHours: '0.13', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '8/3/26', firstIn: '08:32:17', lastOut: '17:49:55', actualWork: '1', officeHours: '8.13', inOut: 4, lateHours: '-', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '10/3/26', firstIn: '08:45:14', lastOut: '17:15:44', actualWork: '1', officeHours: '8.4', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '11/3/26', firstIn: '08:41:06', lastOut: '17:55:01', actualWork: '1', officeHours: '8.17', inOut: 4, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
  { date: '12/3/26', firstIn: '08:52:14', lastOut: '17:40:03', actualWork: '1', officeHours: '8.23', inOut: 6, lateHours: '0', earlyLeave: '-', status: '-', leaveAction: '-' },
]

export default function MyTimeReport() {
  const [startDate, setStartDate] = useState('2026-03-01')
  const [endDate, setEndDate] = useState('2026-03-14')
  const [currentPage, setCurrentPage] = useState(1)

  const data = myTimeData
  const totalRecords = data.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Báo Cáo Thời Gian Làm Việc Của Tôi
        </h1>
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
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <Table>
          <TableHead>
            <TableHeader>Ngày</TableHeader>
            <TableHeader>Lần vào đầu tiên</TableHeader>
            <TableHeader>Lần ra cuối cùng</TableHeader>
            <TableHeader>Công thực tế</TableHeader>
            <TableHeader>Thời gian trong văn phòng</TableHeader>
            <TableHeader>Số lần vô ra</TableHeader>
            <TableHeader>Số giờ trễ</TableHeader>
            <TableHeader>Thời gian về sớm</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
            <TableHeader>Tạo đơn nghỉ</TableHeader>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.firstIn}</TableCell>
                <TableCell>{row.lastOut}</TableCell>
                <TableCell>{row.actualWork}</TableCell>
                <TableCell>{row.officeHours}</TableCell>
                <TableCell>{row.inOut}</TableCell>
                <TableCell>{row.lateHours}</TableCell>
                <TableCell>{row.earlyLeave}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.leaveAction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          totalRecords={totalRecords}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  )
}
