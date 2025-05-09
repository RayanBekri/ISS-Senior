"use client"

import { useFinanceData } from "@/hooks/use-finance-data"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoriesHighestProfitChartProps {
  year?: string
}

export function CategoriesHighestProfitChart({ year = "2023" }: CategoriesHighestProfitChartProps) {
  const { data, isLoading } = useFinanceData("all", "monthly", year)

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-[300px] rounded-full" />
      </div>
    )
  }

  // Use the categories profit data
  const categoriesProfitData = data?.shop?.categoriesProfit || []

  // Define colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

  // Create a table-like display for the categories and their profits
  const renderCategoryTable = () => {
    return (
      <div className="mt-4 overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Label</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {categoriesProfitData.map((entry, index) => (
              <tr key={`row-${index}`} className="hover:bg-gray-50">
                <td className="py-2 flex items-center">
                  <span
                    className="inline-block w-3 h-3 mr-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="text-sm">{entry.category}</span>
                </td>
                <td className="py-2 text-right text-sm font-medium">{entry.profit.toLocaleString()} DT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="h-[400px] flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoriesProfitData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="profit"
              nameKey="category"
            >
              {categoriesProfitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value.toLocaleString()} DT`, "Profit"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {renderCategoryTable()}
    </div>
  )
}
