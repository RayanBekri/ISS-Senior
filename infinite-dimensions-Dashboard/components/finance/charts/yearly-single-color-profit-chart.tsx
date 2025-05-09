"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function YearlySingleColorProfitChart() {
  const data = [
    { month: "Jan", profit: 30 },
    { month: "Feb", profit: 25 },
    { month: "Mar", profit: 35 },
    { month: "Apr", profit: 28 },
    { month: "May", profit: 32 },
    { month: "Jun", profit: 25 },
    { month: "Jul", profit: 30 },
    { month: "Aug", profit: 28 },
    { month: "Sep", profit: 35 },
    { month: "Oct", profit: 32 },
    { month: "Nov", profit: 30 },
    { month: "Dec", profit: 28 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="profit" name="Profit" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
