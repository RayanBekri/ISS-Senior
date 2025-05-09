"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
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
} from "recharts"
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

const orderData = [
  { month: "Jan", completed: 65, pending: 28, cancelled: 12 },
  { month: "Feb", completed: 59, pending: 32, cancelled: 10 },
  { month: "Mar", completed: 80, pending: 25, cancelled: 15 },
  { month: "Apr", completed: 81, pending: 30, cancelled: 14 },
  { month: "May", completed: 56, pending: 20, cancelled: 8 },
  { month: "Jun", completed: 55, pending: 15, cancelled: 5 },
  { month: "Jul", completed: 40, pending: 20, cancelled: 10 },
]

const orderStatusData = [
  { name: "Completed", value: 436, color: "#A200C1" },
  { name: "Pending", value: 170, color: "#FFB100" },
  { name: "Cancelled", value: 74, color: "#F44336" },
]

const topProducts = [
  { name: "3D Printer Model X", orders: 145, revenue: 87000 },
  { name: "Filament Bundle Pack", orders: 98, revenue: 19600 },
  { name: "Custom Print Service", orders: 76, revenue: 45600 },
  { name: "Replacement Parts Kit", orders: 65, revenue: 13000 },
]

export function OrderOverview() {
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">680</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12.5% from last month</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-brand/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-brand" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Completed Orders</p>
                <h3 className="text-2xl font-bold mt-1">436</h3>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8.3% from last month</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">170</h3>
                <div className="flex items-center mt-1 text-amber-600 text-sm">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5.2% from last month</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled Orders</p>
                <h3 className="text-2xl font-bold mt-1">74</h3>
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>2.3% from last month</span>
                </div>
              </div>
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] md:h-[350px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={orderData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" tick={{ fontSize: "0.75rem" }} tickMargin={8} />
                  <YAxis tick={{ fontSize: "0.75rem" }} width={40} />
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
                    dataKey="completed"
                    name="Completed"
                    fill="#A200C1"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="#FFB100"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                  <Bar
                    dataKey="cancelled"
                    name="Cancelled"
                    fill="#F44336"
                    radius={[4, 4, 0, 0]}
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
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] md:h-[350px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
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
                    {orderStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                        className="transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} orders`, undefined]}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Orders</th>
                  <th className="text-left py-3 px-4 font-medium">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.orders}</td>
                    <td className="py-3 px-4">${product.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">In Stock</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
