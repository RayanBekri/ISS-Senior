"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface DateRangeFilterProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<string>("last30days")

  const ranges = [
    { id: "last7days", label: "Last 7 Days" },
    { id: "last30days", label: "Last 30 Days" },
    { id: "last90days", label: "Last 90 Days" },
    { id: "thisYear", label: "This Year" },
    { id: "lastYear", label: "Last Year" },
    { id: "custom", label: "Custom Range" },
  ]

  const handleRangeSelect = (rangeId: string) => {
    setSelectedRange(rangeId)
    setIsOpen(false)

    const now = new Date()
    let from = new Date()
    let to = new Date()

    switch (rangeId) {
      case "last7days":
        from.setDate(now.getDate() - 7)
        break
      case "last30days":
        from.setDate(now.getDate() - 30)
        break
      case "last90days":
        from.setDate(now.getDate() - 90)
        break
      case "thisYear":
        from = new Date(now.getFullYear(), 0, 1)
        break
      case "lastYear":
        from = new Date(now.getFullYear() - 1, 0, 1)
        to = new Date(now.getFullYear() - 1, 11, 31)
        break
      case "custom":
        // Open date picker dialog
        return
    }

    onDateRangeChange({ from, to })
  }

  const getSelectedRangeLabel = () => {
    const range = ranges.find((r) => r.id === selectedRange)
    return range ? range.label : "Select Range"
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
        <Calendar className="h-4 w-4" />
        <span>{getSelectedRangeLabel()}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
          {ranges.map((range) => (
            <div
              key={range.id}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selectedRange === range.id ? "bg-purple-50 text-purple-600 font-medium" : ""
              }`}
              onClick={() => handleRangeSelect(range.id)}
            >
              {range.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
