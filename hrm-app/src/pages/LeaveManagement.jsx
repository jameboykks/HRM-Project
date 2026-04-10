import { useState } from 'react'
import { Check, X, Eye, Pencil, FileText, CheckCircle2, XCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import SearchInput from '../components/ui/SearchInput'
import Tabs from '../components/ui/Tabs'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '../components/ui/Table'

// ─── Fake Data ───
const leaveData = [
  { id: 1, name: 'Nguyen Duy Kiet', email: 'kiet.nguyen@hbz.vn', type: 'Nghỉ phép', hours: 16, status: 'ĐÃ HỦY', reason: 'Có việc gia đình đột xuất', dates: [{ date: '09/03/2026', hours: 8 }, { date: '10/03/2026', hours: 8 }] },
  { id: 2, name: 'Nguyen Quan Tam', email: 'tam.nguyen@hbz.vn', type: 'Nghỉ phép', hours: 16, status: 'ĐÃ DUYỆT', reason: 'Xử lý giấy tờ cá nhân', dates: [{ date: '11/03/2026', hours: 8 }, { date: '12/03/2026', hours: 8 }] },
  { id: 3, name: 'Nguyen Quan Tam', email: 'tam.nguyen@hbz.vn', type: 'Nghỉ phép', hours: 16, status: 'ĐÃ DUYỆT', reason: 'Đau dạ dày', dates: [{ date: '13/03/2026', hours: 8 }, { date: '14/03/2026', hours: 8 }] },
  { id: 4, name: 'Nguyen Duy Kiet', email: 'kiet.nguyen@hbz.vn', type: 'Nghỉ phép', hours: 0, status: 'ĐÃ DUYỆT', reason: 'Lên trường gặp giảng viên hướng dẫn', dates: [{ date: '15/03/2026', hours: 0 }] },
  { id: 5, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 32, status: 'CHỜ DUYỆT', reason: 'Đau đầu', dates: [{ date: '01/03/2026', hours: 8 }, { date: '02/03/2026', hours: 8 }, { date: '03/03/2026', hours: 8 }, { date: '04/03/2026', hours: 8 }] },
  { id: 6, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 24, status: 'CHỜ DUYỆT', reason: 'Đau đầu', dates: [{ date: '05/03/2026', hours: 8 }, { date: '06/03/2026', hours: 8 }, { date: '07/03/2026', hours: 8 }] },
  { id: 7, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ HỦY', reason: 'Lên trường gặp giảng viên hướng dẫn', dates: [{ date: '08/03/2026', hours: 8 }] },
  { id: 8, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 8, status: 'TỪ CHỐI', reason: 'Lên trường gặp giảng viên hướng dẫn', dates: [{ date: '09/03/2026', hours: 8 }] },
  { id: 9, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Remote', hours: 8, status: 'ĐÃ DUYỆT', reason: 'Bàn việc gia đình', dates: [{ date: '10/03/2026', hours: 8 }] },
  { id: 10, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đi HĐ', hours: 4, status: 'CHỜ DUYỆT', reason: 'Bàn việc gia đình', dates: [{ date: '11/03/2026', hours: 4 }] },
  { id: 11, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Vệ sinh', hours: 8, status: 'CHỜ DUYỆT', reason: 'Đau bụng', dates: [{ date: '12/03/2026', hours: 8 }] },
  { id: 12, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 0.25, status: 'CHỜ DUYỆT', reason: 'Đau bụng', dates: [{ date: '13/03/2026', hours: 0.25 }] },
  { id: 13, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ HỦY', reason: 'nghỉ việc cá nhân', dates: [{ date: '14/03/2026', hours: 8 }] },
  { id: 14, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 16, status: 'ĐÃ HỦY', reason: 'Xử lý giấy tờ cá nhân', dates: [{ date: '15/03/2026', hours: 8 }, { date: '16/03/2026', hours: 8 }] },
  { id: 15, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 8, status: 'CHỜ DUYỆT', reason: 'Bị sốt xuất huyết', dates: [{ date: '17/03/2026', hours: 8 }] },
  { id: 16, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Ra ngoài', hours: 24, status: 'CHỜ DUYỆT', reason: 'Xử lý giấy tờ', dates: [{ date: '18/03/2026', hours: 8 }, { date: '19/03/2026', hours: 8 }, { date: '20/03/2026', hours: 8 }] },
  { id: 17, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ phép', hours: 8, status: 'CHỜ DUYỆT', reason: 'Có việc bận ở quê', dates: [{ date: '21/03/2026', hours: 8 }] },
]

const statusVariantMap = {
  'CHỜ DUYỆT': 'warning',
  'ĐÃ DUYỆT': 'success',
  'ĐÃ HỦY': 'pink',
  'TỪ CHỐI': 'danger',
}

const typeVariantMap = {
  'Nghỉ phép': 'orange',
  'Nghỉ không lương': 'gray',
  'Remote': 'info',
  'Đi HĐ': 'warning',
  'Vệ sinh': 'info',
  'Ra ngoài': 'orange',
}

export default function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedRows, setSelectedRows] = useState([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [approveReason, setApproveReason] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [detailFeedbacks, setDetailFeedbacks] = useState({})

  // Counts
  const allCount = leaveData.length
  const pendingCount = leaveData.filter((l) => l.status === 'CHỜ DUYỆT').length
  const completedCount = leaveData.filter((l) => l.status !== 'CHỜ DUYỆT').length

  const tabs = [
    { key: 'all', label: 'Tất cả đơn', count: allCount },
    { key: 'pending', label: 'Đơn chờ duyệt', count: pendingCount },
    { key: 'completed', label: 'Đơn đã hoàn thành', count: completedCount },
  ]

  // Filter by tab
  const tabFiltered = leaveData.filter((l) => {
    if (activeTab === 'pending') return l.status === 'CHỜ DUYỆT'
    if (activeTab === 'completed') return l.status !== 'CHỜ DUYỆT'
    return true
  })

  // Filter by search
  const filtered = tabFiltered.filter((l) => {
    const term = searchTerm.toLowerCase()
    return (
      l.name.toLowerCase().includes(term) ||
      l.type.toLowerCase().includes(term) ||
      l.reason.toLowerCase().includes(term)
    )
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
    setSelectedRows([])
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginated.map((l) => l.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const handleViewDetail = (leave) => {
    setSelectedLeave(leave)
    setDetailFeedbacks({})
    setShowDetailModal(true)
  }

  const handleApprove = (leave) => {
    setSelectedLeave(leave)
    setApproveReason('')
    setShowApproveModal(true)
  }

  const handleReject = (leave) => {
    setSelectedLeave(leave)
    setRejectReason('')
    setShowRejectModal(true)
  }

  const handleBulkApprove = () => {
    const pendingSelected = leaveData.filter(
      (l) => selectedRows.includes(l.id) && l.status === 'CHỜ DUYỆT'
    )
    if (pendingSelected.length === 0) return
    setSelectedLeave(null)
    setApproveReason('')
    setShowApproveModal(true)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn nghỉ phép</h1>
          <p className="text-sm text-gray-500 mt-1">Xem và duyệt đơn nghỉ phép cho nhân viên</p>
        </div>
        <Button icon={CheckCircle2} onClick={handleBulkApprove}>
          Duyệt đơn
        </Button>
      </div>

      <Card>
        {/* Tabs */}
        <div className="px-5 pt-3">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Search + Page Size */}
        <div className="px-5 py-4 border-b border-surface-200 flex items-center justify-between">
          <SearchInput
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Hiển thị:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-surface-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHead>
            <TableHeader className="w-10">
              <input
                type="checkbox"
                checked={paginated.length > 0 && selectedRows.length === paginated.length}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
            </TableHeader>
            <TableHeader>Nhân viên</TableHeader>
            <TableHeader>Loại đơn</TableHeader>
            <TableHeader>Thời gian nghỉ</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
            <TableHeader>Lý do</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </TableHead>
          <TableBody>
            {paginated.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(leave.id)}
                    onChange={() => handleSelectRow(leave.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={leave.name} size="sm" />
                    <span className="font-medium text-gray-900">{leave.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={typeVariantMap[leave.type] || 'gray'}>
                    {leave.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {leave.hours != null ? `${leave.hours} giờ` : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[leave.status] || 'gray'}>
                    {leave.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="max-w-[200px] truncate block">{leave.reason || '-'}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleViewDetail(leave)}
                      className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {leave.status === 'CHỜ DUYỆT' && (
                      <>
                        <button
                          onClick={() => handleApprove(leave)}
                          className="p-1.5 rounded-lg text-success-600 hover:bg-success-50 cursor-pointer"
                          title="Duyệt"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(leave)}
                          className="p-1.5 rounded-lg text-danger-500 hover:bg-danger-50 cursor-pointer"
                          title="Từ chối"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalRecords={filtered.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>

      {/* ─── View Leave Detail Modal ─── */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết đơn nghỉ"
        icon={FileText}
        size="lg"
      >
        {selectedLeave && (
          <div className="space-y-5">
            {/* Employee info */}
            <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
              <Avatar name={selectedLeave.name} />
              <div>
                <p className="font-medium text-gray-900">{selectedLeave.name}</p>
                <p className="text-sm text-gray-500">{selectedLeave.email}</p>
              </div>
            </div>

            {/* Leave detail table */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Chi tiết ngày nghỉ</h4>
              <Table>
                <TableHead>
                  <TableHeader>Ngày</TableHeader>
                  <TableHeader>Thời gian nghỉ</TableHeader>
                  <TableHeader>Trạng thái</TableHeader>
                  <TableHeader>Phản hồi</TableHeader>
                  <TableHeader>Hành động</TableHeader>
                </TableHead>
                <TableBody>
                  {selectedLeave.dates.length > 0 ? (
                    selectedLeave.dates.map((d, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{d.date}</TableCell>
                        <TableCell>{d.hours} giờ</TableCell>
                        <TableCell>
                          <Badge variant={statusVariantMap[selectedLeave.status] || 'gray'}>
                            {selectedLeave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            placeholder="Nhập phản hồi..."
                            value={detailFeedbacks[idx] || ''}
                            onChange={(e) =>
                              setDetailFeedbacks((prev) => ({
                                ...prev,
                                [idx]: e.target.value,
                              }))
                            }
                            className="w-full px-2 py-1 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-surface-400"
                          />
                        </TableCell>
                        <TableCell>
                          <button className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {selectedLeave.status === 'CHỜ DUYỆT' && (
                            <button className="p-1.5 rounded-lg text-danger-500 hover:bg-danger-50 cursor-pointer">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400">
                        Không có dữ liệu ngày nghỉ
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Approve Modal ─── */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => { setShowApproveModal(false); setSelectedLeave(null) }}
        title="Duyệt đơn làm thêm giờ"
        icon={CheckCircle2}
        size="md"
      >
        <div className="space-y-4">
          {selectedLeave && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Thông tin đơn nghỉ</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Nhân Viên: <span className="font-medium text-gray-900">{selectedLeave.name}</span></p>
                <p>Lý do: <span className="font-medium text-gray-900">{selectedLeave.reason}</span></p>
                <p>Ngày tạo đơn: <span className="font-medium text-gray-900">{selectedLeave.dates[0]?.date}</span></p>
              </div>
            </div>
          )}
          {!selectedLeave && (
            <p className="text-sm text-gray-500">Duyệt {selectedRows.length} đơn đã chọn</p>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Lý do phê duyệt</label>
            <input
              type="text"
              value={approveReason}
              onChange={(e) => setApproveReason(e.target.value)}
              placeholder="Vui lòng nhập lý do phê duyệt (tùy chọn)"
              className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-surface-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
            <Button variant="secondary" onClick={() => { setShowApproveModal(false); setSelectedLeave(null) }}>
              Hủy
            </Button>
            <Button variant="success" onClick={() => { setShowApproveModal(false); setSelectedLeave(null) }}>
              <Check className="w-4 h-4 mr-1" />
              Duyệt đơn
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── Reject Modal ─── */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => { setShowRejectModal(false); setSelectedLeave(null) }}
        title="Từ chối đơn xin nghỉ"
        icon={XCircle}
        size="md"
      >
        {selectedLeave && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Thông tin đơn nghỉ</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Nhân Viên: <span className="font-medium text-gray-900">{selectedLeave.name}</span></p>
                <p>Lý do: <span className="font-medium text-gray-900">{selectedLeave.reason}</span></p>
                <p>Ngày tạo đơn: <span className="font-medium text-gray-900">{selectedLeave.dates[0]?.date}</span></p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Lý do từ chối <span className="text-danger-500">*</span>
              </label>
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Vui lòng nhập lý do từ chối"
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-surface-400"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
              <Button variant="secondary" onClick={() => { setShowRejectModal(false); setSelectedLeave(null) }}>
                Hủy
              </Button>
              <Button variant="danger" onClick={() => { setShowRejectModal(false); setSelectedLeave(null) }}>
                <X className="w-4 h-4 mr-1" />
                Từ chối đơn
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
