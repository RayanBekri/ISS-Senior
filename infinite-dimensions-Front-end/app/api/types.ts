// User types
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

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirmRequest {
  resetToken: string
  newPassword: string
}

export interface PasswordUpdateRequest {
  oldPassword: string
  newPassword: string
}

// Item types
export interface Item {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  inStock: boolean
  image: string
}

// Order types
export interface Order {
  order_id?: number
  client_id: number
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  payment_method: "CASH" | "CHECK" | "BANK_TRANSFER"
  delivery_address: string
  postal_code: string
  city: string
  comments?: string
  total_cost: number
  items?: OrderItem[]
  created_at?: string
  updated_at?: string
}

// Add the OrderItem interface
export interface OrderItem {
  item_id: number
  quantity: number
  unit_price: number
}

export interface OrderResponse {
  message: string
  orderId: number
}

// Custom Order types
export interface CustomOrder {
  userId: number
  material: string
  color: string
  strength: string
  additionalInfo?: string
  model: File
}

export interface CustomOrderEstimate {
  time: number
  price: number
}

// Consultation types
export interface ConsultationRequest {
  client_id: number
  employee_id: number
  requested_time: string
  notes?: string
}

export interface ConsultationResponse {
  message: string
  consultationId: number
}

// Notification types
export interface Notification {
  notification_id: number
  user_id: number
  content: string
  is_read: boolean
  created_at: string
  updated_at: string
}
