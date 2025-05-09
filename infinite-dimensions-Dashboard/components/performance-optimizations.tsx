"use client"

import { useEffect } from "react"

export function PerformanceOptimizations() {
  useEffect(() => {
    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Prefetch other pages after the main page has loaded
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          const pagesToPrefetch = [
            "/dashboard",
            "/employees",
            "/inventory",
            "/finance",
            "/printers",
            "/products",
            "/schedule",
          ]

          pagesToPrefetch.forEach((page) => {
            const link = document.createElement("link")
            link.rel = "prefetch"
            link.href = page
            document.head.appendChild(link)
          })
        })
      }
    }

    // Execute performance optimizations
    window.addEventListener("load", lazyLoadResources)

    return () => {
      window.removeEventListener("load", lazyLoadResources)
    }
  }, [])

  return null
}
