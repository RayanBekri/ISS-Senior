"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X, Facebook, Twitter, Instagram } from "lucide-react"

interface ProductModalProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    category: string
    sku?: string
    stock?: string
  }
  isOpen: boolean
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-square relative rounded-lg overflow-hidden border cursor-pointer">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                {product.stock && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">{product.stock}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-${i < Math.floor(product.rating) ? "yellow" : "gray"}-400`}>
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500">{product.rating} Review</span>
                {product.sku && <span className="text-sm text-gray-500">· SKU: {product.sku}</span>}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="text-red-500 text-sm">{discount}% Off</span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border-r hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-16 text-center p-2"
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 border-l hover:bg-gray-100">
                    +
                  </button>
                </div>
                <button className="flex-1 bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition duration-300">
                  Add to Cart
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 rounded-full border">♥</button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Category:</span>
                <span className="text-purple-600 hover:underline cursor-pointer">{product.category}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Share item:</span>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-400">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-pink-600">
                    <Instagram className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

