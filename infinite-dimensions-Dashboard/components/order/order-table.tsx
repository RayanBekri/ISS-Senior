"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Download, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { BulkActions } from "./bulk-actions"

const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2023-06-15",
    product: "3D Printer Model X",
    amount: 599.99,
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    date: "2023-06-16",
    product: "Filament Bundle Pack",
    amount: 199.99,
    status: "Pending",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: "2023-06-17",
    product: "Custom Print Service",
    amount: 349.99,
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-06-18",
    product: "Replacement Parts Kit",
    amount: 89.99,
    status: "Cancelled",
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    date: "2023-06-19",
    product: "3D Printer Model Y",
    amount: 799.99,
    status: "Completed",
  },
  {
    id: "ORD-006",
    customer: "Jennifer Taylor",
    date: "2023-06-20",
    product: "Filament Bundle Pack",
    amount: 199.99,
    status: "Pending",
  },
  {
    id: "ORD-007",
    customer: "Robert Martinez",
    date: "2023-06-21",
    product: "Custom Print Service",
    amount: 499.99,
    status: "Completed",
  },
  {
    id: "ORD-008",
    customer: "Lisa Anderson",
    date: "2023-06-22",
    product: "3D Printer Model Z",
    amount: 1299.99,
    status: "Pending",
  },
  {
    id: "ORD-009",
    customer: "Thomas Jackson",
    date: "2023-06-23",
    product: "Replacement Parts Kit",
    amount: 89.99,
    status: "Cancelled",
  },
  {
    id: "ORD-010",
    customer: "Jessica White",
    date: "2023-06-24",
    product: "Custom Print Service",
    amount: 249.99,
    status: "Completed",
  },
]

export function OrderTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...orders]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.product.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a]
        const bValue = b[sortField as keyof typeof b]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        } else {
          return sortDirection === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number)
        }
      })
    }

    setFilteredOrders(result)

    // Clear selections when filters change
    setSelectedOrders([])
  }, [searchTerm, sortField, sortDirection, statusFilter])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-brand" />
    ) : (
      <ChevronDown className="h-4 w-4 text-brand" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-amber-100 text-amber-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectOrder = (orderId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleBulkActionComplete = () => {
    toast({
      title: "Bulk action completed",
      description: "The selected orders have been updated.",
    })
    setSelectedOrders([])
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-100 rounded mb-4"></div>
        <div className="h-80 bg-gray-100 rounded"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 border rounded-md text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <select
              className="border rounded-md text-sm py-2 px-3"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <BulkActions
            selectedOrders={selectedOrders}
            orderType="shop"
            onActionComplete={handleBulkActionComplete}
            disabled={isLoading}
          />
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="pl-4 pr-2 py-3">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all orders"
                />
              </th>
              <th
                className="text-left py-3 px-2 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-1">
                  <span>Order ID</span>
                  {getSortIcon("id")}
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("customer")}
              >
                <div className="flex items-center gap-1">
                  <span>Customer</span>
                  {getSortIcon("customer")}
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  {getSortIcon("date")}
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("product")}
              >
                <div className="flex items-center gap-1">
                  <span>Product</span>
                  {getSortIcon("product")}
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1">
                  <span>Amount</span>
                  {getSortIcon("amount")}
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  {getSortIcon("status")}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="pl-4 pr-2 py-3">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => handleSelectOrder(order.id, !!checked)}
                    aria-label={`Select order ${order.id}`}
                  />
                </td>
                <td className="py-3 px-2 font-medium">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.product}</td>
                <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
