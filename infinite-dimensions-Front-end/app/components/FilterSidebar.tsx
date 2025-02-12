"use client"

import type React from "react"

interface FilterSidebarProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  minRating: number
  setMinRating: (rating: number) => void
  onFilter: () => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onFilter,
}) => {
  const handlePriceRangeChange = (value: number) => {
    setPriceRange([0, value])
    onFilter()
  }

  return (
    <div className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={category}
              name="category"
              checked={selectedCategory === category}
              onChange={() => {
                setSelectedCategory(category)
                onFilter()
              }}
              className="mr-2"
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setMinRating(star)
                onFilter()
              }}
              className={`w-6 h-6 ${star <= minRating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar

