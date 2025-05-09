"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Search,
  Download,
  ChevronDown,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample employee data
const employees = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Management",
    joinDate: "2022-03-15",
    status: "active",
    photo: "/abstract-profile.png",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    role: "Designer",
    department: "Creative",
    joinDate: "2022-05-22",
    status: "active",
    photo: "/abstract-profile.png",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    role: "Printer Operator",
    department: "Production",
    joinDate: "2022-01-10",
    status: "inactive",
    photo: "/abstract-profile.png",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    role: "Sales Representative",
    department: "Sales",
    joinDate: "2022-07-05",
    status: "active",
    photo: "/abstract-profile.png",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    role: "Manager",
    department: "Management",
    joinDate: "2021-11-18",
    status: "active",
    photo: "/abstract-profile.png",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    phone: "+1 (555) 678-9012",
    role: "Customer Support",
    department: "Support",
    joinDate: "2023-01-20",
    status: "active",
    photo: "/abstract-profile.png",
  },
  {
    id: "7",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "+1 (555) 789-0123",
    role: "Graphic Designer",
    department: "Creative",
    joinDate: "2022-09-12",
    status: "active",
    photo: "/abstract-profile.png",
  },
]

// Department statistics
const departmentStats = [
  { name: "Management", count: 2, color: "bg-blue-500" },
  { name: "Creative", count: 2, color: "bg-purple-500" },
  { name: "Production", count: 1, color: "bg-green-500" },
  { name: "Sales", count: 1, color: "bg-yellow-500" },
  { name: "Support", count: 1, color: "bg-pink-500" },
]

// Role statistics
const roleStats = [
  { name: "Administrator", count: 1 },
  { name: "Manager", count: 1 },
  { name: "Designer", count: 1 },
  { name: "Graphic Designer", count: 1 },
  { name: "Sales Representative", count: 1 },
  { name: "Printer Operator", count: 1 },
  { name: "Customer Support", count: 1 },
]

export function EmployeesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const confirmDelete = (id: string) => {
    setEmployeeToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    // In a real app, this would call an API to delete the employee
    toast({
      title: "Employee deleted",
      description: "The employee has been successfully removed.",
    })
    setDeleteDialogOpen(false)
    setEmployeeToDelete(null)
  }

  const viewEmployeeDetails = (employee: any) => {
    setSelectedEmployee(employee)
    setViewDialogOpen(true)
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          </div>
          <Button asChild>
            <Link href="/employees/add">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Manage your company employees, their roles, and departments.</p>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Employees</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* All Employees Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Employee</th>
                      <th className="text-left p-4">Department</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Join Date</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={employee.photo || "/placeholder.svg"}
                                alt={employee.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{employee.department}</td>
                          <td className="p-4">{employee.role}</td>
                          <td className="p-4">{new Date(employee.joinDate).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Badge
                              variant={employee.status === "active" ? "default" : "secondary"}
                              className="flex items-center gap-1 w-fit"
                            >
                              {employee.status === "active" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {employee.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewEmployeeDetails(employee)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/employees/edit/${employee.id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(employee.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No employees found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Employees Tab */}
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Employee</th>
                      <th className="text-left p-4">Department</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Join Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees
                      .filter((employee) => employee.status === "active")
                      .map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={employee.photo || "/placeholder.svg"}
                                alt={employee.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{employee.department}</td>
                          <td className="p-4">{employee.role}</td>
                          <td className="p-4">{new Date(employee.joinDate).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewEmployeeDetails(employee)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/employees/edit/${employee.id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(employee.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inactive Employees Tab */}
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Employee</th>
                      <th className="text-left p-4">Department</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Join Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees
                      .filter((employee) => employee.status === "inactive")
                      .map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={employee.photo || "/placeholder.svg"}
                                alt={employee.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{employee.department}</td>
                          <td className="p-4">{employee.role}</td>
                          <td className="p-4">{new Date(employee.joinDate).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewEmployeeDetails(employee)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/employees/edit/${employee.id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(employee.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Employee distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{dept.name}</span>
                        <span className="font-medium">{dept.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`${dept.color} h-2 rounded-full`}
                          style={{ width: `${(dept.count / employees.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>Employee distribution across roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleStats.map((role) => (
                    <div key={role.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{role.name}</span>
                        <span className="font-medium">{role.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(role.count / employees.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{employees.length}</div>
                <p className="text-muted-foreground text-sm">Total number of employees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{employees.filter((e) => e.status === "active").length}</div>
                <p className="text-muted-foreground text-sm">Currently active employees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Inactive Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{employees.filter((e) => e.status === "inactive").length}</div>
                <p className="text-muted-foreground text-sm">Currently inactive employees</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Employee Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={selectedEmployee.photo || "/placeholder.svg"}
                  alt={selectedEmployee.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                <Badge
                  variant={selectedEmployee.status === "active" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  {selectedEmployee.status === "active" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {selectedEmployee.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedEmployee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p>{selectedEmployee.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p>{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                <Button asChild>
                  <Link href={`/employees/edit/${selectedEmployee.id}`}>Edit</Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
