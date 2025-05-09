"use client"

import type React from "react"

import { useState } from "react"
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

interface AddMaterialDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (material: Material) => void
}

export function AddMaterialDialog({ isOpen, onClose, onAdd }: AddMaterialDialogProps) {
  const [material, setMaterial] = useState<Partial<Material>>({
    id: Math.floor(10000 + Math.random() * 90000).toString(),
    name: "",
    category: "Shop Material",
    quantity: "",
    price: "",
    supplier: "",
    status: "High in Stock",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMaterial((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setMaterial((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Format price to include DT
    const formattedPrice = material.price?.includes("DT") ? material.price : `${material.price}DT`

    onAdd({
      id: material.id || Math.floor(10000 + Math.random() * 90000).toString(),
      name: material.name || "",
      category: material.category as "Shop Material" | "Printing Material",
      quantity: material.quantity || "",
      price: formattedPrice,
      supplier: material.supplier || "",
      status: material.status as "Low in Stock" | "High in Stock",
    })

    // Reset form
    setMaterial({
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      name: "",
      category: "Shop Material",
      quantity: "",
      price: "",
      supplier: "",
      status: "High in Stock",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                Material ID
              </Label>
              <Input id="id" name="id" value={material.id} onChange={handleChange} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Material Name
              </Label>
              <Input
                id="name"
                name="name"
                value={material.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={material.category} onValueChange={(value) => handleSelectChange("category", value)}>
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
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                value={material.quantity}
                onChange={handleChange}
                placeholder="e.g., 500g, 5kg, 100 units"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                value={material.price}
                onChange={handleChange}
                placeholder="e.g., 80.5"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Supplier
              </Label>
              <Input
                id="supplier"
                name="supplier"
                value={material.supplier}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={material.status} onValueChange={(value) => handleSelectChange("status", value)}>
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
            <Button type="submit">Add Material</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
