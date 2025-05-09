"use client"

import type React from "react"

import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { useFinanceData } from "@/hooks/use-finance-data"
import { Skeleton } from "@/components/ui/skeleton"

type PeriodType = "weekly" | "monthly" | "quarterly" | "yearly"

interface SalesAndProfitChartProps {
  className?: string
}

export function SalesAndProfitChart({ className }: SalesAndProfitChartProps) {
  const [period, setPeriod] = useState<PeriodType>("monthly")
  const { data, isLoading } = useFinanceData<Array<{ period: string; sales: number; profit: number }>>(
    "salesAndProfit",
    period,
  )

  const handlePeriodChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dropdown = document.getElementById("period-dropdown")
    if (dropdown) {
      dropdown.classList.toggle("hidden")
    }
  }

  const selectPeriod = (selectedPeriod: PeriodType) => {
    setPeriod(selectedPeriod)
    const dropdown = document.getElementById("period-dropdown")
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
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-300 rounded-sm"></div>
            <span className="text-sm">Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-300 rounded-sm"></div>
            <span className="text-sm">Sales</span>
          </div>
        </div>
        <div className="relative">
          <button onClick={handlePeriodChange} className="flex items-center border rounded-md px-3 py-1.5 text-sm">
            <span className="mr-1">{getPeriodLabel()}</span>
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
            id="period-dropdown"
            className="absolute right-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10 hidden"
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
      </div>

      <div className="h-[400px]">
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-1))",
            },
            profit: {
              label: "Profit",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis yAxisId="left" orientation="left" stroke="#a78bfa" />
              <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#a78bfa"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="profit"
                stroke="#fbbf24"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="flex justify-center mt-6">
        <div className="bg-gray-100 px-4 py-2 rounded-md">
          <span className="font-medium">
            {data && data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
