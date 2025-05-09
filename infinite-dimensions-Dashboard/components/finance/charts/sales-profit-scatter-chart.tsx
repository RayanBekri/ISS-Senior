"use client"

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
} from "recharts"

interface SalesProfitScatterChartProps {
  positiveData: Array<{ x: number; y: number; z: number }>
  negativeData: Array<{ x: number; y: number; z: number }>
}

export function SalesProfitScatterChart({ positiveData, negativeData }: SalesProfitScatterChartProps) {
  return (
    <div className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="Sum of Sales" unit="k" />
          <YAxis type="number" dataKey="y" name="Sum of Profit" unit="k" />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Profit Margin" unit="%" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Positive Profit Margin" data={positiveData} fill="#4CAF50" shape="circle" />
          <Scatter name="Negative Profit Margin" data={negativeData} fill="#F44336" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="flex justify-end mt-2">
        <div className="bg-white p-2 rounded-md shadow-sm text-xs">
          <div className="flex items-center gap-2">
            <span>Name: Acme, Inc.</span>
            <span>Sum of Sales: 20,000</span>
            <span>Sum of Profit: 5,000</span>
            <span>Profit Margin: 25%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
