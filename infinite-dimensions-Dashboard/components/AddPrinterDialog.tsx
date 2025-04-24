// components/AddPrinterDialog.tsx
"use client"

import { Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

export function AddPrinterDialog({
  open,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    name: string
    model: string
    type: string
    powerUsage: string
    buyingCost: string
    lifespan: string
    operationalStatus: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Add Printer</DialogTitle>
            <DialogClose className="h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span className="mx-2">•</span>
            <span>Printers</span>
            <span className="mx-2">•</span>
            <span className="text-primary">Add Printers</span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-medium">Printer</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Please fill in the information below. Fields marked with * are required fields.
            </p>
            <div className="space-y-4">
              {["name", "model", "type", "powerUsage", "buyingCost", "lifespan"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="mb-2 block text-sm font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    value={formData[field as keyof typeof formData]}
                    onChange={onChange}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="operationalStatus" className="mb-2 block text-sm font-medium">
                  Operational Status
                </label>
                <select
                  id="operationalStatus"
                  name="operationalStatus"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.operationalStatus}
                  onChange={(e) => onChange(e as any)}
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="out_of_service">Out of Service</option>
                </select>
              </div>
              <button
                onClick={onSubmit}
                className="w-full rounded-md bg-[#7e22ce] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e22ce]/90"
              >
                Add Printer
              </button>
            </div>
          </div>

          <div>
            <h2 className="mb-1 text-lg font-medium">Image/Printer</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Note: Format please JPG, PNG, or PDF files only.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-6">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="mb-2 h-10 w-10 text-[#7e22ce]" />
                  <p className="text-sm text-[#7e22ce]">Upload</p>
                </div>
              </div>
              <button className="ml-auto rounded-md bg-[#7e22ce] px-4 py-2 text-sm font-medium text-white hover:bg-[#7e22ce]/90">
                Save Image
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}