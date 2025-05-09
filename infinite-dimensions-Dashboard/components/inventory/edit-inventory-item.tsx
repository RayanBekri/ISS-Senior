"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2 } from "lucide-react"
import { updateInventoryItem, type InventoryItem } from "@/lib/inventory-service"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EditInventoryItemProps {
  item: InventoryItem
  onUpdate: () => void
}

export function EditInventoryItem({ item, onUpdate }: EditInventoryItemProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    measurement_unit: "",
    provider: "",
    status: "", // Added status field
  })
  const { toast } = useToast()

  useEffect(() => {
    if (item) {
      // Determine status based on quantity
      let status = "in-stock"
      if (item.quantity <= 0) {
        status = "out-of-stock"
      } else if (item.quantity <= 5) {
        status = "low-stock"
      }

      setFormData({
        name: item.name,
        quantity: item.quantity.toString(),
        measurement_unit: item.measurement_unit,
        provider: item.provider || "",
        status: status,
      })
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "status") {
      // Update quantity based on status change
      let newQuantity = formData.quantity
      if (value === "out-of-stock") {
        newQuantity = "0"
      } else if (value === "low-stock" && Number.parseFloat(formData.quantity) > 5) {
        newQuantity = "5"
      } else if (value === "in-stock" && Number.parseFloat(formData.quantity) <= 5) {
        newQuantity = "6"
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        quantity: newQuantity,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateInventoryItem(item.inventory_id, {
        name: formData.name,
        quantity: Number.parseFloat(formData.quantity),
        measurement_unit: formData.measurement_unit,
        provider: formData.provider || null,
      })

      toast({
        title: "Success",
        description: "Inventory item updated successfully",
      })

      setOpen(false)
      onUpdate() // Refresh the inventory list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inventory item",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Edit2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>Update the details of this inventory item.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Item Details</TabsTrigger>
              <TabsTrigger value="status">Status & Quantity</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-name" className="text-right text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-measurement_unit" className="text-right text-sm font-medium">
                    Unit
                  </label>
                  <Select
                    onValueChange={(value) => handleSelectChange("measurement_unit", value)}
                    value={formData.measurement_unit}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="L">Liter (L)</SelectItem>
                      <SelectItem value="ml">Milliliter (ml)</SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                      <SelectItem value="m">Meter (m)</SelectItem>
                      <SelectItem value="cm">Centimeter (cm)</SelectItem>
                      <SelectItem value="mm">Millimeter (mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-provider" className="text-right text-sm font-medium">
                    Provider
                  </label>
                  <Input
                    id="edit-provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </TabsContent>

              <TabsContent value="status" className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-status" className="text-right text-sm font-medium">
                    Status
                  </label>
                  <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="edit-quantity" className="text-right text-sm font-medium">
                    Quantity
                  </label>
                  <Input
                    id="edit-quantity"
                    name="quantity"
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => {
                      handleChange(e)
                      // Update status based on quantity
                      const qty = Number.parseFloat(e.target.value)
                      let newStatus = "in-stock"
                      if (qty <= 0) {
                        newStatus = "out-of-stock"
                      } else if (qty <= 5) {
                        newStatus = "low-stock"
                      }
                      if (newStatus !== formData.status) {
                        handleSelectChange("status", newStatus)
                      }
                    }}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="col-span-4 pt-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Status Rules:</strong>
                    <br />• Out of Stock: Quantity is 0
                    <br />• Low Stock: Quantity is between 0.01 and 5
                    <br />• In Stock: Quantity is greater than 5
                  </p>
                </div>
              </TabsContent>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
