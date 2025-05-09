"use client"

import { useState } from "react"

export function YearSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState("2023")

  return (
    <div className="relative">
      <button
        className="flex items-center border rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">Year</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-10 py-1 min-w-[100px]">
          {["2021", "2022", "2023", "2024", "2025"].map((year) => (
            <div
              key={year}
              className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${
                selectedYear === year ? "bg-purple-50 text-purple-600 font-medium" : ""
              }`}
              onClick={() => {
                setSelectedYear(year)
                setIsOpen(false)
              }}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
