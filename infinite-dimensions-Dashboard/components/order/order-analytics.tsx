"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, orders: 120 },
  { month: "Feb", revenue: 38000, orders: 110 },
  { month: "Mar", revenue: 55000, orders: 150 },
  { month: "Apr", revenue: 58000, orders: 160 },
  { month: "May", revenue: 45000, orders: 130 },
  { month: "Jun", revenue: 47000, orders: 135 },
  { month: "Jul", revenue: 60000, orders: 170 },
]

const customerSegments = [
  { name: "New Customers", value: 35, color: "#A200C1" },
  { name: "Returning", value: 45, color: "#C080D3" },
  { name: "Loyal", value: 20, color: "#FFB100" },
]

const ordersByRegion = [
  { region: "North", orders: 180 },
  { region: "South", orders: 200 },
  { region: "East", orders: 150 },
  { region: "West", orders: 120 },
  { region: "Central", orders: 100 },
]

const customerData = [
  { id: 1, orderValue: 1200, frequency: 12, size: 100 },
  { id: 2, orderValue: 800, frequency: 4, size: 60 },
  { id: 3, orderValue: 1500, frequency: 8, size: 80 },
  { id: 4, orderValue: 2200, frequency: 15, size: 120 },
  { id: 5, orderValue: 500, frequency: 2, size: 40 },
  { id: 6, orderValue: 700, frequency: 3, size: 50 },
  { id: 7, orderValue: 1800, frequency: 10, size: 90 },
  { id: 8, orderValue: 1000, frequency: 6, size: 70 },
  { id: 9, orderValue: 2500, frequency: 20, size: 130 },
  { id: 10, orderValue: 1300, frequency: 7, size: 75 },
  { id: 11, orderValue: 900, frequency: 5, size: 65 },
  { id: 12, orderValue: 1600, frequency: 9, size: 85 },
]

export function OrderAnalytics() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      // Force recharts to recalculate dimensions
      window.dispatchEvent(new Event("resize"))
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenue}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: "0.75rem" }} tickMargin={8} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#A200C1"
                  tick={{ fontSize: "0.75rem" }}
                  width={40}
                  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#FFB100" tick={{ fontSize: "0.75rem" }} width={30} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                  formatter={(value, name) => [
                    name === "revenue" ? `$${value.toLocaleString()}` : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconSize={8} iconType="circle" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#A200C1"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#FFB100"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={({ viewBox }) => Math.min(viewBox.width, viewBox.height) / 2.5}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                      className="transition-opacity duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, undefined]}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ordersByRegion}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 20,
                  left: 60,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: "0.75rem" }} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: "0.75rem" }} width={50} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                  formatter={(value) => [`${value} orders`, undefined]}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconSize={8} iconType="circle" />
                <Bar
                  dataKey="orders"
                  fill="#A200C1"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Value Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  type="number"
                  dataKey="orderValue"
                  name="Order Value"
                  unit="$"
                  tick={{ fontSize: "0.75rem" }}
                  tickFormatter={(value) => `$${value}`}
                  label={{
                    value: "Order Value ($)",
                    position: "bottom",
                    offset: 0,
                    fontSize: "0.75rem",
                    style: { textAnchor: "middle" },
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="frequency"
                  name="Frequency"
                  tick={{ fontSize: "0.75rem" }}
                  label={{
                    value: "Order Frequency",
                    angle: -90,
                    position: "left",
                    fontSize: "0.75rem",
                    style: { textAnchor: "middle" },
                  }}
                />
                <ZAxis type="number" dataKey="size" range={[40, 500]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                  formatter={(value, name) => [name === "Order Value" ? `$${value}` : value, name]}
                />
                <Scatter
                  name="Customers"
                  data={customerData}
                  fill="#A200C1"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
