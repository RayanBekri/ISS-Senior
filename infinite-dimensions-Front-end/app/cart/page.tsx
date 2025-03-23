"use client"

import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, AlertCircle, ShoppingCart } from "lucide-react"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const { user } = useAuth()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  // If cart is empty, show empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            href="/shop"
            className="bg-[#a408c3] text-white py-3 px-8 rounded-lg hover:bg-[#8a06a3] transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{item.price.toFixed(3)} TND</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-[#a408c3] focus:outline-none"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="mx-2 text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-[#a408c3] focus:outline-none"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-[#a408c3] focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>{tax.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between mb-4 pt-2 border-t border-gray-200">
              <span className="font-medium">Total</span>
              <span className="font-medium">{total.toFixed(3)} TND</span>
            </div>

            {user ? (
              <button className="w-full bg-[#a408c3] text-white py-3 px-4 rounded-lg hover:bg-[#8a06a3] transition-colors">
                Proceed to Checkout
              </button>
            ) : (
              <div>
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-yellow-700 text-sm">You need to have an account to complete your purchase</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/register"
                    className="bg-[#a408c3] text-white py-2 px-4 rounded-lg hover:bg-[#8a06a3] transition-colors text-center"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="border border-[#a408c3] text-[#a408c3] py-2 px-4 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Link href="/shop" className="text-[#a408c3] hover:underline flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

