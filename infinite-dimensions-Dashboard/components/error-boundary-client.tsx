"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundaryClient({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Caught error:", event.error)
      setHasError(true)
      // Prevent the error from bubbling up
      event.preventDefault()
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
        <p className="mb-6 text-center text-gray-600">We're sorry, but there was an error loading this page.</p>
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </div>
    )
  }

  return <>{children}</>
}
