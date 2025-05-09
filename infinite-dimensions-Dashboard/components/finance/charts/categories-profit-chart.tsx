"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Category 1", value: 632349 },
  { name: "Category 2", value: 387998 },
  { name: "Category 3", value: 15840 },
  { name: "Category 4", value: 343098 },
  { name: "Category 5", value: 260084 },
  { name: "Category 6", value: 137382 },
  { name: "Category 7", value: 19008 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

export function CategoriesProfitChart() {
  return (
    <div className="h-[400px]">
      <div className="grid grid-cols-1 gap-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} DT`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.map((category, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-sm font-medium">{category.value.toLocaleString()} DT</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
