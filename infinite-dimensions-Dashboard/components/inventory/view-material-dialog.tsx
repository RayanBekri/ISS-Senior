"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Material {
  id: string
  name: string
  category: "Shop Material" | "Printing Material"
  quantity: string
  price: string
  supplier: string
  status: "Low in Stock" | "High in Stock"
}

interface ViewMaterialDialogProps {
  isOpen: boolean
  material: Material
  onClose: () => void
}

export function ViewMaterialDialog({ isOpen, material, onClose }: ViewMaterialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Material Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Material ID:</span>
            <span className="col-span-3">{material.id}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Material Name:</span>
            <span className="col-span-3">{material.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Category:</span>
            <span className="col-span-3">{material.category}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Quantity:</span>
            <span className="col-span-3">{material.quantity}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Price:</span>
            <span className="col-span-3">{material.price}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Supplier:</span>
            <span className="col-span-3">{material.supplier}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Status:</span>
            <span
              className={`col-span-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                material.status === "Low in Stock" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
            >
              {material.status}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
