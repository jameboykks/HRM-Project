import { useState } from 'react'
import { Plus, Pencil, X, Circle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
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
const employeeList = [
  { id: 1, name: 'Nguyen Thanh Thuy', username: 'thuynt' },
  { id: 2, name: 'Phan Khai', username: 'khaipv' },
  { id: 3, name: 'Le Thi Kim Yen', username: 'yenltk' },
  { id: 4, name: 'Mai Truong Dang Khoa', username: 'khoamtd' },
  { id: 5, name: 'Tran Le Tu Minh', username: 'minhtlt' },
  { id: 6, name: 'Pham Minh Duc', username: 'ducpm' },
  { id: 7, name: 'Vu Hoang Nam', username: 'namvh' },
  { id: 8, name: 'Bui Thi Viet', username: 'vietbt' },
  { id: 9, name: 'Dang Thi Le Hien', username: 'hiendtl' },
  { id: 10, name: 'Vo Thi Thanh Tam', username: 'tamvtt' },
]

const projectOptions = [
  { value: 'Dự án Sinh nhật công ty', label: 'Dự án Sinh nhật công ty' },
  { value: 'TEST PRODUCTION', label: 'TEST PRODUCTION' },
  { value: 'PTD', label: 'PTD' },
  { value: 'time system', label: 'time system' },
  { value: 'haha', label: 'haha' },
  { value: 'HRMM', label: 'HRMM' },
  { value: 'Quản lý nhân công', label: 'Quản lý nhân công' },
  { value: 'Time Management System', label: 'Time Management System' },
]

const otPlanData = [
  { id: 1, project: 'Dự án Sinh nhật công ty', title: '213', description: '123', employees: [], otDate: '09/03/2026' },
  { id: 2, project: 'TEST PRODUCTION', title: '123', description: '123', employees: [], otDate: '09/03/2026' },
  { id: 3, project: 'TEST PRODUCTION', title: '123123', description: '123123123', employees: [], otDate: '08/03/2026' },
  { id: 4, project: 'TEST PRODUCTION', title: 'test', description: 'rererere', employees: [], otDate: '04/03/2026' },
  { id: 5, project: 'Dự án Sinh nhật công ty', title: 'Sinh nhật...', description: 'Tổ chức hoạt động nhân sự cơ sở...', employees: [], otDate: '24/04/2026' },
  { id: 6, project: 'PTD', title: 'OT', description: 'ewe', employees: [], otDate: '02/03/2026' },
  { id: 7, project: 'time system', title: 'ot fix bug', description: 'code nhua bug', employees: [], otDate: '06/02/2026' },
  { id: 8, project: 'haha', title: 'haha', description: 'ahah', employees: [], otDate: '21/01/2026' },
  { id: 9, project: 'HRMM', title: 'vfbhyth', description: 'fghytht', employees: [], otDate: '21/01/2026' },
  { id: 10, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 11, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 12, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 13, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 14, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 15, project: 'Quản lý nhân công', title: 'hahah', description: 'nhieu viec', employees: [], otDate: '08/01/2026' },
  { id: 16, project: 'Time Management System', title: 'OT dự án TMB', description: 'Mô tả đơn giản', employees: [], otDate: '03/01/2026' },
  { id: 17, project: 'TEST PRODUCTION', title: 'deploy', description: 'deploy production', employees: [], otDate: '28/12/2025' },
  { id: 18, project: 'HRMM', title: 'fix urgent', description: 'fix bug urgent', employees: [], otDate: '25/12/2025' },
  { id: 19, project: 'Dự án Sinh nhật công ty', title: 'chuẩn bị', description: 'chuẩn bị sự kiện', employees: [], otDate: '20/12/2025' },
  { id: 20, project: 'PTD', title: 'OT cuối năm', description: 'hoàn thành dự án', employees: [], otDate: '15/12/2025' },
  { id: 21, project: 'time system', title: 'release v2', description: 'release phiên bản mới', employees: [], otDate: '10/12/2025' },
]

// ─── Icon wrappers for modal titles ───
function CreateIcon({ className }) {
  return (
    <span className={className}>
      <Circle className="w-5 h-5 text-green-500 fill-green-500" />
    </span>
  )
}

function EditIcon({ className }) {
  return (
    <span className={className}>
      <Circle className="w-5 h-5 text-blue-500 fill-blue-500" />
    </span>
  )
}

export default function OTPlanManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const pageSize = 10

  // Create form state
  const [createForm, setCreateForm] = useState({
    project: '',
    title: '',
    description: '',
    employees: [],
    otDate: '',
  })
  const [createEmpSearch, setCreateEmpSearch] = useState('')

  // Edit form state
  const [editForm, setEditForm] = useState({
    project: '',
    title: '',
    description: '',
    employees: [],
    otDate: '',
  })
  const [editEmpSearch, setEditEmpSearch] = useState('')

  // ─── Filtering & Pagination ───
  const filteredPlans = otPlanData.filter((plan) => {
    const term = searchTerm.toLowerCase()
    return (
      plan.project.toLowerCase().includes(term) ||
      plan.title.toLowerCase().includes(term) ||
      plan.description.toLowerCase().includes(term)
    )
  })

  const totalPages = Math.ceil(filteredPlans.length / pageSize)
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // ─── Handlers ───
  const handleOpenCreate = () => {
    setCreateForm({ project: '', title: '', description: '', employees: [], otDate: '' })
    setCreateEmpSearch('')
    setShowCreate(true)
  }

  const handleEdit = (plan) => {
    setSelectedPlan(plan)
    // Pre-fill with some sample employees for demonstration
    const sampleEmployees = plan.id === 1
      ? [employeeList[0], employeeList[1]]
      : []
    setEditForm({
      project: plan.project,
      title: plan.title,
      description: plan.description,
      employees: sampleEmployees,
      otDate: plan.otDate.split('/').reverse().join('-'),
    })
    setEditEmpSearch('')
    setShowEdit(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ─── Employee multiselect helpers ───
  const toggleEmployee = (emp, form, setForm) => {
    const exists = form.employees.find((e) => e.id === emp.id)
    if (exists) {
      setForm({ ...form, employees: form.employees.filter((e) => e.id !== emp.id) })
    } else {
      setForm({ ...form, employees: [...form.employees, emp] })
    }
  }

  const selectAllEmployees = (form, setForm) => {
    setForm({ ...form, employees: [...employeeList] })
  }

  const removeEmployee = (empId, form, setForm) => {
    setForm({ ...form, employees: form.employees.filter((e) => e.id !== empId) })
  }

  const filteredCreateEmployees = employeeList.filter((emp) =>
    emp.name.toLowerCase().includes(createEmpSearch.toLowerCase()) ||
    emp.username.toLowerCase().includes(createEmpSearch.toLowerCase())
  )

  const filteredEditEmployees = employeeList.filter((emp) =>
    emp.name.toLowerCase().includes(editEmpSearch.toLowerCase()) ||
    emp.username.toLowerCase().includes(editEmpSearch.toLowerCase())
  )

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tạo và Quản lý kế hoạch OT</h1>
        <Button variant="primary" icon={Plus} onClick={handleOpenCreate}>
          Tạo kế hoạch OT
        </Button>
      </div>

      {/* Main Content */}
      <Card>
        <div className="px-5 py-4 border-b border-surface-200">
          <SearchInput
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        <Table>
          <TableHead>
            <TableHeader>Mã dự án</TableHeader>
            <TableHeader>Tên dự án</TableHeader>
            <TableHeader>Ngày OT</TableHeader>
            <TableHeader>Mô tả</TableHeader>
            <TableHeader className="!text-center">Hành động</TableHeader>
          </TableHead>
          <TableBody>
            {paginatedPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.id}</TableCell>
                <TableCell>{plan.project}</TableCell>
                <TableCell>{plan.otDate}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          totalRecords={filteredPlans.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* ─── Create OT Plan Modal ─── */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Tạo kế hoạch OT"
        icon={CreateIcon}
        size="lg"
      >
        <div className="space-y-4">
          <Select
            label="Chọn dự án"
            required
            value={createForm.project}
            onChange={(e) => setCreateForm({ ...createForm, project: e.target.value })}
            options={projectOptions}
            placeholder="Chọn dự án"
          />
          <Input
            label="Tiêu đề"
            required
            value={createForm.title}
            onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
            placeholder="Nhập tiêu đề"
          />
          <Input
            label="Mô tả lý do OT"
            required
            value={createForm.description}
            onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
            placeholder="Nhập mô tả lý do OT"
          />

          {/* Employee multiselect */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Chọn nhân viên<span className="text-danger-500 ml-0.5">*</span>
            </label>
            <div className="border border-surface-200 rounded-lg">
              <div className="flex items-center gap-2 p-2 border-b border-surface-200">
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên..."
                  value={createEmpSearch}
                  onChange={(e) => setCreateEmpSearch(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border-none outline-none placeholder:text-surface-400"
                />
                <button
                  type="button"
                  onClick={() => selectAllEmployees(createForm, setCreateForm)}
                  className="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 cursor-pointer whitespace-nowrap"
                >
                  Tất cả
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto p-2 space-y-1">
                {filteredCreateEmployees.map((emp) => {
                  const isSelected = createForm.employees.some((e) => e.id === emp.id)
                  return (
                    <label
                      key={emp.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-50 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleEmployee(emp, createForm, setCreateForm)}
                        className="rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{emp.name} ({emp.username})</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <Input
            label="Chọn ngày OT"
            required
            type="date"
            value={createForm.otDate}
            onChange={(e) => setCreateForm({ ...createForm, otDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Hủy
          </Button>
          <Button onClick={() => setShowCreate(false)}>
            Tạo đơn
          </Button>
        </div>
      </Modal>

      {/* ─── Edit OT Plan Modal ─── */}
      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title="Chỉnh sửa ngày OT cho dự án"
        icon={EditIcon}
        size="lg"
      >
        {selectedPlan && (
          <>
            <div className="space-y-4">
              <Select
                label="Dự án"
                value={editForm.project}
                onChange={(e) => setEditForm({ ...editForm, project: e.target.value })}
                options={projectOptions}
                placeholder="Chọn dự án"
              />
              <Input
                label="Tiêu đề"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <Input
                label="Mô tả"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
              <Input
                label="Ngày OT"
                type="date"
                value={editForm.otDate}
                onChange={(e) => setEditForm({ ...editForm, otDate: e.target.value })}
              />

              {/* Employee multiselect */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Chọn nhân viên
                </label>
                <div className="border border-surface-200 rounded-lg">
                  <div className="flex items-center gap-2 p-2 border-b border-surface-200">
                    <input
                      type="text"
                      placeholder="Tìm kiếm nhân viên..."
                      value={editEmpSearch}
                      onChange={(e) => setEditEmpSearch(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border-none outline-none placeholder:text-surface-400"
                    />
                    <button
                      type="button"
                      onClick={() => selectAllEmployees(editForm, setEditForm)}
                      className="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 cursor-pointer whitespace-nowrap"
                    >
                      Tất cả
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto p-2 space-y-1">
                    {filteredEditEmployees.map((emp) => {
                      const isSelected = editForm.employees.some((e) => e.id === emp.id)
                      return (
                        <label
                          key={emp.id}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-50 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleEmployee(emp, editForm, setEditForm)}
                            className="rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-700">{emp.name} ({emp.username})</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Selected employees list */}
              {editForm.employees.length > 0 && (
                <div className="border border-surface-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-200 bg-surface-50">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Tên
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Xóa
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-200">
                      {editForm.employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-surface-50">
                          <td className="px-4 py-2 text-gray-700">
                            {emp.name} ({emp.username})
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => removeEmployee(emp.id, editForm, setEditForm)}
                              className="p-1 rounded-lg text-danger-500 hover:bg-danger-50 cursor-pointer"
                              title="Xóa nhân viên"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Hủy
              </Button>
              <Button onClick={() => setShowEdit(false)}>
                Lưu thay đổi
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
