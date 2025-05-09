"use client"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", profit2023: 10, profit2024: 20, profit2025: 30 },
  { month: "Feb", profit2023: 15, profit2024: 25, profit2025: 35 },
  { month: "Mar", profit2023: 20, profit2024: 30, profit2025: 40 },
  { month: "Apr", profit2023: 25, profit2024: 35, profit2025: 45 },
  { month: "May", profit2023: 30, profit2024: 40, profit2025: 50 },
  { month: "Jun", profit2023: 25, profit2024: 35, profit2025: 45 },
  { month: "Jul", profit2023: 20, profit2024: 30, profit2025: 40 },
  { month: "Aug", profit2023: 25, profit2024: 35, profit2025: 45 },
  { month: "Sep", profit2023: 30, profit2024: 40, profit2025: 50 },
  { month: "Oct", profit2023: 35, profit2024: 45, profit2025: 55 },
  { month: "Nov", profit2023: 30, profit2024: 40, profit2025: 50 },
  { month: "Dec", profit2023: 25, profit2024: 35, profit2025: 45 },
]

export function YearlyShopProfitChart() {
  return (
    <div className="h-[400px]">
      <ChartContainer
        config={{
          profit2023: {
            label: "2023",
            color: "#f97316",
          },
          profit2024: {
            label: "2024",
            color: "#3b82f6",
          },
          profit2025: {
            label: "2025",
            color: "#ec4899",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="profit2023" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="profit2024" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="profit2025" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
