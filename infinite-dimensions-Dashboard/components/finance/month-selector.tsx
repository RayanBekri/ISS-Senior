"use client"

import { useState } from "react"

export function MonthSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("6 Months")
  const options = ["3 Months", "6 Months", "12 Months"]

  return (
    <div className="relative">
      <button
        className="flex items-center border rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">{selectedMonth}</span>
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
        <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-10 py-1 min-w-[120px]">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${selectedMonth === option ? "bg-purple-50 text-purple-600 font-medium" : ""}`}
              onClick={() => {
                setSelectedMonth(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
