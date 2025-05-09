"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateInventoryItem, type InventoryItem } from "@/lib/inventory-service"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface StatusEditorV2Props {
  item: InventoryItem
  onUpdate: () => void
}

export function StatusEditorV2({ item, onUpdate }: StatusEditorV2Props) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity)

  // Get current status
  const getCurrentStatus = (quantity: number) => {
    if (quantity <= 0) return "out-of-stock"
    if (quantity <= 5) return "low-stock"
    return "in-stock"
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "out-of-stock":
        return <Badge className="bg-red-500 hover:bg-red-600">Out of Stock</Badge>
      case "low-stock":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Low Stock</Badge>
      case "in-stock":
        return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      // Map status to quantity
      let newQuantity = currentQuantity

      if (newStatus === "out-of-stock") {
        newQuantity = 0
      } else if (newStatus === "low-stock") {
        newQuantity = 5
      } else if (newStatus === "in-stock") {
        newQuantity = Math.max(10, currentQuantity) // Ensure it's at least 10
      }

      console.log(
        `Updating item ${item.inventory_id} status to ${newStatus}, quantity from ${currentQuantity} to ${newQuantity}`,
      )

      const result = await updateInventoryItem(item.inventory_id, {
        quantity: newQuantity,
      })

      console.log("Update result:", result)

      if (result.success) {
        setCurrentQuantity(newQuantity)

        toast({
          title: "Status Updated",
          description: `Item status changed to ${newStatus.replace(/-/g, " ")}`,
        })

        setOpen(false)
        onUpdate() // Refresh the inventory list
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update item status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const currentStatus = getCurrentStatus(currentQuantity)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
          {getStatusBadge(currentStatus)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Item Status</DialogTitle>
          <DialogDescription>
            Change the status of <strong>{item.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button
            className="flex items-center justify-start gap-2 h-auto py-3"
            variant={currentStatus === "in-stock" ? "secondary" : "outline"}
            disabled={isUpdating || currentStatus === "in-stock"}
            onClick={() => handleStatusChange("in-stock")}
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="text-left">
              <div className="font-medium">In Stock</div>
              <div className="text-xs text-muted-foreground">Item is available and quantity is sufficient</div>
            </div>
          </Button>

          <Button
            className="flex items-center justify-start gap-2 h-auto py-3"
            variant={currentStatus === "low-stock" ? "secondary" : "outline"}
            disabled={isUpdating || currentStatus === "low-stock"}
            onClick={() => handleStatusChange("low-stock")}
          >
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <div className="text-left">
              <div className="font-medium">Low Stock</div>
              <div className="text-xs text-muted-foreground">Item quantity is low and needs reordering</div>
            </div>
          </Button>

          <Button
            className="flex items-center justify-start gap-2 h-auto py-3"
            variant={currentStatus === "out-of-stock" ? "secondary" : "outline"}
            disabled={isUpdating || currentStatus === "out-of-stock"}
            onClick={() => handleStatusChange("out-of-stock")}
          >
            <XCircle className="h-5 w-5 text-red-500" />
            <div className="text-left">
              <div className="font-medium">Out of Stock</div>
              <div className="text-xs text-muted-foreground">Item is completely depleted</div>
            </div>
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
