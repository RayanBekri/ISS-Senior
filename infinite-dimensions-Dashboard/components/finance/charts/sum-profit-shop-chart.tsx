"use client"

import { useFinanceData } from "@/hooks/use-finance-data"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface SumProfitShopChartProps {
  year?: string
}

export function SumProfitShopChart({ year = "2023" }: SumProfitShopChartProps) {
  const { data, isLoading } = useFinanceData("all", "monthly", year)

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  // Use the category profit data for monthly profit trend
  const categoryProfitData = data?.shop?.categoryProfit || []

  // Transform data for the chart
  const transformedData = categoryProfitData.map((item) => ({
    month: item.month,
    profit: item.profit,
    // Calculate percentage for y-axis display
    percentage: Math.round((item.profit / 6000) * 100), // Assuming 6000 is max profit for percentage calculation
  }))

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transformedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 50]} // Set domain from 0% to 50%
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Profit"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#4DB6AC"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
