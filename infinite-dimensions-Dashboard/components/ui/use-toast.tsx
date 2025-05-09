"use client"

import * as React from "react"

type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open: boolean
  onOpenChange?: (open: boolean) => void
}

type ToastActionElement = React.ReactElement<unknown>

type ToastContextType = {
  toasts: ToastProps[]
  toast: (props: Omit<ToastProps, "id" | "open" | "onOpenChange">) => void
  dismiss: (id?: string) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  toast: () => null,
  dismiss: () => null,
})

let toastId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = (props: Omit<ToastProps, "id" | "open" | "onOpenChange">) => {
    const id = `toast-${toastId++}`
    const newToast: ToastProps = {
      id,
      ...props,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss(id)
      },
    }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismiss(id)
    }, 5000)
  }

  const dismiss = (id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    } else {
      setToasts([])
    }
  }

  const contextValue = {
    toasts,
    toast,
    dismiss,
  }

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

export type Toast = ToastProps
export type ToastAction = ToastActionElement

let globalToast: ((props: Omit<ToastProps, "id" | "open" | "onOpenChange">) => void) | null = null

export function setGlobalToast(toast: (props: Omit<ToastProps, "id" | "open" | "onOpenChange">) => void) {
  globalToast = toast
}

export { globalToast as toast }
