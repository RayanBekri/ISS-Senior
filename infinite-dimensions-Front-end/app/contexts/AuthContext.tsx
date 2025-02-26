"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, LoginRequest, RegisterRequest } from "../api/types"
import { authApi } from "../api/apiService"

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
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
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  // Fetch current user when token changes
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return

      try {
        const userData = await authApi.getCurrentUser(token)
        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))
      } catch (err) {
        console.error("Failed to fetch current user:", err)
        logout()
      }
    }

    fetchCurrentUser()
  }, [token])

  const login = async (data: LoginRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login(data)
      setToken(response.token)
      setUser(response.user)

      // Store auth data in localStorage
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("auth_user", JSON.stringify(response.user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.register(data)
      setToken(response.token)
      setUser(response.user)

      // Store auth data in localStorage
      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("auth_user", JSON.stringify(response.user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      console.error("Registration error:", err)
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

