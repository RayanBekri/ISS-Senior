"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts"

const salesTrends = [
  { month: "Jan", sales: 42000, target: 40000, lastYear: 38000 },
  { month: "Feb", sales: 38000, target: 42000, lastYear: 35000 },
  { month: "Mar", sales: 55000, target: 45000, lastYear: 40000 },
  { month: "Apr", sales: 58000, target: 50000, lastYear: 45000 },
  { month: "May", sales: 45000, target: 55000, lastYear: 48000 },
  { month: "Jun", sales: 47000, target: 57000, lastYear: 50000 },
  { month: "Jul", sales: 60000, target: 60000, lastYear: 52000 },
]

const orderSizeData = [
  { month: "Jan", average: 350, median: 299 },
  { month: "Feb", average: 345, median: 295 },
  { month: "Mar", average: 367, median: 310 },
  { month: "Apr", average: 363, median: 305 },
  { month: "May", average: 348, median: 290 },
  { month: "Jun", average: 375, median: 320 },
  { month: "Jul", average: 389, median: 330 },
]

const categoryTrends = [
  { month: "Jan", printers: 25, filaments: 35, accessories: 20, services: 20 },
  { month: "Feb", printers: 22, filaments: 38, accessories: 18, services: 22 },
  { month: "Mar", printers: 30, filaments: 32, accessories: 15, services: 23 },
  { month: "Apr", printers: 35, filaments: 30, accessories: 17, services: 18 },
  { month: "May", printers: 28, filaments: 33, accessories: 22, services: 17 },
  { month: "Jun", printers: 32, filaments: 35, accessories: 18, services: 15 },
  { month: "Jul", printers: 38, filaments: 30, accessories: 16, services: 16 },
]

export function OrderTrends() {
  const [isLoading, setIsLoading] = useState(true)

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
      <div className="grid grid-cols-1 gap-6 animate-pulse">
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] md:h-[400px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={salesTrends}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: "0.75rem" }} tickMargin={8} />
                <YAxis
                  tick={{ fontSize: "0.75rem" }}
                  width={50}
                  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconSize={8} iconType="circle" />
                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill="#A200C1"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#FFB100"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  name="Last Year"
                  stroke="#C080D3"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Order Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={orderSizeData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: "0.75rem" }} tickMargin={8} />
                <YAxis tick={{ fontSize: "0.75rem" }} width={40} domain={["dataMin - 20", "dataMax + 20"]} />
                <Tooltip
                  formatter={(value) => [`$${value}`, undefined]}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconSize={8} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Average Order"
                  stroke="#A200C1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="median"
                  name="Median Order"
                  stroke="#C080D3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
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
          <CardTitle>Product Category Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] md:h-[350px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={categoryTrends}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: "0.75rem" }} tickMargin={8} />
                <YAxis
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fontSize: "0.75rem" }}
                  width={40}
                />
                <Tooltip
                  formatter={(value, name) => [`${(value * 100).toFixed(0)}%`, name]}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconSize={8} iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="printers"
                  name="3D Printers"
                  stackId="1"
                  stroke="#A200C1"
                  fill="#A200C1"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="filaments"
                  name="Filaments"
                  stackId="1"
                  stroke="#C080D3"
                  fill="#C080D3"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="accessories"
                  name="Accessories"
                  stackId="1"
                  stroke="#FFB100"
                  fill="#FFB100"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="services"
                  name="Services"
                  stackId="1"
                  stroke="#4CAF50"
                  fill="#4CAF50"
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
