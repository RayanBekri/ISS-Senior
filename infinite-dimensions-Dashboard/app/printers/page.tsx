"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Plus, FileText } from "lucide-react"

// Sample printer data
const initialPrinters = [
  {
    id: 1,
    name: "Printer 01",
    model: "Ultimaker S5",
    type: "MULTICOLOR",
    powerUsage: 350,
    buyingCost: 6500,
    lifeSpan: "5 years",
  },
  {
    id: 2,
    name: "Printer 02",
    model: "Prusa i3 MK3S+",
    type: "SINGLE_COLOR",
    powerUsage: 120,
    buyingCost: 2800,
    lifeSpan: "4 years",
  },
  {
    id: 3,
    name: "Printer 03",
    model: "Creality Ender 3 V2",
    type: "SINGLE_COLOR",
    powerUsage: 350,
    buyingCost: 1200,
    lifeSpan: "3 years",
  },
  {
    id: 4,
    name: "Printer 04",
    model: "Formlabs Form 3",
    type: "SINGLE_COLOR",
    powerUsage: 100,
    buyingCost: 4300,
    lifeSpan: "5 years",
  },
  {
    id: 5,
    name: "Printer 05",
    model: "Bambu Lab X1-Carbon",
    type: "MULTICOLOR",
    powerUsage: 280,
    buyingCost: 3900,
    lifeSpan: "4 years",
  },
]

// Sample printer orders
const printerOrders = [
  { id: 101, orderId: "ORD-2024-001", clientName: "Leslie Alexander", date: "2024-05-01", status: "DONE" },
  { id: 102, orderId: "ORD-2024-015", clientName: "Guy Hawkins", date: "2024-05-03", status: "DONE" },
  { id: 103, orderId: "ORD-2024-023", clientName: "Kristin Watson", date: "2024-05-05", status: "DONE" },
  { id: 104, orderId: "ORD-2024-042", clientName: "Leslie Alexander", date: "2024-05-10", status: "DONE" },
]

interface PrinterType {
  id: number
  name: string
  model: string
  type: string
  powerUsage: number
  buyingCost: number
  lifeSpan: string
}

interface PrinterOrder {
  id: number
  orderId: string
  clientName: string
  date: string
  status: string
}

export default function PrintersPage() {
  const [printers, setPrinters] = useState<PrinterType[]>(initialPrinters)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false)
  const [currentPrinter, setCurrentPrinter] = useState<PrinterType | null>(null)
  const [newPrinter, setNewPrinter] = useState<Partial<PrinterType>>({
    name: "",
    model: "",
    type: "SINGLE_COLOR",
    powerUsage: 0,
    buyingCost: 0,
    lifeSpan: "",
  })
  const [inputErrors, setInputErrors] = useState({
    powerUsage: false,
    buyingCost: false,
  })

  // Handler for opening the add printer dialog
  const handleAddPrinter = () => {
    setNewPrinter({
      name: "",
      model: "",
      type: "SINGLE_COLOR",
      powerUsage: 0,
      buyingCost: 0,
      lifeSpan: "",
    })
    setInputErrors({
      powerUsage: false,
      buyingCost: false,
    })
    setIsAddDialogOpen(true)
  }

  // Handler for opening the edit printer dialog
  const handleEditPrinter = (printer: PrinterType) => {
    setCurrentPrinter(printer)
    setNewPrinter({ ...printer })
    setInputErrors({
      powerUsage: false,
      buyingCost: false,
    })
    setIsEditDialogOpen(true)
  }

  // Handler for opening the delete printer dialog
  const handleDeletePrinter = (printer: PrinterType) => {
    setCurrentPrinter(printer)
    setIsDeleteDialogOpen(true)
  }

  // Handler for opening the printer orders dialog
  const handleViewOrders = (printer: PrinterType) => {
    setCurrentPrinter(printer)
    setIsOrdersDialogOpen(true)
  }

  // Handler for numeric input validation
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, field: "powerUsage" | "buyingCost") => {
    const value = e.target.value

    // Allow empty input for better UX
    if (value === "") {
      setNewPrinter({ ...newPrinter, [field]: 0 })
      setInputErrors({ ...inputErrors, [field]: false })
      return
    }

    // Check if input is a valid integer
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue) && Number.isInteger(numValue) && numValue >= 0) {
      setNewPrinter({ ...newPrinter, [field]: numValue })
      setInputErrors({ ...inputErrors, [field]: false })
    } else {
      setInputErrors({ ...inputErrors, [field]: true })
    }
  }

  // Handler for saving a new printer
  const handleSaveNewPrinter = () => {
    // Validate inputs
    if (inputErrors.powerUsage || inputErrors.buyingCost) {
      // Don't save if there are errors
      return
    }

    const id = Math.max(0, ...printers.map((p) => p.id)) + 1
    setPrinters([...printers, { id, ...newPrinter } as PrinterType])
    setIsAddDialogOpen(false)

    // Show success toast
    if (window.toast) {
      window.toast("Printer added successfully", "success")
    }
  }

  // Handler for updating an existing printer
  const handleUpdatePrinter = () => {
    if (!currentPrinter) return

    // Validate inputs
    if (inputErrors.powerUsage || inputErrors.buyingCost) {
      // Don't update if there are errors
      return
    }

    setPrinters(printers.map((p) => (p.id === currentPrinter.id ? ({ ...newPrinter, id: p.id } as PrinterType) : p)))
    setIsEditDialogOpen(false)

    // Show success toast
    if (window.toast) {
      window.toast("Printer updated successfully", "success")
    }
  }

  // Handler for deleting a printer
  const handleConfirmDelete = () => {
    if (!currentPrinter) return

    setPrinters(printers.filter((p) => p.id !== currentPrinter.id))
    setIsDeleteDialogOpen(false)

    // Show success toast
    if (window.toast) {
      window.toast("Printer deleted successfully", "success")
    }
  }

  // Format number with thousand separators
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Printers</h1>
        <Button onClick={handleAddPrinter} className="bg-brand text-white hover:bg-brand/90">
          <Plus className="mr-2 h-4 w-4" /> Add Printer
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Printer Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Power Usage</TableHead>
                <TableHead>Buying Cost</TableHead>
                <TableHead>Life Span</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {printers.map((printer) => (
                <TableRow key={printer.id}>
                  <TableCell className="font-medium">{printer.name}</TableCell>
                  <TableCell>{printer.model}</TableCell>
                  <TableCell>{printer.type === "MULTICOLOR" ? "Multicolor" : "Single Color"}</TableCell>
                  <TableCell>{printer.powerUsage}W</TableCell>
                  <TableCell>DT {formatNumber(printer.buyingCost)}</TableCell>
                  <TableCell>{printer.lifeSpan}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPrinter(printer)}
                        title="Edit printer"
                      >
                        <Edit className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePrinter(printer)}
                        title="Delete printer"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewOrders(printer)} title="View orders">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Printer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Printer</DialogTitle>
            <DialogDescription>Enter the details for the new printer.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPrinter.name}
                onChange={(e) => setNewPrinter({ ...newPrinter, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Model
              </Label>
              <Input
                id="model"
                value={newPrinter.model}
                onChange={(e) => setNewPrinter({ ...newPrinter, model: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={newPrinter.type} onValueChange={(value) => setNewPrinter({ ...newPrinter, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SINGLE_COLOR">Single Color</SelectItem>
                  <SelectItem value="MULTICOLOR">Multicolor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="powerUsage" className="text-right">
                Power Usage
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="powerUsage"
                  type="number"
                  value={newPrinter.powerUsage || ""}
                  onChange={(e) => handleNumericInput(e, "powerUsage")}
                  className={`pr-8 ${inputErrors.powerUsage ? "border-red-500" : ""}`}
                  placeholder="Enter power in watts"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">W</span>
                {inputErrors.powerUsage && <p className="text-red-500 text-sm mt-1">Please enter a valid integer</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buyingCost" className="text-right">
                Buying Cost
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">DT</span>
                <Input
                  id="buyingCost"
                  type="number"
                  value={newPrinter.buyingCost || ""}
                  onChange={(e) => handleNumericInput(e, "buyingCost")}
                  className={`pl-8 ${inputErrors.buyingCost ? "border-red-500" : ""}`}
                  placeholder="Enter cost"
                  min="0"
                />
                {inputErrors.buyingCost && <p className="text-red-500 text-sm mt-1">Please enter a valid integer</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lifeSpan" className="text-right">
                Life Span
              </Label>
              <Input
                id="lifeSpan"
                value={newPrinter.lifeSpan}
                onChange={(e) => setNewPrinter({ ...newPrinter, lifeSpan: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 5 years"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveNewPrinter}
              className="bg-brand text-white hover:bg-brand/90"
              disabled={inputErrors.powerUsage || inputErrors.buyingCost}
            >
              Save Printer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Printer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Printer</DialogTitle>
            <DialogDescription>Update the printer details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={newPrinter.name}
                onChange={(e) => setNewPrinter({ ...newPrinter, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model" className="text-right">
                Model
              </Label>
              <Input
                id="edit-model"
                value={newPrinter.model}
                onChange={(e) => setNewPrinter({ ...newPrinter, model: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select value={newPrinter.type} onValueChange={(value) => setNewPrinter({ ...newPrinter, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SINGLE_COLOR">Single Color</SelectItem>
                  <SelectItem value="MULTICOLOR">Multicolor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-powerUsage" className="text-right">
                Power Usage
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="edit-powerUsage"
                  type="number"
                  value={newPrinter.powerUsage || ""}
                  onChange={(e) => handleNumericInput(e, "powerUsage")}
                  className={`pr-8 ${inputErrors.powerUsage ? "border-red-500" : ""}`}
                  placeholder="Enter power in watts"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">W</span>
                {inputErrors.powerUsage && <p className="text-red-500 text-sm mt-1">Please enter a valid integer</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-buyingCost" className="text-right">
                Buying Cost
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">DT</span>
                <Input
                  id="edit-buyingCost"
                  type="number"
                  value={newPrinter.buyingCost || ""}
                  onChange={(e) => handleNumericInput(e, "buyingCost")}
                  className={`pl-8 ${inputErrors.buyingCost ? "border-red-500" : ""}`}
                  placeholder="Enter cost"
                  min="0"
                />
                {inputErrors.buyingCost && <p className="text-red-500 text-sm mt-1">Please enter a valid integer</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-lifeSpan" className="text-right">
                Life Span
              </Label>
              <Input
                id="edit-lifeSpan"
                value={newPrinter.lifeSpan}
                onChange={(e) => setNewPrinter({ ...newPrinter, lifeSpan: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePrinter}
              className="bg-brand text-white hover:bg-brand/90"
              disabled={inputErrors.powerUsage || inputErrors.buyingCost}
            >
              Update Printer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the printer "{currentPrinter?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Printer Orders Dialog */}
      <Dialog open={isOrdersDialogOpen} onOpenChange={setIsOrdersDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Orders Printed by {currentPrinter?.name}</DialogTitle>
            <DialogDescription>List of all orders that were printed using this printer.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {printerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOrdersDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
