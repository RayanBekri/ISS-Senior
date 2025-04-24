"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface DeleteEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee
}

export function DeleteEmployeeModal({ isOpen, onClose, employee }: DeleteEmployeeModalProps) {
  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting employee:", employee.id)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Delete Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4">
            Are you sure you want to delete the employee <strong>{employee.name}</strong> with ID{" "}
            <strong>{employee.id}</strong>?
          </p>
          <p className="text-red-500 text-sm">
            This action cannot be undone. All data associated with this employee will be permanently removed.
          </p>
        </div>

        <div className="p-6 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
