"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown } from "lucide-react"

interface DateRangePickerProps {
  startDate?: string
  endDate?: string
  dateRange?: { from: Date; to: Date }
  onDateRangeChange?: (range: { from: Date; to: Date }) => void
}

export function DateRangePicker({
  startDate = "Jan 1, 2023",
  endDate = "Dec 31, 2023",
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDateRange = () => {
    if (dateRange?.from && dateRange?.to) {
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      return `${fromDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${toDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    }
    return `${startDate} - ${endDate}`
  }

  const predefinedRanges = [
    {
      label: "Last 7 days",
      range: () => ({
        from: new Date(new Date().setDate(new Date().getDate() - 7)),
        to: new Date(),
      }),
    },
    {
      label: "Last 30 days",
      range: () => ({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
      }),
    },
    {
      label: "This month",
      range: () => ({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      }),
    },
    {
      label: "This year",
      range: () => ({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      }),
    },
  ]

  const handleRangeSelect = (getRangeFn: () => { from: Date; to: Date }) => {
    if (onDateRangeChange) {
      const newRange = getRangeFn()
      onDateRangeChange(newRange)
    }
    setIsOpen(false)
  }

  // If we have onDateRangeChange, render the interactive version
  if (onDateRangeChange) {
    return (
      <div className="relative">
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
          <Calendar className="h-4 w-4" />
          <span className="text-xs">{formatDateRange()}</span>
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 py-1">
            {predefinedRanges.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleRangeSelect(item.range)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Otherwise render the simple version
  return (
    <div className="flex items-center border rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
      <span>
        {startDate} - {endDate}
      </span>
      <ChevronDown className="ml-2 h-4 w-4" />
    </div>
  )
}
