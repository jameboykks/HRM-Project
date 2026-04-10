import { useState } from 'react'
import { Pencil, Eye, Settings } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import SearchInput from '../components/ui/SearchInput'
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
const employeeData = [
  { id: 'HBZ000018', name: 'Bui Thi Viet', level: 'P1', title: 'QA Engineer', dob: '15/06/1995', officialDate: '01/01/2023', status: 'Thu viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000009', name: 'Dang Thi Le Hien', level: 'P1', title: 'QA Engineer', dob: '22/09/1993', officialDate: '15/03/2022', status: 'Thu viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ00000009', name: 'Le Thi Chi Thuong', level: 'P1', title: 'Software Engineer', dob: '10/12/1994', officialDate: '01/06/2021', status: 'Nghi viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Mai Truong Dang Khoa', projectManagerEmail: 'khoa.mai@hbz.vn' },
  { id: 'HBZ000025', name: 'Le Thi Hoa', level: '', title: '', dob: '05/03/1990', officialDate: '', status: 'Thu viec', role: 'MANAGER', directManager: 'Nguyen Ha Tien', directManagerEmail: 'tien.nguyen@hbz.vn', projectManager: '', projectManagerEmail: '' },
  { id: 'HBZ00068', name: 'Le Thi Kim Yen', level: 'P1', title: '', dob: '18/07/1988', officialDate: '01/01/2020', status: 'Nhan vien chinh thuc', role: 'ADMIN', directManager: 'Nguyen Ha Tien', directManagerEmail: 'tien.nguyen@hbz.vn', projectManager: 'Le Thi Hoa', projectManagerEmail: 'hoa.le@hbz.vn' },
  { id: 'HBZ000032', name: 'Le Thi Lan', level: 'P1', title: '', dob: '25/11/1992', officialDate: '15/06/2021', status: 'Nhan vien chinh thuc', role: 'ADMIN', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Le Thi Hoa', projectManagerEmail: 'hoa.le@hbz.vn' },
  { id: 'HBZ000041', name: 'Le Viet Thy', level: '', title: '', dob: '30/01/1991', officialDate: '', status: 'Thu viec', role: 'ADMIN', directManager: 'Nguyen Ha Tien', directManagerEmail: 'tien.nguyen@hbz.vn', projectManager: '', projectManagerEmail: '' },
  { id: 'HBZ000055', name: 'Mai Truong Dang Khoa', level: 'P1', title: '', dob: '12/04/1989', officialDate: '', status: '', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000060', name: 'Nguyen Duy Kiet', level: 'P1', title: '', dob: '08/08/1996', officialDate: '01/09/2022', status: 'Nhan vien chinh thuc', role: '', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000072', name: 'Nguyen Ha Tien', level: '', title: 'P1', dob: '14/02/1987', officialDate: '01/01/2019', status: 'Nhan vien chinh thuc', role: 'MANAGER', directManager: '', directManagerEmail: '', projectManager: '', projectManagerEmail: '' },
  { id: 'HBZ000078', name: 'Nguyen Thanh Thuy', level: 'P5', title: 'Software Engineer', dob: '19/10/1994', officialDate: '15/04/2022', status: 'Thu viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Mai Truong Dang Khoa', projectManagerEmail: 'khoa.mai@hbz.vn' },
  { id: 'HBZ000085', name: 'Pham Minh Duc', level: 'P1', title: 'Backend Developer', dob: '03/05/1995', officialDate: '01/07/2023', status: 'Nhan vien chinh thuc', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000091', name: 'Phan Khai', level: 'P1', title: 'Frontend Developer', dob: '27/12/1993', officialDate: '01/03/2022', status: 'Thu viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000098', name: 'Tran Le Tu Minh', level: 'P5', title: 'Software Engineer', dob: '09/06/1992', officialDate: '15/08/2021', status: 'Nhan vien chinh thuc', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Mai Truong Dang Khoa', projectManagerEmail: 'khoa.mai@hbz.vn' },
  { id: 'HBZ000102', name: 'Vo Thi Thanh Tam', level: 'P1', title: 'QA Engineer', dob: '16/09/1997', officialDate: '01/11/2023', status: 'Thu viec', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
  { id: 'HBZ000110', name: 'Vu Hoang Nam', level: 'P1', title: 'DevOps Engineer', dob: '21/03/1991', officialDate: '01/05/2022', status: 'Nhan vien chinh thuc', role: 'EMPLOYEE', directManager: 'Le Thi Kim Yen', directManagerEmail: 'yen.le@hbz.vn', projectManager: 'Nguyen Ha Tien', projectManagerEmail: 'tien.nguyen@hbz.vn' },
]

const statusVariantMap = {
  'Thu viec': 'info',
  'Nghi viec': 'danger',
  'Nhan vien chinh thuc': 'success',
}

const statusOptions = [
  { value: 'Thu viec', label: 'Thu viec' },
  { value: 'Nhan vien chinh thuc', label: 'Nhan vien chinh thuc' },
  { value: 'Nghi viec', label: 'Nghi viec' },
]

const managerOptions = [
  { value: 'Le Thi Kim Yen', label: 'Le Thi Kim Yen' },
  { value: 'Nguyen Ha Tien', label: 'Nguyen Ha Tien' },
  { value: 'Le Thi Hoa', label: 'Le Thi Hoa' },
  { value: 'Mai Truong Dang Khoa', label: 'Mai Truong Dang Khoa' },
]

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showManagerModal, setShowManagerModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Edit form state
  const [editForm, setEditForm] = useState({
    onboardDate: '',
    officialDate: '',
    role: '',
    level: '',
    title: '',
    status: '',
    shift: '',
    manager: '',
  })

  const filteredEmployees = employeeData.filter((emp) => {
    const term = searchTerm.toLowerCase()
    return (
      emp.id.toLowerCase().includes(term) ||
      emp.name.toLowerCase().includes(term) ||
      emp.title.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term)
    )
  })

  const totalPages = Math.ceil(filteredEmployees.length / pageSize)
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setEditForm({
      onboardDate: '',
      officialDate: employee.officialDate,
      role: employee.role,
      level: employee.level,
      title: employee.title,
      status: employee.status,
      shift: 'HC1,8h30,17h30',
      manager: employee.directManager,
    })
    setShowEditModal(true)
  }

  const handleViewManager = (employee) => {
    setSelectedEmployee(employee)
    setShowManagerModal(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin nhân viên</h1>
      </div>

      {/* Search and Page Size */}
      <Card>
        <div className="px-5 py-4 border-b border-surface-200 flex items-center justify-between">
          <SearchInput
            placeholder="Tìm kiếm nhân viên..."
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
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeader>Mã nhân viên</TableHeader>
            <TableHeader>Tên</TableHeader>
            <TableHeader>Cấp bậc</TableHeader>
            <TableHeader>Chức danh</TableHeader>
            <TableHeader>Ngày Onboard</TableHeader>
            <TableHeader>Ngày chính thức</TableHeader>
            <TableHeader>Trạng thái</TableHeader>
            <TableHeader>Vai trò</TableHeader>
            <TableHeader>Quản lý</TableHeader>
            <TableHeader>Hành động</TableHeader>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-medium">{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.level || '-'}</TableCell>
                <TableCell>{emp.title || '-'}</TableCell>
                <TableCell>{'-'}</TableCell>
                <TableCell>{emp.officialDate || '-'}</TableCell>
                <TableCell>
                  {emp.status ? (
                    <Badge variant={statusVariantMap[emp.status] || 'default'}>
                      {emp.status}
                    </Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  {emp.role ? (
                    <Badge variant={emp.role === 'ADMIN' ? 'warning' : emp.role === 'MANAGER' ? 'info' : 'default'}>
                      {emp.role}
                    </Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleViewManager(emp)}
                    className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer"
                    title="Xem quan ly"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleEdit(emp)}
                    className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer"
                    title="Chinh sua"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalRecords={filteredEmployees.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* ─── Edit Employee Modal ─── */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Chỉnh sửa thông tin nhân viên"
        icon={Settings}
        size="lg"
      >
        {selectedEmployee && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Mã nhân viên"
                value={selectedEmployee.id}
                readOnly
              />
              <Input
                label="Tên nhân viên"
                value={selectedEmployee.name}
                readOnly
              />
              <Input
                label="Ngày Onboard"
                type="date"
                value={editForm.onboardDate}
                onChange={(e) => setEditForm({ ...editForm, onboardDate: e.target.value })}
              />
              <Input
                label="Ngày chính thức"
                type="date"
                value={editForm.officialDate}
                onChange={(e) => setEditForm({ ...editForm, officialDate: e.target.value })}
              />
              <Select
                label="Vai trò"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                options={[
                  { value: 'EMPLOYEE', label: 'EMPLOYEE' },
                  { value: 'MANAGER', label: 'MANAGER' },
                  { value: 'ADMIN', label: 'ADMIN' },
                ]}
                placeholder="Chọn vai trò"
              />
              <Select
                label="Cấp bậc"
                value={editForm.level}
                onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                options={[
                  { value: 'P1', label: 'P1' },
                  { value: 'P2', label: 'P2' },
                  { value: 'P3', label: 'P3' },
                  { value: 'P5', label: 'P5' },
                ]}
                placeholder="Chọn cấp bậc"
              />
              <Input
                label="Chức danh"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <Select
                label="Trạng thái"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                options={statusOptions}
                placeholder="Chọn trạng thái"
              />
              <Select
                label="Ca làm việc"
                value={editForm.shift}
                onChange={(e) => setEditForm({ ...editForm, shift: e.target.value })}
                options={[
                  { value: 'HC1,8h30,17h30', label: 'HC1,8h30,17h30' },
                  { value: 'HC2,9h00,18h00', label: 'HC2,9h00,18h00' },
                  { value: 'HC3,8h00,17h00', label: 'HC3,8h00,17h00' },
                ]}
                placeholder="Chọn ca làm việc"
              />
              <Select
                label="Chọn quản lý"
                value={editForm.manager}
                onChange={(e) => setEditForm({ ...editForm, manager: e.target.value })}
                options={managerOptions}
                placeholder="Chọn quản lý"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Hủy
              </Button>
              <Button onClick={() => setShowEditModal(false)}>
                Chỉnh sửa
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* ─── View Manager Modal ─── */}
      <Modal
        isOpen={showManagerModal}
        onClose={() => setShowManagerModal(false)}
        title="Thông tin người quản lý"
        size="md"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            {/* Direct Manager */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Thông tin người quản lý trực tiếp
              </h4>
              {selectedEmployee.directManager ? (
                <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
                  <Avatar name={selectedEmployee.directManager} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedEmployee.directManager}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedEmployee.directManagerEmail}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Chưa có thông tin</p>
              )}
            </div>

            {/* Project Manager */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Thông tin người quản lý dự án
              </h4>
              {selectedEmployee.projectManager ? (
                <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg">
                  <Avatar name={selectedEmployee.projectManager} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedEmployee.projectManager}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedEmployee.projectManagerEmail}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Chưa có thông tin</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
