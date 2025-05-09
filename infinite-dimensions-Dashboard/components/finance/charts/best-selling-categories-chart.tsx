"use client"

import { useFinanceData } from "@/hooks/use-finance-data"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface BestSellingCategoriesChartProps {
  year?: string
  month?: string
}

export function BestSellingCategoriesChart({ year = "2023", month = "All" }: BestSellingCategoriesChartProps) {
  const { data, isLoading } = useFinanceData("all", "monthly", year)

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Skeleton className="h-[300px] w-[300px] rounded-full" />
      </div>
    )
  }

  // Transform the data to match the radar chart format
  const categories = data?.shop?.bestSellingCategories || []
  const radarData = categories.map((category) => ({
    category: category.name,
    value: category.value * 10, // Scale for better visualization
  }))

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis />
          <Radar name="Category" dataKey="value" stroke="#A200C1" fill="#A200C1" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
