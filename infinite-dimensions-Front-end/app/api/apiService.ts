import type {
  AuthResponse,
  Item,
  LoginRequest,
  RegisterRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  PasswordUpdateRequest,
  Order,
  OrderResponse,
  CustomOrderEstimate,
  ConsultationRequest,
  ConsultationResponse,
  Notification,
} from "./types"

// Update the API_BASE_URL to ensure it's correctly pointing to your backend
// If you're running the frontend and backend on different domains, you'll need to handle CORS

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Add a function to check API connectivity
async function checkApiConnectivity() {
  try {
    const response = await fetch(`${API_BASE_URL}/health-check`, {
      method: "HEAD",
      mode: "cors",
      cache: "no-cache",
      headers: {
        // Add a cache-busting query parameter
        Pragma: "no-cache",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
    // Both 200 OK and 304 Not Modified indicate the API is available
    const isConnected = response.ok || response.status === 304
    console.log("API connectivity check:", isConnected ? "Success" : "Failed", `(Status: ${response.status})`)
    return isConnected
  } catch (error) {
    console.error("API connectivity check failed:", error)
    return false
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API error: ${response.status}`)
  }
  return response.json() as Promise<T>
}

// Authentication API
export const authApi = {
  // Register a new user
  register: async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<{ message: string }>(response)
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    console.log("Sending login request to:", `${API_BASE_URL}/auth/login`)
    console.log("With data:", JSON.stringify(data))

    try {
      // First check if we can reach the API at all
      const isApiReachable = await checkApiConnectivity().catch(() => false)
      if (!isApiReachable) {
        throw new Error("Cannot connect to the server. Please check your internet connection and try again.")
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies in the request
        mode: "cors", // Explicitly set CORS mode
        cache: "no-cache", // Don't use cache
      })

      console.log("Login response status:", response.status)

      // Handle non-OK responses
      if (!response.ok) {
        // Try to get error details
        const errorText = await response.text()
        console.error("Login error response:", errorText)

        let errorMessage = `Login failed: ${response.status}`
        try {
          const errorData = JSON.parse(errorText)
          if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch (e) {
          // If parsing fails, use the status text
          errorMessage = `Login failed: ${response.statusText || response.status}`
        }

        throw new Error(errorMessage)
      }

      // Parse successful response
      const responseText = await response.text()
      console.log("Login response text:", responseText)

      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        console.error("Failed to parse login response:", e)
        throw new Error(`Invalid response format: ${responseText}`)
      }

      // Validate response structure
      if (!responseData.token || !responseData.user) {
        console.error("Invalid login response structure:", responseData)
        throw new Error("Invalid response format from server: missing token or user data")
      }

      console.log("Login successful:", responseData)
      return responseData
    } catch (error) {
      // Handle network errors specifically
      if (error instanceof TypeError && error.message.includes("NetworkError")) {
        console.error("Network error during login:", error)
        throw new Error(
          "Network error: Cannot connect to the server. Please check your internet connection and try again.",
        )
      }

      console.error("Login API error:", error)
      throw error
    }
  },

  // Get current user
  getCurrentUser: async (token: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return handleResponse<AuthResponse>(response)
  },

  // Request password reset
  requestPasswordReset: async (data: PasswordResetRequest): Promise<{ message: string; resetToken?: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<{ message: string; resetToken?: string }>(response)
  },

  // Reset password with token
  resetPassword: async (data: PasswordResetConfirmRequest): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<{ message: string }>(response)
  },

  // Update password (authenticated)
  updatePassword: async (token: string, data: PasswordUpdateRequest): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
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

// Items API
export const itemsApi = {
  // Get all items
  getItems: async (): Promise<Item[]> => {
    const response = await fetch(`${API_BASE_URL}/items`, {
      cache: "no-store",
    })
    return handleResponse<Item[]>(response)
  },
}

// Orders API
export const ordersApi = {
  // Create a new order
  createOrder: async (token: string, orderData: Order): Promise<OrderResponse> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    return handleResponse<OrderResponse>(response)
  },
  getUserOrders: async (token: string): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return handleResponse<Order[]>(response)
  },
}

// Custom Orders API
export const customOrdersApi = {
  // Create a custom order
  createCustomOrder: async (token: string, orderData: FormData): Promise<OrderResponse> => {
    const response = await fetch(`${API_BASE_URL}/custom-orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: orderData,
    })
    return handleResponse<OrderResponse>(response)
  },

  // Estimate custom order price
  estimatePrice: async (fileData: FormData): Promise<CustomOrderEstimate> => {
    try {
      // Make sure we're not sending any authorization headers
      const response = await fetch(`${API_BASE_URL}/custom-orders/estimate`, {
        method: "POST",
        // No headers specified to avoid authorization issues
        body: fileData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message
        } catch {
          // If not JSON, use the text directly
          errorMessage = errorText
        }
        throw new Error(errorMessage || `Failed to estimate price: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error estimating price:", error)
      throw error
    }
  },
}

// Consultations API
export const consultationsApi = {
  // Request a consultation
  requestConsultation: async (token: string, data: ConsultationRequest): Promise<ConsultationResponse> => {
    const response = await fetch(`${API_BASE_URL}/consultations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return handleResponse<ConsultationResponse>(response)
  },
}

// Notifications API
export const notificationsApi = {
  // Get user notifications
  getNotifications: async (token: string): Promise<Notification[]> => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })
    return handleResponse<Notification[]>(response)
  },
}
export const orderApi = ordersApi

