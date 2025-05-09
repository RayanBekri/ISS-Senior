"use client"

import { useFinanceData } from "@/hooks/use-finance-data"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductSalesYearlyComparisonChartProps {
  year?: string
}

export function ProductSalesYearlyComparisonChart({ year = "2023" }: ProductSalesYearlyComparisonChartProps) {
  const { data, isLoading } = useFinanceData("all", "monthly", year)

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  // Use the shop profit data for yearly comparison
  const shopProfitData = data?.shop?.shopProfit || []

  // Transform data for the chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const transformedData = months.map((month, index) => {
    const monthData = shopProfitData.find((item) => item.month === month) || { month, "2021": 0, "2022": 0, "2023": 0 }
    return {
      month,
      "2023": monthData["2021"] || 0, // Using 2021 data for 2023 line
      "2024": monthData["2022"] || 0, // Using 2022 data for 2024 line
      "2025": monthData["2023"] || 0, // Using 2023 data for 2025 line
    }
  })

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transformedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}`} />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()} DT`, ""]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="2023" stroke="#4DB6AC" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="2024" stroke="#BA68C8" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="2025" stroke="#F06292" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
