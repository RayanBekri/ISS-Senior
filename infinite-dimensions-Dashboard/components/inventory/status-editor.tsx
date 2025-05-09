"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { updateInventoryItem, type InventoryItem } from "@/lib/inventory-service"
import { useToast } from "@/components/ui/use-toast"

interface StatusEditorProps {
  item: InventoryItem
  onUpdate: () => void
}

export function StatusEditor({ item, onUpdate }: StatusEditorProps) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)

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

  // Update the handleStatusChange function to be more robust and ensure the dropdown closes
  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      // Map status to quantity
      let newQuantity = item.quantity
      if (newStatus === "out-of-stock") {
        newQuantity = 0
      } else if (newStatus === "low-stock") {
        newQuantity = 5
      } else if (newStatus === "in-stock") {
        newQuantity = 10 // Set to a higher value to ensure it's considered "in stock"
      }

      // Log the update for debugging
      console.log(`Updating item ${item.inventory_id} status to ${newStatus}, quantity: ${newQuantity}`)

      await updateInventoryItem(item.inventory_id, {
        quantity: newQuantity,
      })

      toast({
        title: "Status Updated",
        description: `Item status changed to ${newStatus.replace(/-/g, " ")}`,
      })

      // Force a small delay before refreshing to ensure the update has been processed
      setTimeout(() => {
        onUpdate() // Refresh the inventory list
      }, 100)
    } catch (error) {
      console.error("Status update error:", error)
      toast({
        title: "Error",
        description: "Failed to update item status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const currentStatus = getCurrentStatus(item.quantity)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isUpdating}>{getStatusBadge(currentStatus)}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={currentStatus === "in-stock"} onClick={() => handleStatusChange("in-stock")}>
          <Badge className="bg-green-500">Set as In Stock</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={currentStatus === "low-stock"} onClick={() => handleStatusChange("low-stock")}>
          <Badge className="bg-amber-500">Set as Low Stock</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentStatus === "out-of-stock"}
          onClick={() => handleStatusChange("out-of-stock")}
        >
          <Badge className="bg-red-500">Set as Out of Stock</Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
