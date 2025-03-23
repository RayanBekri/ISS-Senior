"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, LoginRequest, RegisterRequest, PasswordUpdateRequest } from "../api/types"
import { authApi } from "../api/apiService"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<any>
  register: (data: RegisterRequest) => Promise<{ message: string }>
  logout: () => void
  updatePassword: (data: PasswordUpdateRequest) => Promise<{ message: string }>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user:", e)
        localStorage.removeItem("auth_user")
        localStorage.removeItem("auth_token")
      }
    }

    setIsLoading(false)
  }, [])

  // Update the login function in AuthContext to better handle network errors
  const login = async (data: LoginRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login(data)

      // Log the response to debug
      console.log("Login response:", response)

      // Check if we have a valid response with token and user
      if (!response.token || !response.user) {
        throw new Error("Invalid response from server: missing token or user data")
      }

      // Set the token and user in state
      setToken(response.token)
      setUser(response.user)

      // Store auth data in localStorage
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("auth_user", JSON.stringify(response.user))

      return response // Return the response for chaining
    } catch (err) {
      // Handle network errors specifically
      if (err instanceof TypeError && err.message.includes("NetworkError")) {
        const errorMessage =
          "Network error: Cannot connect to the server. Please check your internet connection and try again."
        setError(errorMessage)
        console.error("Network error during login:", err)
        throw new Error(errorMessage)
      }

      setError(err instanceof Error ? err.message : "Login failed")
      console.error("Login error:", err)
      throw err // Re-throw to allow handling in the component
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.register(data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      console.error("Registration error:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (data: PasswordUpdateRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      if (!token) throw new Error("Not authenticated")
      const response = await authApi.updatePassword(token, data)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password update failed")
      console.error("Password update error:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updatePassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

