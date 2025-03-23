"use client"

import { useState, useEffect } from "react"
import type { Notification } from "../api/types"
import { notificationsApi } from "../api/apiService"
import { useAuth } from "../contexts/AuthContext"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchNotifications = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await notificationsApi.getNotifications(token)
        setNotifications(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch notifications")
        console.error("Error fetching notifications:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [token])

  const refreshNotifications = async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await notificationsApi.getNotifications(token)
      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications")
      console.error("Error fetching notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    notifications,
    isLoading,
    error,
    refreshNotifications,
  }
}

