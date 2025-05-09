"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth="))
          ?.split("=")[1]

        if (authCookie) {
          // In a real app, you would validate the token with your backend
          setUser({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "ADMIN",
          })
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simple demo authentication
      if (email === "admin@example.com" && password === "password") {
        // Set authentication cookie
        document.cookie = "auth=true; path=/; max-age=86400" // 24 hours

        setUser({
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "ADMIN",
        })

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear the auth cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
