"use client"

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function NetProfitProductionChart() {
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="profit2023"
          name="2023"
          stroke="#9333ea"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="profit2024"
          name="2024"
          stroke="#ec4899"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="profit2025"
          name="2025"
          stroke="#6b21a8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
