import type { AuthResponse, Item, ItemsResponse, LoginRequest, RegisterRequest, Order, ChangePasswordRequest } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API error: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<AuthResponse>(response)
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<AuthResponse>(response)
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return handleResponse<AuthResponse>(response)
  },

  changePassword: async (token: string, data: ChangePasswordRequest) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<{ message: string }>(response)
  },
}

export const itemsApi = {
  getItems: async (page = 1, limit = 10): Promise<ItemsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/items?page=${page}&limit=${limit}`, {
        cache: "no-store", // Disable caching to prevent 304 responses
      })
      const items = await handleResponse<Item[]>(response)
      return {
        items: items || [],
        total: items?.length || 0,
      }
    } catch (error) {
      console.error("Error fetching items:", error)
      return { items: [], total: 0 }
    }
  },

  getItemById: async (itemId: number): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
      cache: "no-store",
    })
    return handleResponse<Item>(response)
  },

  searchItems: async (query: string, page = 1, limit = 10): Promise<ItemsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/items?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
        cache: "no-store",
      })
      const items = await handleResponse<Item[]>(response)
      return {
        items: items || [],
        total: items?.length || 0,
      }
    } catch (error) {
      console.error("Error searching items:", error)
      return { items: [], total: 0 }
    }
  },
}

export const orderApi = {
  getUserOrders: async (token: string): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })
    return handleResponse<Order[]>(response)
  },
}

