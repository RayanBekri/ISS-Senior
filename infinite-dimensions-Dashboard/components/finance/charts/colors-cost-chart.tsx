"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function ColorsCostChart() {
  const data = [
    { name: "Color 1", value: 632349 },
    { name: "Color 2", value: 387998 },
    { name: "Color 3", value: 15840 },
    { name: "Color 4", value: 343098 },
    { name: "Color 5", value: 260084 },
    { name: "Color 6", value: 137382 },
    { name: "Color 7", value: 19008 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 gap-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} DT`} />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.map((color, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{color.name}</span>
              </div>
              <span className="text-sm font-medium">{color.value.toLocaleString()} DT</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
