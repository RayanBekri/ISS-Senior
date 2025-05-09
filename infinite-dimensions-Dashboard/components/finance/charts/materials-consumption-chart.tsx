"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function MaterialsConsumptionChart() {
  const data = [
    { material: "Material 1", consumption: 300 },
    { material: "Material 2", consumption: 280 },
    { material: "Material 3", consumption: 260 },
    { material: "Material 4", consumption: 240 },
    { material: "Material 5", consumption: 220 },
    { material: "Material 6", consumption: 200 },
    { material: "Material 7", consumption: 180 },
    { material: "Material 8", consumption: 160 },
    { material: "Material 9", consumption: 140 },
    { material: "Material 10", consumption: 120 },
    { material: "Material 11", consumption: 100 },
    { material: "Material 12", consumption: 80 },
  ].sort((a, b) => b.consumption - a.consumption)

  // Generate colors based on consumption value
  const getBarColor = (value: number) => {
    const maxValue = Math.max(...data.map((item) => item.consumption))
    const minValue = Math.min(...data.map((item) => item.consumption))
    const ratio = (value - minValue) / (maxValue - minValue)

    // Color gradient from light blue to purple
    const hue = 240 - ratio * 60 // From purple (240) to blue (180)
    return `hsl(${hue}, 70%, 60%)`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis dataKey="material" type="category" width={100} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar
          dataKey="consumption"
          name="Consumption"
          radius={[0, 4, 4, 0]}
          fill="#f97316"
          // Use dynamic colors based on value
          fill={(entry) => getBarColor(entry.consumption)}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
