import type {
  AuthResponse,
  Item,
  LoginRequest,
  RegisterRequest,
  PasswordUpdateRequest, // Changed from ChangePasswordRequest
  Order,
  OrderResponse,
  CustomOrderEstimate,
  ConsultationResponse,
  Notification,
} from "./types"

// Update the API_BASE_URL to ensure it's correctly pointing to your backend
// If you're running the frontend and backend on different domains, you'll need to handle CORS

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://45.141.36.186:3000/api"

// Add a function to check API connectivity
async function checkApiConnectivity() {
  try {
    const response = await fetch(`${API_BASE_URL}/health-check`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
    })
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

    const responseData = await handleResponse<{ token: string }>(response)

    // Extract user data from JWT token
    const token = responseData.token
    const payload = JSON.parse(atob(token.split(".")[1]))

    // Construct user object from JWT payload
    const user = {
      user_id: payload.user_id,
      email: payload.email,
      role: payload.role,
      is_company: Boolean(payload.is_company),
      is_approved: Boolean(payload.is_approved),
      first_name: payload.first_name,
      last_name: payload.last_name,
      company_name: payload.company_name,
      company_tax_number: payload.company_tax_number,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    }

    return { token, user }
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return handleResponse<AuthResponse>(response)
  },

  changePassword: async (token: string, data: PasswordUpdateRequest) => {
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

// Update the ordersApi object to match the endpoint descriptions
export const ordersApi = {
  // Create a new order - POST /api/orders
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

  // Remove this duplicate method as it's already covered by customOrdersApi.createCustomOrder
  // createCustomOrder: async (token: string, orderData: FormData): Promise<OrderResponse> => {
  //   const response = await fetch(`${API_BASE_URL}/custom-orders/checkout`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: orderData,
  //   })
  //   return handleResponse<OrderResponse>(response)
  // },
}

// Update the customOrdersApi object to match the endpoint descriptions
export const customOrdersApi = {
  // Create a custom order - POST /api/custom-orders
  createCustomOrder: async (token: string, orderData: FormData): Promise<OrderResponse> => {
    const response = await fetch(`${API_BASE_URL}/custom-orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type header - browser will set it with boundary for FormData
      },
      body: orderData,
    })
    return handleResponse<OrderResponse>(response)
  },

  // Estimate custom order price - POST /api/custom-orders/estimate
  estimatePrice: async (fileData: FormData): Promise<CustomOrderEstimate> => {
    try {
      console.log("Sending estimate request to:", `${API_BASE_URL}/custom-orders/estimate`)

      // Create a new FormData instance to ensure proper formatting
      const formData = new FormData()

      // If fileData already contains a 'model' field, extract and re-append it
      const modelFile = fileData.get("model") as File
      if (modelFile) {
        console.log("File being sent:", modelFile.name, modelFile.size, "bytes")
        formData.append("model", modelFile)
      } else {
        console.error("No model file found in form data")
        throw new Error("No 3D model file provided")
      }

      const response = await fetch(`${API_BASE_URL}/custom-orders/estimate`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for FormData
      })

      console.log("Estimate response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Estimate error response:", errorText)

        let errorMessage
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || "Failed to estimate price"
        } catch {
          errorMessage = errorText || `Failed to estimate price: ${response.status}`
        }

        throw new Error(errorMessage)
      }

      const responseData = await response.json()
      console.log("Estimate response data:", responseData)
      return responseData
    } catch (error) {
      console.error("Error estimating price:", error)
      throw error
    }
  },
}

// Update the consultationsApi object with the correct function
// Consultations API
export const consultationsApi = {
  // Get available time slots for a specific date
  getAvailableTimeSlots: async (date: string): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/consultations/timeslots?date=${encodeURIComponent(date)}`, {
      cache: "no-store",
    })
    return handleResponse<string[]>(response)
  },

  // Request a consultation
  requestConsultation: async (
    token: string,
    data: {
      userId: number
      timeslot: string
      notes: string
    },
  ): Promise<ConsultationResponse> => {
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

// Chatbot API
export const chatbotApi = {
  // Send a message to the chatbot
  sendMessage: async (chat: string): Promise<{ text: string }> => {
    const response = await fetch(`${API_BASE_URL}/chatbot/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: chat,
      }),
    })
    return handleResponse<{ text: string }>(response)
  },
}
