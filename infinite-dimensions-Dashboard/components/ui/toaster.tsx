"use client"

import * as React from "react"
import { X } from "lucide-react"

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  React.useEffect(() => {
    // Create a global toast function
    window.toast = (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Date.now().toString()
      setToasts((prev) => [...prev, { id, message, type }])

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 5000)
    }

    return () => {
      // Clean up
      delete window.toast
    }
  }, [])

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative flex items-center justify-between p-4 rounded-md shadow-lg animate-in slide-in-from-top-5 ${
            toast.type === "success"
              ? "bg-green-100 border border-green-200"
              : toast.type === "error"
                ? "bg-red-100 border border-red-200"
                : "bg-blue-100 border border-blue-200"
          }`}
        >
          <p
            className={`text-sm ${
              toast.type === "success" ? "text-green-800" : toast.type === "error" ? "text-red-800" : "text-blue-800"
            }`}
          >
            {toast.message}
          </p>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="ml-4 p-1 rounded-full hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

// Add toast to window type
declare global {
  interface Window {
    toast: (message: string, type?: "success" | "error" | "info") => void
  }
}

// Toast type
type Toast = {
  id: string
  message: string
  type: "success" | "error" | "info"
}
