"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useItems } from "@/app/hooks/useItems"
import type { Item } from "@/app/api/types"

export default function FeaturedProducts() {
  const [randomProducts, setRandomProducts] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Use the custom hook to fetch items
  const { items, isLoading: itemsLoading, error } = useItems()

  useEffect(() => {
    if (!itemsLoading && items && items.length > 0) {
      // Get random products when items are loaded
      getRandomProducts(items)
      setIsLoading(false)
    }
  }, [items, itemsLoading])

  // Function to get random products
  const getRandomProducts = (productList: Item[]) => {
    // Make a copy of the array to avoid mutating the original
    const shuffled = [...productList]

    // Shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Take the first 3 items (or fewer if there are less than 3 items)
    setRandomProducts(shuffled.slice(0, 3))
  }

  // If there's an error or no products
  if (error || (items && items.length === 0)) {
    // Fallback to static products if API fails
    return <FallbackProducts />
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={`loading-placeholder-${index}`}
            className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse"
          >
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {randomProducts.map((product) => (
        <div
          key={`product-${product.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
          className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
        >
          <div className="aspect-square relative">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-gray-900">{product.name}</h3>
            <p className="text-gray-600 mb-3">
              {product.description
                ? product.description.length > 80
                  ? `${product.description.substring(0, 80)}...`
                  : product.description
                : "Custom 3D printed product with high-quality materials."}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700">
                {typeof product.price === "string"
                  ? Number.parseFloat(product.price).toFixed(3)
                  : product.price.toFixed(3)}{" "}
                TND
              </p>
              <Link href={`/product/${product.id}`} className="text-[#A200C1] hover:underline">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Fallback component with static products if API fails
function FallbackProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Custom Mechanical Keyboard",
          price: "2,400.000",
          image: "/placeholder.svg",
          description: "Fully customizable mechanical keyboard with ergonomic design",
        },
        {
          name: "Architectural Model Set",
          price: "3,500.000",
          image: "/placeholder.svg",
          description: "Detailed architectural models for presentations and displays",
        },
        {
          name: "Personalized Desk Organizer",
          price: "1,200.000",
          image: "/placeholder.svg",
          description: "Modular desk organization system tailored to your workspace",
        },
      ].map((product, index) => (
        <div
          key={`fallback-product-${index}`}
          className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
        >
          <div className="aspect-square relative">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-gray-900">{product.name}</h3>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-700">{product.price} TND</p>
              <Link href="/shop" className="text-[#A200C1] hover:underline">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

