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
  { date: '13/03/2026', firstIn: '08:30:50', lastOut: '-', officeHours: 0, inOut: 1, lateHours: 0, earlyLeave: 0, status: 'Yêu cầu thêm đơn' },
  { date: '12/03/2026', firstIn: '08:31:55', lastOut: '17:49:19', officeHours: 8.28, inOut: 3, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '11/03/2026', firstIn: '08:28:52', lastOut: '17:38:19', officeHours: 8.17, inOut: 2, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '10/03/2026', firstIn: '08:11:12', lastOut: '17:35:07', officeHours: 8.38, inOut: 3, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '09/03/2026', firstIn: '08:33:35', lastOut: '17:56:46', officeHours: 8.38, inOut: 2, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '06/03/2026', firstIn: '08:32:08', lastOut: '17:42:46', officeHours: 8.17, inOut: 2, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '05/03/2026', firstIn: '08:38:03', lastOut: '18:00:47', officeHours: 8.37, inOut: 2, lateHours: 0.13, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '04/03/2026', firstIn: '08:30:01', lastOut: '17:53:36', officeHours: 8.38, inOut: 4, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '03/03/2026', firstIn: '08:32:17', lastOut: '17:40:30', officeHours: 8.13, inOut: 2, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
  { date: '02/03/2026', firstIn: '08:32:14', lastOut: '17:46:03', officeHours: 8.22, inOut: 3, lateHours: 0, earlyLeave: 0, status: 'Không yêu cầu đơn' },
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
            <TableHeader>Công theo đơn</TableHeader>
            <TableHeader>Số lần vô ra</TableHeader>
            <TableHeader>Số giờ đi trễ</TableHeader>
            <TableHeader>Số giờ về sớm</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.firstIn}</TableCell>
                <TableCell>{row.lastOut}</TableCell>
                <TableCell>{row.officeHours || '-'}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{row.inOut}</TableCell>
                <TableCell>{row.lateHours}</TableCell>
                <TableCell>{row.earlyLeave}</TableCell>
                <TableCell>
                  {row.status === 'Yêu cầu thêm đơn' ? (
                    <span className="px-2 py-1 text-xs font-medium text-danger-500 border border-danger-500 rounded">
                      {row.status}
                    </span>
                  ) : (
                    <span className="text-gray-500">{row.status}</span>
                  )}
                </TableCell>
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
