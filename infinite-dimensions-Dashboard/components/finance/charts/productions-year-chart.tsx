"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ProductionsYearChartProps {
  selectedYear: string
}

export function ProductionsYearChart({ selectedYear }: ProductionsYearChartProps) {
  // Sample data - replace with actual data from your API or database
  const data = [
    {
      quarter: "Q1",
      multicolor: 45,
      singleColor: 32,
      multicolor2023: 25,
      singleColor2023: 20,
      multicolor2024: 35,
      singleColor2024: 28,
    },
    {
      quarter: "Q2",
      multicolor: 50,
      singleColor: 35,
      multicolor2023: 28,
      singleColor2023: 22,
      multicolor2024: 38,
      singleColor2024: 30,
    },
    {
      quarter: "Q3",
      multicolor: 58,
      singleColor: 40,
      multicolor2023: 30,
      singleColor2023: 25,
      multicolor2024: 42,
      singleColor2024: 32,
    },
    {
      quarter: "Q4",
      multicolor: 62,
      singleColor: 45,
      multicolor2023: 32,
      singleColor2023: 28,
      multicolor2024: 45,
      singleColor2024: 35,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="quarter" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Legend />
        <Bar dataKey="multicolor" name="Multicolor 2025" fill="#6b21a8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="singleColor" name="Single Color 2025" fill="#d1d5db" radius={[4, 4, 0, 0]} />
        <Bar dataKey="multicolor2024" name="Multicolor 2024" fill="#ec4899" radius={[4, 4, 0, 0]} />
        <Bar dataKey="singleColor2024" name="Single Color 2024" fill="#f9a8d4" radius={[4, 4, 0, 0]} />
        <Bar dataKey="multicolor2023" name="Multicolor 2023" fill="#9333ea" radius={[4, 4, 0, 0]} />
        <Bar dataKey="singleColor2023" name="Single Color 2023" fill="#e9d5ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
