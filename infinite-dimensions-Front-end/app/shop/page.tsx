"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Heart, ShoppingCart, AlertCircle } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import ProductViewModal from "../components/ProductViewModal"
import { useItems } from "../hooks/useItems"
import type { Item as BaseItem } from "../api/types"

// Extended Item interface with category
interface Item extends BaseItem {
  category?: string
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null)
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const { addToCart } = useCart()

  // Use the custom hook to fetch items with the extended type
  const {
    items = [] as Item[], // Provide a default empty array with the extended type
    totalItems = 0, // Provide a default value
    currentPage,
    isLoading,
    error,
    changePage,
    searchItems,
    refreshItems,
  } = useItems<Item>({ pageSize: 12 })

  // Extract unique categories from items
  useEffect(() => {
    if (items && items.length > 0) {
      const categoryMap = new Map<string, number>()

      // Count items in each category
      items.forEach((item) => {
        const category = item.category || "Uncategorized"
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      })

      // Convert map to array of category objects
      const uniqueCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }))

      // Add "All Categories" option
      setCategories([{ name: "All Categories", count: items.length }, ...uniqueCategories])
    }
  }, [items])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchItems(searchQuery)
  }

  // Update the handleAddToCart function to handle string price
  const handleAddToCart = (product: Item) => {
    addToCart({
      id: product.item_id,
      name: product.name,
      price: Number.parseFloat(product.price),
      quantity: 1,
      image: "/placeholder.svg", // Replace with actual image from API when available
    })
  }

  // Update the formatItemForModal function to handle string price and discount
  const formatItemForModal = (item: Item) => {
    return {
      id: item.item_id,
      name: item.name,
      price: Number.parseFloat(item.price),
      originalPrice: item.discount ? Number.parseFloat(item.price) + Number.parseFloat(item.discount) : undefined,
      image: "/placeholder.svg", // Replace with actual image from API when available
      description: item.description || "",
      rating: 4.5, // Replace with actual rating when available
      category: item.category || "Uncategorized", // Use the category from the item
    }
  }

  // Filter items by selected category
  const filteredItems =
    selectedCategory === "All Categories" ? items : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="bg-gray-200 rounded-lg p-2 mb-8">
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-1 p-2 rounded-l-lg focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="p-2 bg-[#a408c3] rounded-r-lg">
            <Search className="w-6 h-6 text-white" />
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-red-700 text-sm">{error}</div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">All Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="accent-[#a408c3]"
                    />
                    <span>{category.name}</span>
                  </label>
                  <span className="text-gray-500">({category.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Price</h3>
            <div className="flex items-center space-x-2">
              <span>Price: 50 - 1,500 TND</span>
            </div>
            <input type="range" min="50" max="1500" defaultValue="1500" className="w-full accent-[#a408c3] mt-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select className="border rounded p-1">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
              </select>
            </div>
            <span>{filteredItems.length} Results Found</span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a408c3]"></div>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.item_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <div className="aspect-square relative cursor-pointer" onClick={() => setSelectedProduct(item)}>
                        <Image src="/placeholder.svg" alt={item.name} fill className="object-cover" />
                      </div>
                      {item.status === "OUT_OF_STOCK" && (
                        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                      {item.status === "LOW_IN_STOCK" && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Low Stock
                        </div>
                      )}
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Heart className="w-5 h-5 text-[#a408c3]" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{Number.parseFloat(item.price).toFixed(3)} TND</span>
                          {item.discount && (
                            <span className="text-gray-500 line-through">
                              {(Number.parseFloat(item.price) + Number.parseFloat(item.discount)).toFixed(3)} TND
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-8 h-8 bg-[#a408c3] text-white rounded-full flex items-center justify-center hover:bg-[#8a06a3] transition-colors"
                          disabled={item.status === "OUT_OF_STOCK"}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg text-gray-500">No items found</p>
                  <button
                    onClick={refreshItems}
                    className="mt-4 px-4 py-2 bg-[#a408c3] text-white rounded-lg hover:bg-[#8a06a3]"
                  >
                    Refresh
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(Math.ceil(totalItems / 12))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`px-4 py-2 border rounded-md ${currentPage === i + 1 ? "bg-[#a408c3] text-white" : ""}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalItems / 12)}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product View Modal */}
      {selectedProduct && (
        <ProductViewModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={formatItemForModal(selectedProduct)}
        />
      )}
    </div>
  )
}

