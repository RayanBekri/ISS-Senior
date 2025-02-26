"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Facebook, Twitter, Instagram, PinIcon as Pinterest } from "lucide-react"
import { useCart } from "../contexts/CartContext"

interface ProductViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    description?: string
    sku?: string
    rating?: number
    reviews?: number
    category?: string
    tags?: string[]
  }
}

export default function ProductViewModal({ isOpen, onClose, product }: ProductViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!isOpen) return null

  const images = [product.image, "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          {/* Title Section */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <span className="bg-pink-100 text-[#a408c3] text-sm px-3 py-1 rounded-full">In Stock</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-${i < (product.rating || 4) ? "[#a408c3]" : "gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-500">{product.reviews || 4} Review</span>
                <span className="text-gray-500">· SKU: {product.sku || "2.51.594"}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 
                      ${selectedImage === index ? "border-[#a408c3]" : "border-transparent"}`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#a408c3]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="text-red-500">{discount}% Off</span>
                  </>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Brand:</h3>
                <Image src="/placeholder.svg" alt="Brand logo" width={100} height={40} className="h-8 w-auto" />
              </div>

              <p className="text-gray-600">
                {product.description ||
                  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."}
              </p>

              <div className="flex items-center gap-4">
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
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#a408c3] text-white py-3 px-6 rounded-md hover:bg-[#8a06a3] transition-colors"
                >
                  Add to Cart
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#a408c3] hover:bg-gray-50">
                  ♥
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Category:</span>
                  <a href="#" className="text-[#a408c3] hover:underline">
                    {product.category || "Toys & Games"}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Tag:</span>
                  <div className="flex gap-2">
                    {(product.tags || ["Games", "Cute", "Dinosaur", "Toys"]).map((tag) => (
                      <a key={tag} href="#" className="text-[#a408c3] hover:underline">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Share item:</span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-[#1877f2]">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-[#1da1f2]">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-[#e4405f]">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-[#bd081c]">
                      <Pinterest className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

