"use client"

import { useFinanceData } from "@/hooks/use-finance-data"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductSalesChartProps {
  year?: string
  month?: string
}

export function ProductSalesChart({ year = "2023", month = "All" }: ProductSalesChartProps) {
  const { data, isLoading } = useFinanceData("all", "monthly", year)

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  // Use the yearly revenue data for the monthly sales
  const monthlyData = data?.profitLoss?.yearlyRevenue || []

  // Define colors for each month
  const colors = [
    "#FF6B6B",
    "#FF9E7D",
    "#FFCA80",
    "#FFE57F",
    "#C5E17A",
    "#80CBC4",
    "#7986CB",
    "#9575CD",
    "#BA68C8",
    "#F06292",
    "#4DB6AC",
    "#4FC3F7",
  ]

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={monthlyData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="month" type="category" width={60} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()} DT`, "Revenue"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
            {monthlyData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
