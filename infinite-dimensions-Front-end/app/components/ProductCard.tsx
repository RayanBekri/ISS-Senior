"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import ProductModal from "./ProductModal"

interface ProductCardProps {
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square relative">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-${i < Math.floor(product.rating) ? "yellow" : "gray"}-400`}>
                ★
              </span>
            ))}
            <span className="ml-1 text-sm text-gray-500">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default ProductCard

