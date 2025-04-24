"use client"

import { useState } from "react"
import { Search, Filter, Download, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddEmployeeModal } from "@/components/add-employee-modal"
import { ViewEmployeeModal } from "@/components/view-employee-modal"
import { EditEmployeeModal } from "@/components/edit-employee-modal"
import { DeleteEmployeeModal } from "@/components/delete-employee-modal"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: "Admin" | "Employee"
  cin: string
  address: string
  city: string
  state: string
  zip: string
}

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)

  // Mock data based on the screenshot
  const employees: Employee[] = [
    {
      id: "ID1451",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Admin",
      cin: "OD997788",
      address: "2972 Westheimer Rd",
      city: "Santa Ana",
      state: "Illinois",
      zip: "85486",
    },
    {
      id: "ID1452",
      name: "Guy Hawkins",
      email: "guys@example.com",
      phone: "+62 819 1314 1435",
      role: "Admin",
      cin: "OD997788",
      address: "4517 Washington Ave",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      id: "ID1453",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2118 Thornridge Cir",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
    },
    {
      id: "ID1454",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2118 Thornridge Cir",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
    },
    {
      id: "ID1455",
      name: "Guy Hawkins",
      email: "guys@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "4517 Washington Ave",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      id: "ID1456",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2972 Westheimer Rd",
      city: "Santa Ana",
      state: "Illinois",
      zip: "85486",
    },
    {
      id: "ID1457",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2118 Thornridge Cir",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
    },
    {
      id: "ID1458",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2972 Westheimer Rd",
      city: "Santa Ana",
      state: "Illinois",
      zip: "85486",
    },
    {
      id: "ID1459",
      name: "Guy Hawkins",
      email: "guys@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "4517 Washington Ave",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      id: "ID1460",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2118 Thornridge Cir",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
    },
    {
      id: "ID1461",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2972 Westheimer Rd",
      city: "Santa Ana",
      state: "Illinois",
      zip: "85486",
    },
    {
      id: "ID1462",
      name: "Guy Hawkins",
      email: "guys@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "4517 Washington Ave",
      city: "Manchester",
      state: "Kentucky",
      zip: "39495",
    },
    {
      id: "ID1463",
      name: "Kristin Watson",
      email: "kristin@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "OD997788",
      address: "2118 Thornridge Cir",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
    },
  ]

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle checkbox selection
  const handleSelectAll = () => {
    if (selectedEmployees.length === paginatedEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(paginatedEmployees.map((employee) => employee.id))
    }
  }

  const handleSelectEmployee = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((employeeId) => employeeId !== id))
    } else {
      setSelectedEmployees([...selectedEmployees, id])
    }
  }

  // Handle employee actions
  const handleViewEmployee = (employee: Employee) => {
    setCurrentEmployee(employee)
    setIsViewModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setCurrentEmployee(employee)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Employees</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>Dashboard</span>
            <span className="mx-1">›</span>
            <span className="text-purple-500">Employees</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search for ID, name Employee"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1 bg-brand"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left font-medium">Name Employee</th>
                <th className="p-3 text-left font-medium">Contact</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">CIN</th>
                <th className="p-3 text-left font-medium">Address</th>
                <th className="p-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-purple-500">{employee.id}</span>
                      <span>{employee.name}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span>{employee.email}</span>
                      <span className="text-sm text-gray-500">{employee.phone}</span>
                    </div>
                  </td>
                  <td className="p-3">{employee.role}</td>
                  <td className="p-3">{employee.cin}</td>
                  <td className="p-3">
                    {employee.address}, {employee.city}, {employee.state} {employee.zip}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-brand" onClick={() => handleViewEmployee(employee)}>
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-brand" onClick={() => handleEditEmployee(employee)}>
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleDeleteEmployee(employee)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} Pages
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">This page on:</span>
            <div className="flex border rounded-md">
              <button
                className="px-2 py-1 border-r"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="px-3 py-1">{currentPage}</div>
              <button
                className="px-2 py-1 border-l"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}

      {isViewModalOpen && currentEmployee && (
        <ViewEmployeeModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          employee={currentEmployee}
        />
      )}

      {isEditModalOpen && currentEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          employee={currentEmployee}
        />
      )}

      {isDeleteModalOpen && currentEmployee && (
        <DeleteEmployeeModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          employee={currentEmployee}
        />
      )}
    </div>
  )
}

