"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { CheckSquare, Trash, Download, Clock, CheckCircle, AlertCircle, ArrowUpDown } from "lucide-react"
import { performBulkAction } from "@/lib/order-service"
import { useToast } from "@/components/ui/use-toast"

interface BulkActionsProps {
  selectedOrders: string[]
  orderType: "shop" | "printer"
  onActionComplete: () => void
  disabled?: boolean
}

export function BulkActions({ selectedOrders, orderType, onActionComplete, disabled = false }: BulkActionsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ action: string; label: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAction = (action: string, label: string) => {
    setCurrentAction({ action, label })
    setIsConfirmOpen(true)
  }

  const executeAction = async () => {
    if (!currentAction) return

    setIsLoading(true)
    try {
      const result = await performBulkAction(selectedOrders, currentAction.action, orderType)

      if (result.success) {
        toast({
          title: "Action completed",
          description: result.message,
        })
        onActionComplete()
      } else {
        toast({
          title: "Action failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Action failed",
        description: "An error occurred while performing the action.",
        variant: "destructive",
      })
      console.error("Error performing bulk action:", error)
    } finally {
      setIsLoading(false)
      setIsConfirmOpen(false)
    }
  }

  const hasSelected = selectedOrders.length > 0

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1" disabled={!hasSelected || disabled}>
            <CheckSquare className="h-4 w-4" />
            <span>{hasSelected ? `${selectedOrders.length} selected` : "Bulk actions"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAction("markCompleted", "Mark as Completed")}>
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <span>Mark as Completed</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("markPending", "Mark as Pending")}>
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            <span>Mark as Pending</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("markInProgress", "Mark as In Progress")}>
            <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
            <span>Mark as In Progress</span>
          </DropdownMenuItem>

          {orderType === "printer" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction("priorityHigh", "Set Priority to High")}>
                <ArrowUpDown className="h-4 w-4 mr-2 text-red-500" />
                <span>Set Priority: High</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("priorityMedium", "Set Priority to Medium")}>
                <ArrowUpDown className="h-4 w-4 mr-2 text-amber-500" />
                <span>Set Priority: Medium</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("priorityLow", "Set Priority to Low")}>
                <ArrowUpDown className="h-4 w-4 mr-2 text-green-500" />
                <span>Set Priority: Low</span>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("export", "Export Orders")}>
            <Download className="h-4 w-4 mr-2 text-blue-500" />
            <span>Export</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("delete", "Delete Orders")} className="text-red-600">
            <Trash className="h-4 w-4 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{currentAction?.label}</AlertDialogTitle>
            <AlertDialogDescription>
              {currentAction?.action === "delete" ? (
                <>
                  Are you sure you want to delete {selectedOrders.length}{" "}
                  {selectedOrders.length === 1 ? "order" : "orders"}? This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to {currentAction?.label.toLowerCase()} for {selectedOrders.length}{" "}
                  {selectedOrders.length === 1 ? "order" : "orders"}?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeAction} disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
