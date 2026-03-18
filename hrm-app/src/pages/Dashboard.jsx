import { useState } from 'react'
import {
  AlertTriangle,
  Clock,
  Timer,
  CheckCircle2,
  FileCheck,
  FileClock,
  FileX2,
  Eye,
  Plus,
  X,
} from 'lucide-react'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import Tabs from '../components/ui/Tabs'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
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

// ─── Fake Data ───
const abnormalData = [
  { date: '13/03/2026', type: 'Không có dữ liệu', firstIn: '-', lastOut: '-', actual: '-', issue: '-', status: 'Yêu cầu thiếu đơn', statusVariant: 'pink' },
]

const lateEarlyData = [
  { date: '05/03/2026', type: 'Đi trễ', firstIn: '08:38:03', lastOut: '18:00:47', lateHours: 0.13, earlyHours: 0 },
]

const pendingLeaveData = []

const completedLeaveData = [
  { date: '27/02/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '14/02/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '09/02/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '17/02/2026', type: 'Nghỉ phép', hours: 8.25, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Phan Khải' },
  { date: '04/02/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '06/02/2026', type: 'Nghỉ phép', hours: 8, status: 'HOÀN TẤT', reason: 'xử lý giấy tờ', approver: 'Le Viet Thy' },
  { date: '09/01/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '06/01/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
  { date: '01/01/2026', type: 'Nghỉ phép', hours: 8, status: 'ĐÃ DUYỆT', reason: 'xử lý giấy tờ', approver: 'Le Thi Kim Yen' },
]

const otPendingData = [
  { project: 'HRM_09/01', date: '11/01/2026', startTime: '20:00', endTime: '23:00' },
  { project: 'HBZ-HRM', date: '07/01/2026', startTime: '17:00', endTime: '20:00' },
]

const otRejectedData = [
  { project: 'HBZ-HRM', date: '07/01/2026', startTime: '09:10', endTime: '23:23', reason: 'Quá giờ OT' },
  { project: 'HBZ-HRM', date: '07/01/2026', startTime: '09:00', endTime: '10:00', reason: 'Không' },
]

const leaveBalanceData = [
  { type: 'Ngày phép năm hiện tại', total: 3.00, used: 9.06, remaining: 0.00 },
  { type: 'Ngày phép tồn năm trước', total: 0.00, used: 0.00, remaining: 0.00 },
  { type: 'Ngày phép thâm niên', total: 0.00, used: 6.00, remaining: 0.00 },
  { type: 'Ngày phép cấp bậc', total: 0.00, used: 0.00, remaining: 0.00 },
  { type: 'Giờ bù hiện tại', total: 0.00, used: 2.00, remaining: 0.00 },
  { type: 'Giờ bù năm trước', total: 0.00, used: 0.00, remaining: 0.00 },
]

export default function Dashboard() {
  const [mainTab, setMainTab] = useState('working')
  const [workingSubTab, setWorkingSubTab] = useState('abnormal')
  const [otSubTab, setOtSubTab] = useState('pending')
  const [showCreateLeave, setShowCreateLeave] = useState(false)
  const [showCreateOT, setShowCreateOT] = useState(false)
  const [showLeaveBalance, setShowLeaveBalance] = useState(false)
  const [showReportIssue, setShowReportIssue] = useState(false)

  const mainTabs = [
    { key: 'working', label: 'Thời gian làm việc', count: 2 },
    { key: 'ot', label: 'Thời gian OT', count: 2 },
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tổng Quan</h1>
        <div className="flex items-center gap-3">
          {mainTab === 'working' && (
            <>
              <Button variant="ghost" onClick={() => setShowLeaveBalance(true)}>
                Quỹ Ngày nghỉ
              </Button>
              <Button icon={Plus} onClick={() => setShowCreateLeave(true)}>
                Tạo đơn
              </Button>
            </>
          )}
          {mainTab === 'ot' && (
            <Button icon={Plus} onClick={() => setShowCreateOT(true)}>
              Tạo đơn OT
            </Button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs tabs={mainTabs} activeTab={mainTab} onTabChange={setMainTab} />

      {/* ─── Working Time Tab ─── */}
      {mainTab === 'working' && (
        <div className="mt-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              count={1}
              sublabel="→ Active"
              label="Ngày dữ liệu bất thường"
              icon={AlertTriangle}
              color="red"
              active={workingSubTab === 'abnormal'}
              onClick={() => setWorkingSubTab('abnormal')}
            />
            <StatCard
              count={1}
              sublabel="→ Active"
              label="Đi trễ - Về Sớm"
              icon={Clock}
              color="blue"
              active={workingSubTab === 'late'}
              onClick={() => setWorkingSubTab('late')}
            />
            <StatCard
              count={0}
              label="Đơn chờ duyệt"
              icon={Timer}
              color="orange"
              active={workingSubTab === 'pending'}
              onClick={() => setWorkingSubTab('pending')}
            />
            <StatCard
              count={25}
              sublabel="→ Active"
              label="Đơn hoàn tất"
              icon={FileCheck}
              color="green"
              active={workingSubTab === 'completed'}
              onClick={() => setWorkingSubTab('completed')}
            />
          </div>

          {/* Working Sub-tab Content */}
          <Card>
            {workingSubTab === 'abnormal' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Ngày có dữ liệu bất thường</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Thời gian</TableHeader>
                    <TableHeader>Loại bất thường</TableHeader>
                    <TableHeader>Lần vào đầu tiên</TableHeader>
                    <TableHeader>Lần ra cuối cùng</TableHeader>
                    <TableHeader>Công thực tế</TableHeader>
                    <TableHeader>Công theo đơn</TableHeader>
                    <TableHeader>Trạng thái</TableHeader>
                  </TableHead>
                  <TableBody>
                    {abnormalData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Badge variant="danger">{row.type}</Badge>
                        </TableCell>
                        <TableCell>{row.firstIn}</TableCell>
                        <TableCell>{row.lastOut}</TableCell>
                        <TableCell>{row.actual}</TableCell>
                        <TableCell>{row.issue}</TableCell>
                        <TableCell>
                          <Badge variant="pink">{row.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination totalRecords={1} currentPage={1} totalPages={1} />
              </>
            )}

            {workingSubTab === 'late' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Bảng Ghi Chép Về Đi Muộn - Về Sớm</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Thời gian</TableHeader>
                    <TableHeader>Loại bất thường</TableHeader>
                    <TableHeader>Lần vào đầu tiên</TableHeader>
                    <TableHeader>Lần ra cuối cùng</TableHeader>
                    <TableHeader>Số giờ đi trễ</TableHeader>
                    <TableHeader>Số giờ về sớm</TableHeader>
                  </TableHead>
                  <TableBody>
                    {lateEarlyData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Badge variant="danger">Đi trễ</Badge>
                        </TableCell>
                        <TableCell>{row.firstIn}</TableCell>
                        <TableCell>{row.lastOut}</TableCell>
                        <TableCell>{row.lateHours}</TableCell>
                        <TableCell>{row.earlyHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination totalRecords={1} currentPage={1} totalPages={1} />
              </>
            )}

            {workingSubTab === 'pending' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Đơn chờ duyệt</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Thời gian</TableHeader>
                    <TableHeader>Loại đơn</TableHeader>
                    <TableHeader>Thời gian nghỉ</TableHeader>
                    <TableHeader>Trạng thái</TableHeader>
                    <TableHeader>Lý do nghỉ</TableHeader>
                    <TableHeader>Người phê duyệt</TableHeader>
                    <TableHeader>Hủy đơn</TableHeader>
                  </TableHead>
                  <TableBody>
                    <TableEmpty message="Không có dữ liệu" colSpan={7} />
                  </TableBody>
                </Table>
                <Pagination totalRecords={0} currentPage={1} totalPages={1} />
              </>
            )}

            {workingSubTab === 'completed' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Đơn đã hoàn thành</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Thời gian</TableHeader>
                    <TableHeader>Loại đơn</TableHeader>
                    <TableHeader>Thời gian nghỉ</TableHeader>
                    <TableHeader>Trạng thái</TableHeader>
                    <TableHeader>Lý do nghỉ</TableHeader>
                    <TableHeader>Người phê duyệt</TableHeader>
                  </TableHead>
                  <TableBody>
                    {completedLeaveData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Badge variant="warning">{row.type}</Badge>
                        </TableCell>
                        <TableCell>{row.hours}</TableCell>
                        <TableCell>
                          <Badge variant={row.status === 'ĐÃ DUYỆT' ? 'success' : 'info'}>
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell>{row.approver}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination totalRecords={completedLeaveData.length} currentPage={1} totalPages={1} />
              </>
            )}
          </Card>
        </div>
      )}

      {/* ─── OT Tab ─── */}
      {mainTab === 'ot' && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard
              count={2}
              sublabel="→ Active"
              label="Đang phê duyệt"
              icon={Timer}
              color="orange"
              active={otSubTab === 'pending'}
              onClick={() => setOtSubTab('pending')}
            />
            <StatCard
              count={2}
              sublabel="→ Active"
              label="Đã từ chối"
              icon={FileX2}
              color="red"
              active={otSubTab === 'rejected'}
              onClick={() => setOtSubTab('rejected')}
            />
            <StatCard
              count={0}
              label="Đã phê duyệt"
              icon={FileCheck}
              color="green"
              active={otSubTab === 'approved'}
              onClick={() => setOtSubTab('approved')}
            />
          </div>

          <Card>
            {otSubTab === 'pending' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Đơn OT đang chờ duyệt</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Dự án</TableHeader>
                    <TableHeader>Ngày OT</TableHeader>
                    <TableHeader>Thời gian bắt đầu</TableHeader>
                    <TableHeader>Thời gian kết thúc</TableHeader>
                    <TableHeader>Hành động</TableHeader>
                  </TableHead>
                  <TableBody>
                    {otPendingData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.project}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.startTime}</TableCell>
                        <TableCell>{row.endTime}</TableCell>
                        <TableCell>
                          <button className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination totalRecords={2} currentPage={1} totalPages={1} />
              </>
            )}

            {otSubTab === 'rejected' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Đơn OT đã bị từ chối</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Dự án</TableHeader>
                    <TableHeader>Ngày OT</TableHeader>
                    <TableHeader>Thời gian bắt đầu</TableHeader>
                    <TableHeader>Thời gian kết thúc</TableHeader>
                    <TableHeader>Lý do từ chối</TableHeader>
                    <TableHeader>Hành động</TableHeader>
                  </TableHead>
                  <TableBody>
                    {otRejectedData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.project}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.startTime}</TableCell>
                        <TableCell>{row.endTime}</TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell>
                          <button className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination totalRecords={2} currentPage={1} totalPages={1} />
              </>
            )}

            {otSubTab === 'approved' && (
              <>
                <div className="px-5 py-4 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-900">Đơn OT đã được duyệt</h3>
                </div>
                <Table>
                  <TableHead>
                    <TableHeader>Dự án</TableHeader>
                    <TableHeader>Ngày OT</TableHeader>
                    <TableHeader>Thời gian bắt đầu</TableHeader>
                    <TableHeader>Thời gian kết thúc</TableHeader>
                    <TableHeader>Trạng thái</TableHeader>
                    <TableHeader>Hành động</TableHeader>
                  </TableHead>
                  <TableBody>
                    <TableEmpty message="Không có dữ liệu" colSpan={6} />
                  </TableBody>
                </Table>
                <Pagination totalRecords={0} currentPage={1} totalPages={1} />
              </>
            )}
          </Card>
        </div>
      )}

      {/* Report Issue FAB */}
      <button
        onClick={() => setShowReportIssue(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-danger-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-danger-600 transition-colors z-50 cursor-pointer"
        title="Báo cáo vấn đề"
      >
        <AlertTriangle className="w-5 h-5" />
      </button>

      {/* ─── Create Leave Request Modal ─── */}
      <Modal isOpen={showCreateLeave} onClose={() => setShowCreateLeave(false)} title="Tạo Đơn Mới" icon={FileCheck} size="lg">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
              <FileCheck className="w-4 h-4" />
              Thông tin đơn
            </h4>
            <div className="mb-3 p-2 bg-warning-50 border border-warning-100 rounded-lg text-xs text-warning-600">
              Nghỉ phép hàng năm có hưởng lương
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Loại đơn" required placeholder="Nghỉ phép" options={[
                { value: 'annual', label: 'Nghỉ phép' },
                { value: 'sick', label: 'Nghỉ ốm' },
                { value: 'personal', label: 'Nghỉ việc riêng' },
              ]} defaultValue="annual" />
              <Input label="Lý do" required placeholder="Nhập lý do" />
              <Input label="Ngày bắt đầu" required type="date" />
              <Input label="Ngày kết thúc" required type="date" />
            </div>
          </div>
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
              <Clock className="w-4 h-4" />
              Thông tin phê duyệt
            </h4>
            <div className="space-y-4">
              <Select label="Người phê duyệt" required placeholder="Chọn người phê duyệt..." options={[
                { value: '1', label: 'Le Thi Kim Yen' },
                { value: '2', label: 'Phan Khải' },
              ]} />
              <Select label="Thông báo tới" required placeholder="Chọn người cần thông báo tới..." options={[
                { value: '1', label: 'Nguyen Thanh Thuy' },
                { value: '2', label: 'Tran Le Tu Minh' },
              ]} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
          <Button variant="secondary" onClick={() => setShowCreateLeave(false)}>Hủy</Button>
          <Button onClick={() => setShowCreateLeave(false)}>Tạo đơn</Button>
        </div>
      </Modal>

      {/* ─── Create OT Request Modal ─── */}
      <Modal isOpen={showCreateOT} onClose={() => setShowCreateOT(false)} title="Tạo đơn OT" icon={Plus} size="md">
        <div className="space-y-4">
          <Select label="Chọn kế hoạch OT" required placeholder="Chọn kế hoạch OT" options={[
            { value: '1', label: 'HRM_09/01' },
            { value: '2', label: 'HBZ-HRM' },
          ]} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Thời gian bắt đầu" required type="time" placeholder="00:00" />
            <Input label="Thời gian kết thúc" required type="time" placeholder="00:00" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Mô tả công việc <span className="text-danger-500">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-surface-400 min-h-[100px] resize-y"
              placeholder="Mô tả công việc ..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
          <Button variant="secondary" onClick={() => setShowCreateOT(false)}>Hủy</Button>
          <Button onClick={() => setShowCreateOT(false)}>Tạo đơn</Button>
        </div>
      </Modal>

      {/* ─── Leave Balance Modal ─── */}
      <Modal isOpen={showLeaveBalance} onClose={() => setShowLeaveBalance(false)} title="Quỹ ngày nghỉ" size="md">
        <Table>
          <TableHead>
            <TableHeader>Loại đơn</TableHeader>
            <TableHeader className="text-right">Tổng</TableHeader>
            <TableHeader className="text-right">Đã sử dụng</TableHeader>
            <TableHeader className="text-right">Còn lại</TableHeader>
          </TableHead>
          <TableBody>
            {leaveBalanceData.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.type}</TableCell>
                <TableCell className="text-right">{row.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">{row.used.toFixed(2)}</TableCell>
                <TableCell className="text-right">{row.remaining.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>

      {/* ─── Report Issue Modal ─── */}
      <Modal isOpen={showReportIssue} onClose={() => setShowReportIssue(false)} title="Báo cáo vấn đề" icon={AlertTriangle} size="md">
        <div className="space-y-4">
          <Input label="Tiêu đề" placeholder="Nhập tiêu đề vấn đề" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-surface-400 min-h-[150px] resize-y"
              placeholder="Nhập mô tả vấn đề..."
            />
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            💡 Bạn có thể kéo thả hoặc dán ảnh (Ctrl + V) trực tiếp vào ô mô tả
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
          <Button variant="secondary" onClick={() => setShowReportIssue(false)}>Đóng</Button>
          <Button onClick={() => setShowReportIssue(false)}>Gửi báo cáo</Button>
        </div>
      </Modal>
    </div>
  )
}
