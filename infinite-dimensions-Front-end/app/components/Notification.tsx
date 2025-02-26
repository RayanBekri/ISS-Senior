"use client"

import { useEffect } from "react"
import { useCart } from "../contexts/CartContext"

export default function Notification() {
  const { notification, clearNotification } = useCart()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  if (!notification) return null

  return (
    <div className="fixed bottom-4 right-4 bg-[#a408c3] text-white px-4 py-2 rounded-lg shadow-lg">{notification}</div>
  )
}

