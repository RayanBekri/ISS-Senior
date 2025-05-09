"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ChevronDown, ChevronUp, Plus, Search, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialsButton, DownloadButton, PrintButton, DeleteButton } from "@/components/order/action-buttons"
import { EditPrinterOrder } from "@/components/order/edit-printer-order"
import { EditShopOrder } from "@/components/order/edit-shop-order"
import { CreateShopOrder } from "@/components/order/create-shop-order"
import { CreatePrinterOrder } from "@/components/order/create-printer-order"
import { BulkActions } from "@/components/order/bulk-actions"
import { getPrinterOrders, getShopOrders, type PrinterOrder, type ShopOrder } from "@/lib/order-service"
import { useToast } from "@/components/ui/use-toast"

export default function OrderPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [expandedPrinterOrder, setExpandedPrinterOrder] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingQty, setEditingQty] = useState<{ id: string; index: number; value: string } | null>(null)
  const [editingPriority, setEditingPriority] = useState<{ id: string; value: string } | null>(null)
  const [printerOrders, setPrinterOrders] = useState<PrinterOrder[]>([])
  const [shopOrders, setShopOrders] = useState<ShopOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTab, setActiveTab] = useState<"shop" | "printer">("shop")
  const [isCreateShopOrderOpen, setIsCreateShopOrderOpen] = useState(false)
  const [isCreatePrinterOrderOpen, setIsCreatePrinterOrderOpen] = useState(false)
  const [selectedShopOrders, setSelectedShopOrders] = useState<string[]>([])
  const [selectedPrinterOrders, setSelectedPrinterOrders] = useState<string[]>([])
  const { toast } = useToast()

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    try {
      const [printerOrdersData, shopOrdersData] = await Promise.all([getPrinterOrders(), getShopOrders()])
      setPrinterOrders(printerOrdersData)
      setShopOrders(shopOrdersData)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders, refreshKey])

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const toggleOrderExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  const togglePrinterOrderExpand = (id: string) => {
    setExpandedPrinterOrder(expandedPrinterOrder === id ? null : id)
  }

  const handleQtyEdit = (id: string, index: number, currentQty: string) => {
    setEditingQty({ id, index, value: currentQty })
  }

  const saveQtyEdit = (id: string, index: number) => {
    if (editingQty) {
      // Here you would update the actual data
      console.log(`Updated quantity for order ${id}, model index ${index} to ${editingQty.value}`)
      setEditingQty(null)
    }
  }

  const cancelQtyEdit = () => {
    setEditingQty(null)
  }

  const handlePriorityEdit = (id: string, currentPriority: string) => {
    setEditingPriority({ id, value: currentPriority })
  }

  const savePriorityEdit = (id: string) => {
    if (editingPriority) {
      // Here you would update the actual data
      console.log(`Updated priority for order ${id} to ${editingPriority.value}`)
      setEditingPriority(null)
    }
  }

  const cancelPriorityEdit = () => {
    setEditingPriority(null)
  }

  const handleDeleteModel = (orderId: string, modelId: string) => {
    console.log(`Deleted model ${modelId} from order ${orderId}`)
    // Here you would update the actual data
  }

  const handleOrderUpdated = () => {
    handleRefresh()
    toast({
      title: "Order updated",
      description: "The order has been updated successfully.",
    })
  }

  const handleCreateOrder = () => {
    if (activeTab === "shop") {
      setIsCreateShopOrderOpen(true)
    } else {
      setIsCreatePrinterOrderOpen(true)
    }
  }

  const handleSelectShopOrder = (orderId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedShopOrders([...selectedShopOrders, orderId])
    } else {
      setSelectedShopOrders(selectedShopOrders.filter((id) => id !== orderId))
    }
  }

  const handleSelectAllShopOrders = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedShopOrders(shopOrders.map((order) => order.id))
    } else {
      setSelectedShopOrders([])
    }
  }

  const handleSelectPrinterOrder = (orderId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedPrinterOrders([...selectedPrinterOrders, orderId])
    } else {
      setSelectedPrinterOrders(selectedPrinterOrders.filter((id) => id !== orderId))
    }
  }

  const handleSelectAllPrinterOrders = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedPrinterOrders(printerOrders.map((order) => order.id))
    } else {
      setSelectedPrinterOrders([])
    }
  }

  const handleBulkActionComplete = () => {
    handleRefresh()
    setSelectedShopOrders([])
    setSelectedPrinterOrders([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Orders</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">›</span>
            <span className="text-purple-600">Orders</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateOrder}>
            <Plus className="h-4 w-4 mr-2" /> Create order
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="border-gray-300 w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" className="border-gray-300 w-full md:w-auto">
            Date range
          </Button>
        </div>
      </div>

      <Tabs defaultValue="shop" className="w-full" onValueChange={(value) => setActiveTab(value as "shop" | "printer")}>
        <TabsList className="mb-6">
          <TabsTrigger value="shop">Shop Orders</TabsTrigger>
          <TabsTrigger value="printer">Printer Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="shop">
          <div className="flex justify-end mb-4">
            <BulkActions
              selectedOrders={selectedShopOrders}
              orderType="shop"
              onActionComplete={handleBulkActionComplete}
              disabled={isLoading}
            />
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading orders...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-4 pr-2 py-3">
                      <Checkbox
                        checked={selectedShopOrders.length === shopOrders.length && shopOrders.length > 0}
                        onCheckedChange={handleSelectAllShopOrders}
                        aria-label="Select all orders"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shopOrders.map((order) => (
                    <React.Fragment key={`${order.id}-${refreshKey}`}>
                      <tr className="hover:bg-gray-50">
                        <td className="pl-4 pr-2 py-3">
                          <Checkbox
                            checked={selectedShopOrders.includes(order.id)}
                            onCheckedChange={(checked) => handleSelectShopOrder(order.id, !!checked)}
                            aria-label={`Select order ${order.id}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">{order.profit}</span>
                            <span className="ml-2 text-xs text-green-600">({order.profitPercentage})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.deliveryAddress}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                          <EditShopOrder order={order} onOrderUpdated={handleOrderUpdated} />
                          <button
                            onClick={() => toggleOrderExpand(order.id)}
                            className="text-purple-600 hover:text-purple-900 ml-2"
                          >
                            {expandedOrder === order.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr>
                          <td colSpan={10} className="px-6 py-4 bg-gray-50">
                            <div className="border rounded-lg overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      QTY
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {order.products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.id}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.price}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.qty}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.total}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="bg-gray-50 px-6 py-4">
                                <div className="flex justify-end">
                                  <div className="w-64">
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Subtotal</span>
                                      <span className="text-sm font-medium">{order.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Shipping</span>
                                      <span className="text-sm font-medium">{order.shipping}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Discount</span>
                                      <span className="text-sm font-medium text-red-600">{order.discount}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                                      <span className="text-base font-medium">Total</span>
                                      <span className="text-base font-bold">{order.total}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="printer">
          <div className="flex justify-end mb-4">
            <BulkActions
              selectedOrders={selectedPrinterOrders}
              orderType="printer"
              onActionComplete={handleBulkActionComplete}
              disabled={isLoading}
            />
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading orders...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-4 pr-2 py-3">
                      <Checkbox
                        checked={selectedPrinterOrders.length === printerOrders.length && printerOrders.length > 0}
                        onCheckedChange={handleSelectAllPrinterOrders}
                        aria-label="Select all printer orders"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coloring
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {printerOrders.map((order) => (
                    <React.Fragment key={`${order.id}-${refreshKey}`}>
                      <tr className="hover:bg-gray-50">
                        <td className="pl-4 pr-2 py-3">
                          <Checkbox
                            checked={selectedPrinterOrders.includes(order.id)}
                            onCheckedChange={(checked) => handleSelectPrinterOrder(order.id, !!checked)}
                            aria-label={`Select printer order ${order.id}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.coloring}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">{order.profit}</span>
                            <span className="ml-2 text-xs text-green-600">({order.profitPercentage})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingPriority && editingPriority.id === order.id ? (
                            <div className="flex items-center space-x-2">
                              <select
                                className="border rounded px-2 py-1 text-sm"
                                value={editingPriority.value}
                                onChange={(e) => setEditingPriority({ ...editingPriority, value: e.target.value })}
                              >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>
                              <button
                                onClick={() => savePriorityEdit(order.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                ✓
                              </button>
                              <button onClick={cancelPriorityEdit} className="text-red-600 hover:text-red-900">
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div
                              className="group relative cursor-pointer"
                              onClick={() => handlePriorityEdit(order.id, order.priority)}
                            >
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(order.priority)}`}
                              >
                                {order.priority}
                              </span>
                              <div className="hidden group-hover:block absolute right-0 top-0 bg-white p-1 rounded shadow">
                                <button className="text-gray-600 hover:text-gray-900">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.deliveryAddress}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                          <EditPrinterOrder order={order} onOrderUpdated={handleOrderUpdated} />
                          <button
                            onClick={() => togglePrinterOrderExpand(order.id)}
                            className="text-purple-600 hover:text-purple-900 ml-2"
                          >
                            {expandedPrinterOrder === order.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedPrinterOrder === order.id && (
                        <tr>
                          <td colSpan={12} className="px-6 py-4 bg-gray-50">
                            <div className="border rounded-lg overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Model No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Models
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      QTY
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Materials
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Download
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Print
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Delete
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {order.models.map((model, index) => (
                                    <tr key={model.id} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{model.id}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {model.modelNo}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {model.name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {model.price}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingQty && editingQty.id === order.id && editingQty.index === index ? (
                                          <div className="flex items-center space-x-2">
                                            <input
                                              type="text"
                                              className="border rounded w-12 px-2 py-1 text-sm"
                                              value={editingQty.value}
                                              onChange={(e) => setEditingQty({ ...editingQty, value: e.target.value })}
                                            />
                                            <button
                                              onClick={() => saveQtyEdit(order.id, index)}
                                              className="text-green-600 hover:text-green-900"
                                            >
                                              ✓
                                            </button>
                                            <button onClick={cancelQtyEdit} className="text-red-600 hover:text-red-900">
                                              ✕
                                            </button>
                                          </div>
                                        ) : (
                                          <div
                                            className="group relative cursor-pointer"
                                            onClick={() => handleQtyEdit(order.id, index, model.qty)}
                                          >
                                            <span>{model.qty}</span>
                                          </div>
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {model.total}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <MaterialsButton />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <DownloadButton />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <PrintButton />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <DeleteButton onDelete={() => handleDeleteModel(order.id, model.id)} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="bg-gray-50 px-6 py-4">
                                <div className="flex justify-end">
                                  <div className="w-64">
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Subtotal</span>
                                      <span className="text-sm font-medium">{order.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Shipping</span>
                                      <span className="text-sm font-medium">{order.shipping}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600">Discount</span>
                                      <span className="text-sm font-medium text-red-600">{order.discount}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                                      <span className="text-base font-medium">Total</span>
                                      <span className="text-base font-bold">{order.total}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Order Modals */}
      <CreateShopOrder
        isOpen={isCreateShopOrderOpen}
        onClose={() => setIsCreateShopOrderOpen(false)}
        onOrderCreated={handleOrderUpdated}
      />
      <CreatePrinterOrder
        isOpen={isCreatePrinterOrderOpen}
        onClose={() => setIsCreatePrinterOrderOpen(false)}
        onOrderCreated={handleOrderUpdated}
      />
    </div>
  )
}
