"use client"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", profit: 20 },
  { month: "Feb", profit: 30 },
  { month: "Mar", profit: 35 },
  { month: "Apr", profit: 35 },
  { month: "May", profit: 38 },
  { month: "Jun", profit: 40 },
  { month: "Jul", profit: 42 },
  { month: "Aug", profit: 40 },
  { month: "Sep", profit: 42 },
  { month: "Oct", profit: 45 },
  { month: "Nov", profit: 48 },
  { month: "Dec", profit: 50 },
]

export function ShopProfitChart() {
  return (
    <div className="h-[400px]">
      <ChartContainer
        config={{
          profit: {
            label: "Profit",
            color: "#3b82f6",
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
            <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
