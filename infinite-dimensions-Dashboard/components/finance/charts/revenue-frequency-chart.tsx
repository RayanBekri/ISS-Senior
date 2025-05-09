"use client"

import type React from "react"

import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { useFinanceData } from "@/hooks/use-finance-data"
import { Skeleton } from "@/components/ui/skeleton"

type PeriodType = "weekly" | "monthly" | "quarterly" | "yearly"

interface RevenueFrequencyChartProps {
  className?: string
}

export function RevenueFrequencyChart({ className }: RevenueFrequencyChartProps) {
  const [period, setPeriod] = useState<PeriodType>("monthly")
  const { data, isLoading } = useFinanceData<Array<{ range: string; "2023": number; "2024": number }>>(
    "revenueFrequency",
    period,
  )

  const handlePeriodChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dropdown = document.getElementById("frequency-period-dropdown")
    if (dropdown) {
      dropdown.classList.toggle("hidden")
    }
  }

  const selectPeriod = (selectedPeriod: PeriodType) => {
    setPeriod(selectedPeriod)
    const dropdown = document.getElementById("frequency-period-dropdown")
    if (dropdown) {
      dropdown.classList.add("hidden")
    }
  }

  const getPeriodLabel = () => {
    switch (period) {
      case "weekly":
        return "Weeks"
      case "monthly":
        return "Months"
      case "quarterly":
        return "Quarters"
      case "yearly":
        return "Years"
      default:
        return "Months"
    }
  }

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <button onClick={handlePeriodChange} className="flex items-center border rounded-md px-3 py-1.5 text-sm">
            <span className="mr-1">Filter by {getPeriodLabel()}</span>
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
          <div
            id="frequency-period-dropdown"
            className="absolute left-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10 hidden"
          >
            <ul className="py-1">
              <li>
                <button
                  onClick={() => selectPeriod("weekly")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Weeks
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectPeriod("monthly")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Months
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectPeriod("quarterly")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Quarters
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectPeriod("yearly")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Years
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center border rounded-md px-3 py-1.5 text-sm">
            <span className="mr-1">Filter by Range</span>
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
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-300 rounded-sm"></div>
          <span className="text-sm">2023</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
          <span className="text-sm">2024</span>
        </div>
      </div>

      <div className="h-[400px]">
        <ChartContainer
          config={{
            "2023": {
              label: "2023",
              color: "#fca5a5",
            },
            "2024": {
              label: "2024",
              color: "#93c5fd",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="2023" fill="#fca5a5" />
              <Bar dataKey="2024" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="flex justify-center mt-6">
        <div className="bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2">
          <span className="font-medium">Frequency:</span>
          <span>{data && data.reduce((sum, item) => sum + item["2024"], 0)}</span>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="text-sm text-gray-500">Revenue</div>
      </div>
    </div>
  )
}
