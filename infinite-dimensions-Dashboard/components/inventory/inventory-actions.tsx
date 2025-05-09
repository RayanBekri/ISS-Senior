"use client"

import type React from "react"

import { useState } from "react"
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
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon, BellIcon } from "lucide-react"
import { addInventoryItem, getLowStockItems, type InventoryItem } from "@/lib/inventory-service"
import { useToast } from "@/components/ui/use-toast"

// Add Inventory Item Form
export function AddInventoryItem() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    measurement_unit: "",
    provider: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addInventoryItem({
        name: formData.name,
        quantity: Number.parseFloat(formData.quantity),
        measurement_unit: formData.measurement_unit,
        provider: formData.provider || null,
      })

      toast({
        title: "Success",
        description: "Inventory item added successfully",
      })

      setOpen(false)
      setFormData({
        name: "",
        quantity: "",
        measurement_unit: "",
        provider: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add inventory item",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="ml-auto">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Item
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>Create a new inventory item with the form below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right text-sm font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                step="0.01"
                value={formData.quantity}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="measurement_unit" className="text-right text-sm font-medium">
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
              <label htmlFor="provider" className="text-right text-sm font-medium">
                Provider
              </label>
              <Input
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Inventory Filter
export function InventoryFilter({ onFilter }: { onFilter: (filters: any) => void }) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    provider: "",
    minQuantity: "",
    maxQuantity: "",
    unit: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    onFilter(filters)
    toast({
      title: "Filters Applied",
      description: "The inventory list has been filtered",
    })
    setOpen(false)
  }

  const handleResetFilters = () => {
    setFilters({
      provider: "",
      minQuantity: "",
      maxQuantity: "",
      unit: "",
    })
    onFilter({})
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared",
    })
    setOpen(false)
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <FilterIcon className="mr-2 h-4 w-4" />
        Filter
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Inventory</DialogTitle>
            <DialogDescription>Apply filters to narrow down your inventory items.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="provider-filter" className="text-sm font-medium">
                Provider
              </label>
              <Input
                id="provider-filter"
                name="provider"
                value={filters.provider}
                onChange={handleChange}
                placeholder="Filter by provider"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="unit-filter" className="text-sm font-medium">
                Measurement Unit
              </label>
              <Select onValueChange={(value) => handleSelectChange("unit", value)} value={filters.unit}>
                <SelectTrigger id="unit-filter">
                  <SelectValue placeholder="All units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All units</SelectItem>
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
            <div className="space-y-2">
              <label htmlFor="quantity-range" className="text-sm font-medium">
                Quantity Range
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="min-quantity"
                  name="minQuantity"
                  type="number"
                  step="0.01"
                  value={filters.minQuantity}
                  onChange={handleChange}
                  placeholder="Min"
                />
                <span>to</span>
                <Input
                  id="max-quantity"
                  name="maxQuantity"
                  type="number"
                  step="0.01"
                  value={filters.maxQuantity}
                  onChange={handleChange}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Inventory Search
export function InventorySearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input type="search" placeholder="Search inventory..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button type="submit" size="icon">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

// Export Inventory
export function ExportInventory({ data }: { data: InventoryItem[] }) {
  const { toast } = useToast()

  const handleExport = () => {
    try {
      // Convert data to CSV
      const headers = ["ID", "Name", "Quantity", "Unit", "Provider", "Created", "Updated"]
      const csvRows = [
        headers.join(","),
        ...data.map((item) =>
          [
            item.inventory_id,
            `"${item.name}"`,
            item.quantity,
            item.measurement_unit,
            item.provider ? `"${item.provider}"` : "",
            new Date(item.created_at).toLocaleDateString(),
            new Date(item.updated_at).toLocaleDateString(),
          ].join(","),
        ),
      ]
      const csvString = csvRows.join("\n")

      // Create a blob and download
      const blob = new Blob([csvString], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `inventory-export-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Successful",
        description: "Inventory data has been exported to CSV",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export inventory data",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <DownloadIcon className="mr-2 h-4 w-4" />
      Export
    </Button>
  )
}

// Low Stock Alerts
export function LowStockAlerts() {
  const [open, setOpen] = useState(false)
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchLowStockItems = async () => {
    setLoading(true)
    try {
      const items = await getLowStockItems(5)
      setLowStockItems(items)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch low stock items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpen = async () => {
    setOpen(true)
    await fetchLowStockItems()
  }

  const getAlertClass = (quantity: number) => {
    if (quantity <= 0) return "bg-red-50 text-red-800"
    if (quantity <= 3) return "bg-amber-50 text-amber-800"
    return "bg-yellow-50 text-yellow-800"
  }

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        <BellIcon className="mr-2 h-4 w-4" />
        Alerts
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Low Stock Alerts</DialogTitle>
            <DialogDescription>Items that are running low and need to be restocked.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center p-4">Loading...</div>
            ) : lowStockItems.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No low stock items found</div>
            ) : (
              lowStockItems.map((item) => (
                <div key={item.inventory_id} className={`rounded-md p-4 ${getAlertClass(item.quantity)}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <BellIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">
                        {item.name} - {item.quantity} {item.measurement_unit}
                      </h3>
                      <div className="mt-2 text-sm">
                        <p>
                          {item.quantity <= 0
                            ? "Out of stock! Needs immediate reordering."
                            : `Low stock! Consider reordering soon.`}
                        </p>
                        <p className="mt-1">Provider: {item.provider || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Order Placed",
                  description: "Purchase orders have been created for low stock items",
                })
                setOpen(false)
              }}
            >
              Order Items
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
