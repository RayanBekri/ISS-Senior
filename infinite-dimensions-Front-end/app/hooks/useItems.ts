"use client"

import { useState, useEffect } from "react"
import type { Item } from "../api/types"
import { itemsApi } from "../api/apiService"

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await itemsApi.getItems()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch items")
        console.error("Error fetching items:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  const refreshItems = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await itemsApi.getItems()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch items")
      console.error("Error fetching items:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    items,
    isLoading,
    error,
    refreshItems,
  }
}

