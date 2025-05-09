"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
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

interface DeleteMaterialDialogProps {
  isOpen: boolean
  material: Material
  onClose: () => void
  onDelete: () => void
}

export function DeleteMaterialDialog({ isOpen, material, onClose, onDelete }: DeleteMaterialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete Material</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this material? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            You are about to delete <span className="font-medium">{material.name}</span> with ID{" "}
            <span className="font-medium">{material.id}</span>.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
