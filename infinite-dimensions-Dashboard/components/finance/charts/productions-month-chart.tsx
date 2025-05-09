"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ProductionsMonthChartProps {
  selectedYear: string
  selectedMonth: string
}

export function ProductionsMonthChart({ selectedYear, selectedMonth }: ProductionsMonthChartProps) {
  // Sample data - replace with actual data from your API or database
  const data = [
    { month: "January", multicolor: 45, singleColor: 32 },
    { month: "February", multicolor: 42, singleColor: 30 },
    { month: "March", multicolor: 48, singleColor: 35 },
    { month: "April", multicolor: 40, singleColor: 28 },
    { month: "May", multicolor: 44, singleColor: 32 },
    { month: "June", multicolor: 46, singleColor: 34 },
    { month: "July", multicolor: 43, singleColor: 31 },
    { month: "August", multicolor: 41, singleColor: 29 },
    { month: "September", multicolor: 39, singleColor: 27 },
    { month: "October", multicolor: 38, singleColor: 26 },
    { month: "November", multicolor: 37, singleColor: 25 },
    { month: "December", multicolor: 36, singleColor: 24 },
  ]

  // Sort data in descending order by total production
  const sortedData = [...data].sort((a, b) => b.multicolor + b.singleColor - (a.multicolor + a.singleColor))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={sortedData} margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} width={80} />
        <Legend />
        <Bar dataKey="multicolor" name="Multicolor" stackId="a" fill="#6b21a8" radius={[0, 4, 4, 0]} />
        <Bar dataKey="singleColor" name="Single Color" stackId="a" fill="#ec4899" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
