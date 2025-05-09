"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ProfitByPrinterOrdersChartProps {
  selectedYear: number
  selectedMonth: number
}

export function ProfitByPrinterOrdersChart({ selectedYear, selectedMonth }: ProfitByPrinterOrdersChartProps) {
  // Sample data - replace with actual data from your API or database
  const data = [
    { printer: "Printer 1", profit: 12500, orders: 45 },
    { printer: "Printer 2", profit: 8700, orders: 32 },
    { printer: "Printer 3", profit: 15200, orders: 58 },
    { printer: "Printer 4", profit: 9800, orders: 37 },
    { printer: "Printer 5", profit: 11300, orders: 41 },
    { printer: "Printer 6", profit: 7600, orders: 28 },
    { printer: "Printer 7", profit: 13900, orders: 52 },
  ]

  return (
    <ChartContainer
      config={{
        profit: {
          label: "Profit",
          color: "hsl(var(--chart-1))",
        },
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="printer" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" orientation="left" stroke="var(--color-profit)" />
          <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar yAxisId="left" dataKey="profit" fill="var(--color-profit)" name="Profit" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="orders" fill="var(--color-orders)" name="Orders" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
