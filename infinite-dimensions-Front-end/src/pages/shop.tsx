"use client"

import type React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import FilterSidebar from "../components/FilterSidebar"

// Mock product data
const products = [
  { id: 1, name: "Custom Figurine", price: 49.99, image: "/placeholder-product-1.jpg", rating: 4.5 },
  { id: 2, name: "3D Printed Vase", price: 29.99, image: "/placeholder-product-2.jpg", rating: 4.0 },
  { id: 3, name: "Gadget Holder", price: 19.99, image: "/placeholder-product-3.jpg", rating: 4.2 },
  // Add more products...
]

const Shop: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilter = (filters: any) => {
    // Implement filtering logic here
    // For now, we'll just log the filters
    console.log("Filters applied:", filters)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>
        <div className="flex flex-col md:flex-row">
          <FilterSidebar onFilter={handleFilter} />
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop

