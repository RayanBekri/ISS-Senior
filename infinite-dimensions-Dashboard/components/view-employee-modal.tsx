"use client"


import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Employee {
  id: string
  name: stringg
  email: string
  phone: string
  role: "Admin" | "Employee"
  cin: string
  address: string
  city: string
  state: string
  zip: string
}

interface ViewEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export function ViewEmployeeModal({ isOpen, onClose, employee }: ViewEmployeeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Employee Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
              <p className="mt-1">{employee.id}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1">{employee.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{employee.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="mt-1">{employee.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p className="mt-1">{employee.role}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">CIN</h3>
              <p className="mt-1">{employee.cin}</p>
            </div>

            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1">
                {employee.address}, {employee.city}, {employee.state} {employee.zip}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
