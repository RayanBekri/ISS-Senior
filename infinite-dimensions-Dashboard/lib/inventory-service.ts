// Replace the entire file with this implementation that uses the API service

import { get, post, put, patch, del } from "./api-service"

export interface InventoryItem {
  inventory_id: number
  name: string
  quantity: number
  measurement_unit: string
  provider: string | null
  created_at: string
  updated_at: string
}

export interface InventoryStats {
  total_items: number
  total_value: number
  low_stock_count: number
  out_of_stock_count: number
  by_measurement_unit: Record<string, number>
  by_provider: Record<string, number>
}

export interface InventoryHistoryItem {
  date: string
  quantity: number
  previous_quantity: number
  change: number
  action: string
  user_id: number
  user_name: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

// Get all inventory items with pagination
export async function getInventoryItems(
  page = 1,
  limit = 10,
  sort = "name",
  order = "asc",
): Promise<PaginatedResponse<InventoryItem>> {
  return get(`/api/inventory?page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
}

// Get a single inventory item by ID
export async function getInventoryItem(id: number): Promise<InventoryItem> {
  return get(`/api/inventory/${id}`)
}

// Create a new inventory item
export async function createInventoryItem(
  item: Omit<InventoryItem, "inventory_id" | "created_at" | "updated_at">,
): Promise<InventoryItem> {
  return post("/api/inventory", item)
}

// Update an existing inventory item
export async function updateInventoryItem(
  id: number,
  item: Partial<Omit<InventoryItem, "inventory_id" | "created_at" | "updated_at">>,
): Promise<InventoryItem> {
  return put(`/api/inventory/${id}`, item)
}

// Delete an inventory item
export async function deleteInventoryItem(id: number): Promise<{ success: boolean; message: string }> {
  return del(`/api/inventory/${id}`)
}

// Update inventory quantity
export async function updateInventoryQuantity(
  id: number,
  quantity: number,
  operation: "set" | "add" | "subtract" = "set",
): Promise<InventoryItem> {
  return patch(`/api/inventory/${id}/quantity`, { quantity, operation })
}

// Get low stock items
export async function getLowStockItems(threshold?: number): Promise<InventoryItem[]> {
  const query = threshold ? `?threshold=${threshold}` : ""
  return get(`/api/inventory/low-stock${query}`)
}

// Batch update inventory
export async function batchUpdateInventory(
  items: { inventory_id: number; quantity: number }[],
): Promise<{ updated: number; failed: number; items: any[] }> {
  return put("/api/inventory/batch", { items })
}

// Search inventory
export async function searchInventory(query: string, page = 1, limit = 10): Promise<PaginatedResponse<InventoryItem>> {
  return get(`/api/inventory/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
}

// Filter inventory
export async function filterInventory(filters: {
  provider?: string
  measurement_unit?: string
  min_quantity?: number
  max_quantity?: number
  created_after?: string
  created_before?: string
  page?: number
  limit?: number
}): Promise<PaginatedResponse<InventoryItem>> {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  })

  return get(`/api/inventory/filter?${queryParams.toString()}`)
}

// Get inventory statistics
export async function getInventoryStats(): Promise<InventoryStats> {
  return get("/api/inventory/stats")
}

// Get inventory history
export async function getInventoryHistory(
  id: number,
  startDate?: string,
  endDate?: string,
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<InventoryHistoryItem>> {
  const queryParams = new URLSearchParams()

  if (startDate) queryParams.append("start_date", startDate)
  if (endDate) queryParams.append("end_date", endDate)
  queryParams.append("page", page.toString())
  queryParams.append("limit", limit.toString())

  return get(`/api/inventory/${id}/history?${queryParams.toString()}`)
}

// Export inventory
export async function exportInventory(format: "csv" | "xlsx" | "pdf", filters?: Record<string, any>): Promise<Blob> {
  const queryParams = new URLSearchParams()
  queryParams.append("format", format)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory/export?${queryParams.toString()}`)
  return response.blob()
}
