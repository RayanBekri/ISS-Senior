"use client"

import { useState, useEffect, useCallback } from "react"
import type { Item, ItemsResponse } from "../api/types"
import { itemsApi } from "../api/apiService"

interface UseItemsOptions {
  initialPage?: number
  pageSize?: number
  searchQuery?: string
}

export function useItems({ initialPage = 1, pageSize = 10, searchQuery = "" }: UseItemsOptions = {}) {
  const [items, setItems] = useState<Item[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState(searchQuery)

  const fetchItems = useCallback(
    async (page: number, search: string) => {
      setIsLoading(true)
      setError(null)

      try {
        let response: ItemsResponse

        if (search) {
          response = await itemsApi.searchItems(search, page, pageSize)
        } else {
          response = await itemsApi.getItems(page, pageSize)
        }

        // Make sure we handle the case where response.items might be undefined
        setItems(response.items || [])
        setTotalItems(response.total || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch items")
        console.error("Error fetching items:", err)
        // Set items to empty array on error
        setItems([])
        setTotalItems(0)
      } finally {
        setIsLoading(false)
      }
    },
    [pageSize],
  )

  // Fetch items when page or search query changes
  useEffect(() => {
    fetchItems(currentPage, query)
  }, [currentPage, query, fetchItems])

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const searchItems = (searchQuery: string) => {
    setQuery(searchQuery)
    setCurrentPage(1) // Reset to first page when searching
  }

  const refreshItems = () => {
    fetchItems(currentPage, query)
  }

  return {
    items,
    totalItems,
    currentPage,
    isLoading,
    error,
    changePage,
    searchItems,
    refreshItems,
  }
}

