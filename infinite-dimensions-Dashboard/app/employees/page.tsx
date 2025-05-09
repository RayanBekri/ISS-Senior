"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [employees, setEmployees] = useState([
    {
      id: "ID12451",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Admin",
      cin: "00997788",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    },
    {
      id: "ID12452",
      name: "Guy Hawkins",
      email: "guys@examp.com",
      phone: "+62 819 1314 1435",
      role: "Admin",
      cin: "00997788",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
    },
    {
      id: "ID12453",
      name: "Kristin Watson",
      email: "kristin@examp.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    },
    {
      id: "ID12453",
      name: "Kristin Watson",
      email: "kristin@examp.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    },
    {
      id: "ID12452",
      name: "Guy Hawkins",
      email: "guys@examp.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
    },
    {
      id: "ID12451",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    },
    {
      id: "ID12453",
      name: "Kristin Watson",
      email: "kristin@examp.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    },
    {
      id: "ID12451",
      name: "Leslie Alexander",
      email: "georgia@example.com",
      phone: "+62 819 1314 1435",
      role: "Employee",
      cin: "00997788",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    },
  ])
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    cin: "",
    address: "",
  })

  // Function to handle viewing an employee
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setViewDialogOpen(true)
  }

  // Function to handle editing an employee
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee)
    setEditFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      cin: employee.cin,
      address: employee.address,
    })
    setEditDialogOpen(true)
  }

  // Function to handle saving edited employee
  const handleSaveEdit = () => {
    setEmployees(employees.map((emp) => (emp.id === selectedEmployee.id ? { ...emp, ...editFormData } : emp)))
    setEditDialogOpen(false)
    alert("Employee updated successfully!")
  }

  // Function to handle deleting an employee
  const handleDeleteEmployee = (employeeId) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== employeeId))
      alert("Employee deleted successfully!")
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-600">Employees</span>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for id, name Employee"
            className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 bg-white">
            <span>Filter</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                stroke="#344054"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 bg-white">
            <span>Export</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.5 12.5V13.3333C17.5 14.2174 17.1488 15.0652 16.5237 15.6904C15.8986 16.3155 15.0507 16.6667 14.1667 16.6667H5.83333C4.94928 16.6667 4.10143 16.3155 3.47631 15.6904C2.85119 15.0652 2.5 14.2174 2.5 13.3333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V3.33333"
                stroke="#344054"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href="/employees/add"
            className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center gap-2 hover:bg-purple-700"
          >
            <span>Add Employee</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 4.16667V15.8333M4.16667 10H15.8333"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-10 px-4 py-3 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Name Employee
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33333V12.6667M8 3.33333L12 7.33333M8 3.33333L4 7.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Contact
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33333V12.6667M8 3.33333L12 7.33333M8 3.33333L4 7.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Role
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33333V12.6667M8 3.33333L12 7.33333M8 3.33333L4 7.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  CIN
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33333V12.6667M8 3.33333L12 7.33333M8 3.33333L4 7.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Address
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33333V12.6667M8 3.33333L12 7.33333M8 3.33333L4 7.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  Action
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6.66667V9.33333M8 4V12M12 6.66667V9.33333"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm text-gray-500">{employee.id}</div>
                    <div>{employee.name}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div>{employee.email}</div>
                    <div className="text-sm text-gray-500">{employee.phone}</div>
                  </div>
                </td>
                <td className="px-4 py-4">{employee.role}</td>
                <td className="px-4 py-4">{employee.cin}</td>
                <td className="px-4 py-4">{employee.address}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={() => handleViewEmployee(employee)}
                      title="View employee"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                      onClick={() => handleEditEmployee(employee)}
                      title="Edit employee"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      title="Delete employee"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">1 - 10 of 13 Pages</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">The page on</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          >
            <option value={1}>1</option>
          </select>
          <button className="p-1 border rounded">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 12L6 8L10 4"
                stroke="#667085"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-1 border rounded">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 12L10 8L6 4"
                stroke="#667085"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* View Employee Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">ID</Label>
                <div className="col-span-3">{selectedEmployee.id}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <div className="col-span-3">{selectedEmployee.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Email</Label>
                <div className="col-span-3">{selectedEmployee.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Phone</Label>
                <div className="col-span-3">{selectedEmployee.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Role</Label>
                <div className="col-span-3">{selectedEmployee.role}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">CIN</Label>
                <div className="col-span-3">{selectedEmployee.cin}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Address</Label>
                <div className="col-span-3">{selectedEmployee.address}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cin" className="text-right">
                  CIN
                </Label>
                <Input
                  id="cin"
                  value={editFormData.cin}
                  onChange={(e) => setEditFormData({ ...editFormData, cin: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="address"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
