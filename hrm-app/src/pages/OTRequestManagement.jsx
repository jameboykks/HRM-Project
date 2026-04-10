import { useState } from 'react'
import { Check, X, Eye, CheckCircle2, XCircle, FileText } from 'lucide-react'
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
const otRequestData = [
  { id: 1, name: 'Nguyen Duy Kiet', email: 'kiet.nguyen@hbz.vn', type: 'Đơn OT', date: '19/03/2026', hours: 2, status: 'ĐÃ DUYỆT', reason: 'Cover Task Dự Án NPS', project: 'NPS', createdDate: '19/03/2026', startTime: '18:00', endTime: '20:00', approvedHours: 2, approvedDate: '19/03/2026', description: 'Cover task cho dự án NPS' },
  { id: 2, name: 'Nguyen Duy Kiet', email: 'kiet.nguyen@hbz.vn', type: 'Đơn OT', date: '19/03/2026', hours: 1, status: 'ĐÃ HỦY', reason: 'Cover Task Dự Án HRM', project: 'HRM', createdDate: '19/03/2026', startTime: '20:00', endTime: '21:00', approvedHours: 0, approvedDate: null, description: 'Cover task cho dự án HRM' },
  { id: 3, name: 'Nguyen Duy Kiet', email: 'kiet.nguyen@hbz.vn', type: 'Đơn OT', date: '19/03/2026', hours: 1, status: 'CHỜ DUYỆT', reason: 'Meeting với khách hàng', project: 'HRM', createdDate: '19/03/2026', startTime: '17:00', endTime: '18:00', approvedHours: 0, approvedDate: null, description: 'Meeting với khách hàng' },
  { id: 4, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '04/03/2026', hours: 2, status: 'ĐÃ DUYỆT', reason: 'Meeting với khách hàng', project: 'HRM', createdDate: '04/03/2026', startTime: '18:00', endTime: '20:00', approvedHours: 2, approvedDate: '04/03/2026', description: 'Meeting với khách hàng' },
  { id: 5, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '02/03/2026', hours: 2, status: 'CHỜ DUYỆT', reason: 'Meeting với khách hàng', project: 'HRM', createdDate: '02/03/2026', startTime: '18:00', endTime: '20:00', approvedHours: 0, approvedDate: null, description: 'Meeting với khách hàng' },
  { id: 6, name: 'Nguyen Thanh Thuy', email: 'thuy.nguyen@hbz.vn', type: 'Đơn OT', date: '06/02/2026', hours: 2, status: 'ĐÃ HỦY', reason: 'Meeting với khách hàng', project: 'TTM', createdDate: '06/02/2026', startTime: '18:00', endTime: '20:00', approvedHours: 0, approvedDate: null, description: 'Meeting với khách hàng' },
  { id: 7, name: 'Le Thi Kim Yen', email: 'yen.le@hbz.vn', type: 'Đơn OT', date: '20/01/2026', hours: 3, status: 'CHỜ DUYỆT', reason: 'Meeting với khách hàng', project: 'HRM', createdDate: '20/01/2026', startTime: '17:00', endTime: '20:00', approvedHours: 0, approvedDate: null, description: 'Meeting với khách hàng' },
  { id: 8, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '15/03/2026', hours: 2, status: 'CHỜ DUYỆT', reason: 'Cover tasks', project: 'HRM', createdDate: '15/03/2026', startTime: '18:00', endTime: '20:00', approvedHours: 0, approvedDate: null, description: 'Cover tasks' },
  { id: 9, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '14/03/2026', hours: 2, status: 'CHỜ DUYỆT', reason: 'Meeting với khách', project: 'HRM', createdDate: '14/03/2026', startTime: '18:00', endTime: '20:00', approvedHours: 0, approvedDate: null, description: 'Meeting với khách' },
  { id: 10, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '13/03/2026', hours: 1, status: 'CHỜ DUYỆT', reason: 'Cover tasks', project: 'HRM', createdDate: '13/03/2026', startTime: '17:00', endTime: '18:00', approvedHours: 0, approvedDate: null, description: 'Cover tasks' },
  { id: 11, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ bù', date: '12/03/2026', hours: 1, status: 'CHỜ DUYỆT', reason: 'Log bugs', project: 'HRM', createdDate: '12/03/2026', startTime: '17:00', endTime: '18:00', approvedHours: 0, approvedDate: null, description: 'Log bugs' },
  { id: 12, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Nghỉ bù', date: '11/03/2026', hours: 1, status: 'CHỜ DUYỆT', reason: 'Deploy production', project: 'HRM', createdDate: '11/03/2026', startTime: '17:00', endTime: '18:00', approvedHours: 0, approvedDate: null, description: 'Deploy production' },
  { id: 13, name: 'Phan Khải', email: 'khai.phan@hbz.vn', type: 'Đơn OT', date: '10/03/2026', hours: 1, status: 'CHỜ DUYỆT', reason: 'Merge code', project: 'HRM', createdDate: '10/03/2026', startTime: '17:00', endTime: '18:00', approvedHours: 0, approvedDate: null, description: 'Merge code' },
]

const statusVariantMap = {
  'CHỜ DUYỆT': 'warning',
  'ĐÃ DUYỆT': 'success',
  'ĐÃ HỦY': 'pink',
  'TỪ CHỐI': 'danger',
}

const typeVariantMap = {
  'Đơn OT': 'orange',
  'Vệ sinh': 'info',
}

export default function OTRequestManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedRows, setSelectedRows] = useState([])
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [approveReason, setApproveReason] = useState('')
  const [rejectReason, setRejectReason] = useState('')

  // Counts
  const allCount = otRequestData.length
  const pendingCount = otRequestData.filter((r) => r.status === 'CHỜ DUYỆT').length
  const completedCount = otRequestData.filter((r) => r.status !== 'CHỜ DUYỆT').length

  const tabs = [
    { key: 'all', label: 'Tất cả đơn', count: allCount },
    { key: 'pending', label: 'Đơn chờ duyệt', count: pendingCount },
    { key: 'completed', label: 'Đơn đã hoàn thành', count: completedCount },
  ]

  // Filter by tab
  const tabFiltered = otRequestData.filter((r) => {
    if (activeTab === 'pending') return r.status === 'CHỜ DUYỆT'
    if (activeTab === 'completed') return r.status !== 'CHỜ DUYỆT'
    return true
  })

  // Filter by search
  const filtered = tabFiltered.filter((r) => {
    const term = searchTerm.toLowerCase()
    return (
      r.name.toLowerCase().includes(term) ||
      r.type.toLowerCase().includes(term) ||
      r.reason.toLowerCase().includes(term)
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
      setSelectedRows(paginated.map((r) => r.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const handleBulkApprove = () => {
    const pendingSelected = otRequestData.filter(
      (r) => selectedRows.includes(r.id) && r.status === 'CHỜ DUYỆT'
    )
    if (pendingSelected.length === 0) return
    setApproveReason('')
    setShowApproveModal(true)
  }

  const handleApprove = (request) => {
    setSelectedRequest(request)
    setApproveReason('')
    setShowApproveModal(true)
  }

  const handleReject = (request) => {
    setSelectedRequest(request)
    setRejectReason('')
    setShowRejectModal(true)
  }

  const handleViewDetail = (request) => {
    setSelectedRequest(request)
    setShowDetailModal(true)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn OT</h1>
          <p className="text-sm text-gray-500 mt-1">Xem và duyệt đơn OT cho nhân viên</p>
        </div>
        {activeTab === 'pending' && (
          <Button icon={CheckCircle2} onClick={handleBulkApprove}>
            Duyệt đơn
          </Button>
        )}
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
            {activeTab === 'pending' && (
              <TableHeader className="w-10">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && selectedRows.length === paginated.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
              </TableHeader>
            )}
            <TableHeader>Nhân viên</TableHeader>
            <TableHeader>Loại đơn</TableHeader>
            <TableHeader>Thời gian OT</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
            <TableHeader>Lý do</TableHeader>
            {activeTab !== 'completed' && <TableHeader>Hành động</TableHeader>}
          </TableHead>
          <TableBody>
            {paginated.map((request) => (
              <TableRow key={request.id}>
                {activeTab === 'pending' && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(request.id)}
                      onChange={() => handleSelectRow(request.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={request.name} size="sm" />
                    <span className="font-medium text-gray-900">{request.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={typeVariantMap[request.type] || 'gray'}>
                    {request.type}
                  </Badge>
                </TableCell>
                <TableCell>{request.hours} giờ</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[request.status] || 'gray'}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="max-w-[200px] truncate block">{request.reason}</span>
                </TableCell>
                {activeTab !== 'completed' && (
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {request.status === 'CHỜ DUYỆT' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            className="p-1.5 rounded-lg text-success-600 hover:bg-success-50 cursor-pointer"
                            title="Duyệt"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            className="p-1.5 rounded-lg text-danger-500 hover:bg-danger-50 cursor-pointer"
                            title="Từ chối"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewDetail(request)}
                        className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                )}
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

      {/* ─── Approve Modal ─── */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => { setShowApproveModal(false); setSelectedRequest(null) }}
        title={selectedRequest ? 'Duyệt đơn OT' : 'Duyệt đơn OT'}
        icon={CheckCircle2}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Thông tin đơn nghỉ</h4>
            {selectedRequest ? (
              <div className="text-sm text-gray-600 space-y-1">
                <p>Nhân Viên: <span className="font-medium text-gray-900">{selectedRequest.name}</span></p>
                <p>Lý do: <span className="font-medium text-gray-900">{selectedRequest.reason}</span></p>
                <p>Ngày tạo đơn: <span className="font-medium text-gray-900">{selectedRequest.createdDate}</span></p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Duyệt {selectedRows.length} đơn đã chọn</p>
            )}
          </div>
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
            <Button variant="secondary" onClick={() => { setShowApproveModal(false); setSelectedRequest(null) }}>
              Hủy
            </Button>
            <Button variant="success" onClick={() => { setShowApproveModal(false); setSelectedRequest(null) }}>
              <Check className="w-4 h-4 mr-1" />
              Duyệt đơn
            </Button>
          </div>
        </div>
      </Modal>

      {/* ─── Reject Modal ─── */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => { setShowRejectModal(false); setSelectedRequest(null) }}
        title="Từ chối đơn OT"
        icon={XCircle}
        size="md"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Thông tin đơn nghỉ</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Nhân Viên: <span className="font-medium text-gray-900">{selectedRequest.name}</span></p>
                <p>Lý do: <span className="font-medium text-gray-900">{selectedRequest.reason}</span></p>
                <p>Ngày tạo đơn: <span className="font-medium text-gray-900">{selectedRequest.createdDate}</span></p>
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
              <Button variant="secondary" onClick={() => { setShowRejectModal(false); setSelectedRequest(null) }}>
                Hủy
              </Button>
              <Button variant="danger" onClick={() => { setShowRejectModal(false); setSelectedRequest(null) }}>
                <X className="w-4 h-4 mr-1" />
                Từ chối đơn
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Detail Modal ─── */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => { setShowDetailModal(false); setSelectedRequest(null) }}
        title="Chi tiết"
        size="md"
      >
        {selectedRequest && (
          <div className="space-y-3">
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <span className="text-gray-500">Thông tin</span>
              <span className="font-semibold text-gray-900">Chi tiết</span>
              <span className="text-gray-500">Dự án</span>
              <span className="text-gray-900">{selectedRequest.project || 'Quản lý chấm công'}</span>
              <span className="text-gray-500">Người tạo</span>
              <span className="text-gray-900">{selectedRequest.name}</span>
              <span className="text-gray-500">Ngày tạo đơn</span>
              <span className="text-gray-900">{selectedRequest.createdDate}</span>
              <span className="text-gray-500">Thời gian bắt đầu</span>
              <span className="text-gray-900">{selectedRequest.startTime} <span className="text-gray-400 text-xs">({selectedRequest.date})</span></span>
              <span className="text-gray-500">Thời gian kết thúc</span>
              <span className="text-gray-900">{selectedRequest.endTime} <span className="text-gray-400 text-xs">({selectedRequest.date})</span></span>
              <span className="text-gray-500">Số giờ được duyệt</span>
              <span className="text-gray-900">{selectedRequest.approvedHours || selectedRequest.hours} giờ</span>
              <span className="text-gray-500">Trạng thái</span>
              <span>
                <Badge variant={statusVariantMap[selectedRequest.status] || 'gray'}>
                  {selectedRequest.status}
                </Badge>
              </span>
              <span className="text-gray-500">Ngày duyệt</span>
              <span className="text-gray-900">{selectedRequest.approvedDate || '—'}</span>
              <span className="text-gray-500">Mô tả công việc</span>
              <span className="text-gray-900">{selectedRequest.description}</span>
              <span className="text-gray-500">Nhận xét</span>
              <span className="text-gray-900">—</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
