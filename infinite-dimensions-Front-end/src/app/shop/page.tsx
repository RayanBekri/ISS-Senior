"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import Layout from "../../components/Layout"
import ProductCard from "../../components/ProductCard"
import FilterSidebar from "../../components/FilterSidebar"
import { products, categories } from "../../lib/staticData"

const Shop: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)

  const handleFilter = useCallback(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const ratingMatch = product.rating >= minRating

      return categoryMatch && priceMatch && ratingMatch
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, priceRange, minRating]) // Include only the dependencies that affect the filter

  useEffect(() => {
    handleFilter()
  }, [handleFilter]) // handleFilter is now memoized and won't cause infinite updates

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>
        <div className="flex flex-col md:flex-row">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            onFilter={handleFilter}
          />
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

