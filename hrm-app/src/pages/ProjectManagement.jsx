import { useState, useMemo } from 'react'
import { Plus, Pencil, X, Settings } from 'lucide-react'
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

const EMPLOYEES = [
  { id: 1, name: 'Nguyen Van A' },
  { id: 2, name: 'Tran Thi B' },
  { id: 3, name: 'Le Van C' },
  { id: 4, name: 'Pham Thi D' },
  { id: 5, name: 'Hoang Van E' },
  { id: 6, name: 'Vo Thi F' },
  { id: 7, name: 'Dang Van G' },
  { id: 8, name: 'Bui Thi H' },
]

const ROLE_OPTIONS = [
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Member', label: 'Member' },
]

const INITIAL_PROJECTS = [
  { id: 'PROJECT_TEST', name: 'TEST PRODUCTION', createdDate: '24/03/2026', description: 'TEST PRODUCTION', members: [{ id: 1, name: 'Nguyen Van A', role: 'Project Manager' }] },
  { id: 'PR_07', name: 'Dự án Sinh nhật công ty', createdDate: '24/03/2026', description: 'Sinh nhật Công ty', members: [{ id: 2, name: 'Tran Thi B', role: 'Project Manager' }, { id: 3, name: 'Le Van C', role: 'Member' }] },
  { id: 'PTD', name: 'PTD', createdDate: '08/03/2026', description: 'PTD', members: [{ id: 1, name: 'Nguyen Van A', role: 'Member' }] },
  { id: 'Nbg1717r', name: 'time system', createdDate: '08/03/2026', description: '11', members: [{ id: 4, name: 'Pham Thi D', role: 'Member' }] },
  { id: 'TTIM', name: 'Tomato Time Machine', createdDate: '28/01/2026', description: 'About Tomato', members: [{ id: 5, name: 'Hoang Van E', role: 'Project Manager' }] },
  { id: 'cuoi haha', name: 'haha', createdDate: '23/01/2026', description: 'haha', members: [{ id: 6, name: 'Vo Thi F', role: 'Member' }] },
  { id: 'XYZ_001', name: 'Test Project Alpha', createdDate: '20/01/2026', description: 'Alpha testing', members: [{ id: 7, name: 'Dang Van G', role: 'Member' }] },
  { id: 'ABC_002', name: 'Beta Release', createdDate: '18/01/2026', description: 'Beta release project', members: [{ id: 1, name: 'Nguyen Van A', role: 'Project Manager' }] },
  { id: 'QWE_003', name: 'Gamma Deployment', createdDate: '15/01/2026', description: 'Deploy gamma', members: [{ id: 2, name: 'Tran Thi B', role: 'Member' }] },
  { id: 'RTY_004', name: 'Delta Integration', createdDate: '14/01/2026', description: 'Integrate delta module', members: [{ id: 3, name: 'Le Van C', role: 'Project Manager' }] },
  { id: 'UIO_005', name: 'Epsilon Monitoring', createdDate: '13/01/2026', description: 'Monitoring system', members: [{ id: 4, name: 'Pham Thi D', role: 'Member' }] },
  { id: 'ASD_006', name: 'Zeta Analytics', createdDate: '12/01/2026', description: 'Analytics dashboard', members: [{ id: 5, name: 'Hoang Van E', role: 'Member' }] },
  { id: 'FGH_007', name: 'Eta Scheduler', createdDate: '11/01/2026', description: 'Task scheduler', members: [{ id: 6, name: 'Vo Thi F', role: 'Project Manager' }] },
  { id: 'JKL_008', name: 'Theta Pipeline', createdDate: '10/01/2026', description: 'CI/CD pipeline', members: [{ id: 7, name: 'Dang Van G', role: 'Member' }] },
  { id: 'ZXC_009', name: 'Iota Logger', createdDate: '09/01/2026', description: 'Logging service', members: [{ id: 8, name: 'Bui Thi H', role: 'Member' }] },
  { id: 'HRM_09/01', name: 'Quản lý nhân công', createdDate: '08/01/2026', description: 'con miku task', members: [{ id: 1, name: 'Nguyen Van A', role: 'Project Manager' }, { id: 2, name: 'Tran Thi B', role: 'Member' }] },
  { id: 'HBZ-HRM', name: 'Time Management System', createdDate: '07/01/2026', description: 'Time Management System', members: [{ id: 3, name: 'Le Van C', role: 'Project Manager' }] },
  { id: 'VBN_010', name: 'Kappa Notifier', createdDate: '05/01/2026', description: 'Notification service', members: [{ id: 4, name: 'Pham Thi D', role: 'Member' }] },
  { id: 'MNB_011', name: 'Lambda Gateway', createdDate: '02/01/2026', description: 'API gateway', members: [{ id: 5, name: 'Hoang Van E', role: 'Member' }] },
  { id: 'P-0205-HRM', name: 'HRM', createdDate: '25/12/2025', description: 'HRM TIME Management', members: [{ id: 6, name: 'Vo Thi F', role: 'Project Manager' }] },
  { id: 'TEAM_s3heurR5', name: 'HRMI', createdDate: '18/12/2025', description: '12121', members: [{ id: 7, name: 'Dang Van G', role: 'Member' }, { id: 8, name: 'Bui Thi H', role: 'Member' }] },
]

const ITEMS_PER_PAGE = 10

export default function ProjectManagement() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    members: [],
  })

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects
    const q = searchQuery.toLowerCase()
    return projects.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [projects, searchQuery])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const openCreateModal = () => {
    setFormData({ id: '', name: '', description: '', members: [] })
    setShowCreate(true)
  }

  const openEditModal = (project) => {
    setSelectedProject(project)
    setFormData({
      id: project.id,
      name: project.name,
      description: project.description,
      members: [...project.members],
    })
    setShowEdit(true)
  }

  const closeModals = () => {
    setShowCreate(false)
    setShowEdit(false)
    setSelectedProject(null)
  }

  const handleAddEmployee = (e) => {
    const empId = Number(e.target.value)
    if (!empId) return
    const emp = EMPLOYEES.find((em) => em.id === empId)
    if (emp && !formData.members.some((m) => m.id === empId)) {
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, { id: emp.id, name: emp.name, role: 'Member' }],
      }))
    }
    e.target.value = ''
  }

  const handleRemoveMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memberId),
    }))
  }

  const handleMemberRoleChange = (memberId, newRole) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)),
    }))
  }

  const handleCreate = () => {
    if (!formData.id.trim() || !formData.name.trim() || formData.members.length === 0) return
    const today = new Date()
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
    const newProject = {
      id: formData.id,
      name: formData.name,
      createdDate: dateStr,
      description: formData.description,
      members: formData.members,
    }
    setProjects((prev) => [newProject, ...prev])
    closeModals()
  }

  const handleEdit = () => {
    if (!formData.id.trim() || !formData.name.trim() || formData.members.length === 0) return
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, id: formData.id, name: formData.name, description: formData.description, members: formData.members }
          : p
      )
    )
    closeModals()
  }

  const availableEmployees = EMPLOYEES.filter(
    (emp) => !formData.members.some((m) => m.id === emp.id)
  )

  const renderForm = (isEdit) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Mã dự án"
          required
          placeholder="Nhập mã dự án"
          value={formData.id}
          onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
        />
        <Input
          label="Tên dự án"
          required
          placeholder="Nhập tên dự án"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          label="Mô tả"
          required
          placeholder="Mô tả dự án"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
        <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Chọn nhân viên<span className="text-danger-500 ml-0.5">*</span>
        </label>
        <select
          className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white cursor-pointer"
          onChange={handleAddEmployee}
          defaultValue=""
        >
          <option value="" disabled>
            Tìm và chọn nhân viên...
          </option>
          {availableEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        </div>
      </div>

      {formData.members.length > 0 && (
        <div className="space-y-2">
          {formData.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">{member.name}</span>
                <select
                  className="text-xs px-2 py-1 border border-surface-200 rounded bg-white cursor-pointer"
                  value={member.role}
                  onChange={(e) => handleMemberRoleChange(member.id, e.target.value)}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="p-1 rounded hover:bg-surface-200 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
        <Button variant="secondary" onClick={closeModals}>
          Hủy
        </Button>
        <Button onClick={isEdit ? handleEdit : handleCreate}>
          {isEdit ? 'Chỉnh sửa dự án' : 'Tạo dự án'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tạo và quản lý dự án</h1>
        <Button icon={Plus} onClick={openCreateModal}>
          Tạo dự án
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-surface-200">
          <SearchInput
            placeholder="Tìm kiếm dự án..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableHead>
            <TableHeader>Mã dự án</TableHeader>
            <TableHeader>Tên dự án</TableHeader>
            <TableHeader>Ngày tạo</TableHeader>
            <TableHeader>Mô tả</TableHeader>
            <TableHeader className="!text-center">Hành động</TableHeader>
          </TableHead>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.createdDate}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
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
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredProjects.length}
          onPageChange={setCurrentPage}
        />
      </Card>

      <Modal
        isOpen={showCreate}
        onClose={closeModals}
        title="Tạo dự án"
        icon={Settings}
        size="lg"
      >
        {renderForm(false)}
      </Modal>

      <Modal
        isOpen={showEdit}
        onClose={closeModals}
        title="Chỉnh sửa dự án"
        icon={Settings}
        size="lg"
      >
        {renderForm(true)}
      </Modal>
    </div>
  )
}
