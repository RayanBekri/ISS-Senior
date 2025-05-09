"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Material {
  id: string
  name: string
  category: "Shop Material" | "Printing Material"
  quantity: string
  price: string
  supplier: string
  status: "Low in Stock" | "High in Stock"
}

interface EditMaterialDialogProps {
  isOpen: boolean
  material: Material
  onClose: () => void
  onEdit: (material: Material) => void
}

export function EditMaterialDialog({ isOpen, material, onClose, onEdit }: EditMaterialDialogProps) {
  const [editedMaterial, setEditedMaterial] = useState<Material>({ ...material })

  useEffect(() => {
    setEditedMaterial({ ...material })
  }, [material])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedMaterial((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedMaterial((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Format price to include DT
    const formattedPrice = editedMaterial.price.includes("DT") ? editedMaterial.price : `${editedMaterial.price}DT`

    onEdit({
      ...editedMaterial,
      price: formattedPrice,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Material</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-id" className="text-right">
                Material ID
              </Label>
              <Input id="edit-id" name="id" value={editedMaterial.id} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Material Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={editedMaterial.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Select
                value={editedMaterial.category}
                onValueChange={(value) =>
                  handleSelectChange("category", value as "Shop Material" | "Printing Material")
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shop Material">Shop Material</SelectItem>
                  <SelectItem value="Printing Material">Printing Material</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="edit-quantity"
                name="quantity"
                value={editedMaterial.quantity}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price
              </Label>
              <Input
                id="edit-price"
                name="price"
                value={editedMaterial.price.replace("DT", "")}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-supplier" className="text-right">
                Supplier
              </Label>
              <Input
                id="edit-supplier"
                name="supplier"
                value={editedMaterial.supplier}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={editedMaterial.status}
                onValueChange={(value) => handleSelectChange("status", value as "Low in Stock" | "High in Stock")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low in Stock">Low in Stock</SelectItem>
                  <SelectItem value="High in Stock">High in Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
