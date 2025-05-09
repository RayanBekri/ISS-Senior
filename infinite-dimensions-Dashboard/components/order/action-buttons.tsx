"use client"

import { useState } from "react"
import { Download, Printer, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// Simple notification function instead of using toast
const showNotification = (message: string) => {
  alert(message)
}

export function MaterialsButton() {
  const materials = [
    { name: "PLA Filament", quantity: "120g", color: "Red" },
    { name: "ABS Filament", quantity: "50g", color: "Blue" },
    { name: "Support Material", quantity: "30g", color: "White" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Package className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Materials for Model</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Material</th>
                <th className="pb-2 text-left font-medium">Quantity</th>
                <th className="pb-2 text-left font-medium">Color</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{material.name}</td>
                  <td className="py-2">{material.quantity}</td>
                  <td className="py-2">{material.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DownloadButton() {
  const handleDownload = () => {
    showNotification("Download started")
  }

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
      <Download className="h-4 w-4" />
    </Button>
  )
}

export function PrintButton() {
  const handlePrint = () => {
    showNotification("Print job sent to printer")
  }

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrint}>
      <Printer className="h-4 w-4" />
    </Button>
  )
}

export function DeleteButton({ onDelete }: { onDelete?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    } else {
      showNotification("Model deleted")
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Model</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete this model?</p>
          <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
