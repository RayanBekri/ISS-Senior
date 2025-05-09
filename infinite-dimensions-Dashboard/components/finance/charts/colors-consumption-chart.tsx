"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function ColorsConsumptionChart() {
  const data = [
    { color: "Color 1", consumption: 300 },
    { color: "Color 2", consumption: 280 },
    { color: "Color 3", consumption: 260 },
    { color: "Color 4", consumption: 240 },
    { color: "Color 5", consumption: 220 },
    { color: "Color 6", consumption: 200 },
    { color: "Color 7", consumption: 180 },
    { color: "Color 8", consumption: 160 },
    { color: "Color 9", consumption: 140 },
    { color: "Color 10", consumption: 120 },
    { color: "Color 11", consumption: 100 },
    { color: "Color 12", consumption: 80 },
  ].sort((a, b) => b.consumption - a.consumption)

  // Generate colors based on consumption value
  const getBarColor = (value: number) => {
    const maxValue = Math.max(...data.map((item) => item.consumption))
    const minValue = Math.min(...data.map((item) => item.consumption))
    const ratio = (value - minValue) / (maxValue - minValue)

    // Color gradient from orange to red
    const hue = 30 - ratio * 30 // From orange (30) to red (0)
    return `hsl(${hue}, 90%, 60%)`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="color" type="category" width={100} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar
          dataKey="consumption"
          name="Consumption"
          radius={[0, 4, 4, 0]}
          fill={(entry) => getBarColor(entry.consumption)}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
