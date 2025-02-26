"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/app/contexts/CartContext"
import { products } from "@/lib/staticData"
import { Minus, Plus } from "lucide-react"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-500 hover:text-[#a408c3] focus:outline-none"
            >
              <Minus size={20} />
            </button>
            <span className="mx-4 text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-gray-500 hover:text-[#a408c3] focus:outline-none"
            >
              <Plus size={20} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

