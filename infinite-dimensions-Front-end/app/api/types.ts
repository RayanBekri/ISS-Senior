export interface User {
  user_id: number
  email: string
  role: "ADMIN" | "EMPLOYEE" | "CLIENT"
  is_company: boolean
  is_approved: boolean
  first_name: string | null
  last_name: string | null
  company_name: string | null
  company_tax_number: string | null
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  is_company: boolean
  company_name?: string
  company_tax_number?: string
  first_name?: string
  last_name?: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Item types
export interface Item {
  item_id: number
  name: string
  description: string | null
  price: string
  discount: string | null
  status: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_IN_STOCK"
  added_by: number | null
  modified_by: number | null
  created_at: string
  updated_at: string
}

export interface ItemsResponse {
  items: Item[]
  total: number
}

// Order types
export interface Order {
  order_id: number
  user_id: number
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  total_amount: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  item_id: number
  name: string
  quantity: number
  price: string
}

// Password change types
export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

