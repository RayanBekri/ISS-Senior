"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, Truck, MapPin, AlertCircle, CheckCircle, ChevronLeft, Home } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { ordersApi } from "../api/apiService"

export default function CheckoutPage() {
  const { user, token } = useAuth()
  const { cartItems, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [orderType, setOrderType] = useState<"regular" | "custom">("regular")
  const [customOrderData, setCustomOrderData] = useState<any>(null)

  // Form data
  const [formData, setFormData] = useState({
    payment_method: "CASH",
    delivery_address: "",
    postal_code: "",
    city: "",
    comments: "",
  })

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const shipping = 5.0 // Fixed shipping cost
  const total = subtotal + tax + shipping

  // Check if user is logged in and cart has items
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=checkout")
    } else if (cartItems.length === 0) {
      // Check if there's custom order data in session storage
      const storedCustomOrder = sessionStorage.getItem("customOrderData")
      if (storedCustomOrder) {
        try {
          const parsedData = JSON.parse(storedCustomOrder)
          setCustomOrderData(parsedData)
          setOrderType("custom")
        } catch (err) {
          router.push("/cart")
        }
      } else {
        router.push("/cart")
      }
    }
  }, [user, cartItems, router])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!token) throw new Error("Not authenticated")

      if (orderType === "regular") {
        // Regular order from shop
        const orderData = {
          client_id: user!.user_id,
          status: "PENDING" as const, // Add the status property with "PENDING" value
          payment_method: formData.payment_method as "CASH" | "CHECK" | "BANK_TRANSFER",
          delivery_address: formData.delivery_address,
          postal_code: formData.postal_code,
          city: formData.city,
          comments: formData.comments,
          items: cartItems.map((item) => ({
            item_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          total_cost: total,
        }

        await ordersApi.createOrder(token, orderData)
      } else {
        // Custom order
        if (!customOrderData) throw new Error("Custom order data not found")

        const customOrderFormData = new FormData()
        customOrderFormData.append("userId", user!.user_id.toString())
        customOrderFormData.append("material", customOrderData.material)
        customOrderFormData.append("color", customOrderData.color)
        customOrderFormData.append("strength", customOrderData.strength)
        customOrderFormData.append("model", customOrderData.model)

        // Add shipping details
        customOrderFormData.append("payment_method", formData.payment_method)
        customOrderFormData.append("delivery_address", formData.delivery_address)
        customOrderFormData.append("postal_code", formData.postal_code)
        customOrderFormData.append("city", formData.city)
        customOrderFormData.append("comments", formData.comments)

        if (customOrderData.slicerEstimate) {
          customOrderFormData.append("slicer_estimate", JSON.stringify(customOrderData.slicerEstimate))
        }

        // Call custom order API
        await ordersApi.createCustomOrder(token, customOrderFormData)
      }

      // Clear cart and custom order data
      clearCart()
      sessionStorage.removeItem("customOrderData")

      // Show success message
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If order was successful, show success message
  if (success) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll process it right away and send you a confirmation email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="bg-[#a408c3] text-white py-2 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors"
            >
              View My Orders
            </Link>
            <Link
              href="/"
              className="border border-[#a408c3] text-[#a408c3] py-2 px-6 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#a408c3] flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-[#a408c3]">
            Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">Checkout</h1>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-[#a408c3]" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="delivery_address"
                        name="delivery_address"
                        value={formData.delivery_address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        pattern="[0-9]{4,5}"
                        title="Postal code must be a 4 or 5 digit number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Must be a 4-5 digit number</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-[#a408c3]" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#a408c3] transition-colors">
                      <input
                        type="radio"
                        name="payment_method"
                        value="CASH"
                        checked={formData.payment_method === "CASH"}
                        onChange={handleInputChange}
                        className="mr-3 accent-[#a408c3]"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#a408c3] transition-colors">
                      <input
                        type="radio"
                        name="payment_method"
                        value="CHECK"
                        checked={formData.payment_method === "CHECK"}
                        onChange={handleInputChange}
                        className="mr-3 accent-[#a408c3]"
                      />
                      <div>
                        <p className="font-medium">Check</p>
                        <p className="text-sm text-gray-500">Pay with a check upon delivery</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#a408c3] transition-colors">
                      <input
                        type="radio"
                        name="payment_method"
                        value="BANK_TRANSFER"
                        checked={formData.payment_method === "BANK_TRANSFER"}
                        onChange={handleInputChange}
                        className="mr-3 accent-[#a408c3]"
                      />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-500">Pay via bank transfer</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Additional Comments */}
                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                    placeholder="Special instructions for delivery or any other notes"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  <Link
                    href="/cart"
                    className="flex items-center justify-center mt-4 text-gray-600 hover:text-[#a408c3]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Return to Cart
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {orderType === "regular" ? (
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price.toFixed(3)} TND</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center">
                      <Truck className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Custom 3D Print Order</p>
                      <p className="text-sm text-gray-500">
                        {customOrderData?.material}, {customOrderData?.color}
                      </p>
                    </div>
                    {customOrderData?.slicerEstimate?.price && (
                      <p className="font-medium">{customOrderData.slicerEstimate.price.toFixed(3)} TND</p>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    {orderType === "regular"
                      ? subtotal.toFixed(3)
                      : (customOrderData?.slicerEstimate?.price || 0).toFixed(3)}{" "}
                    TND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>
                    {orderType === "regular"
                      ? tax.toFixed(3)
                      : ((customOrderData?.slicerEstimate?.price || 0) * 0.1).toFixed(3)}{" "}
                    TND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping.toFixed(3)} TND</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                  <span>Total</span>
                  <span className="text-[#a408c3]">
                    {orderType === "regular"
                      ? total.toFixed(3)
                      : ((customOrderData?.slicerEstimate?.price || 0) * 1.1 + shipping).toFixed(3)}{" "}
                    TND
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start">
                <MapPin className="w-5 h-5 text-[#a408c3] mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Shipping Information</p>
                  <p className="text-gray-600">Standard delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
