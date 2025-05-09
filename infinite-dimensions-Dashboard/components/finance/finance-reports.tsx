"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const revenueByProduct = [
  { name: "3D Printer Model X", revenue: 125000 },
  { name: "3D Printer Model Y", revenue: 95000 },
  { name: "Filament Bundle Pack", revenue: 45000 },
  { name: "Custom Print Service", revenue: 60000 },
  { name: "Replacement Parts Kit", revenue: 20000 },
]

const revenueByChannel = [
  { name: "Direct Sales", value: 45, color: "#A200C1" },
  { name: "Online Store", value: 30, color: "#C080D3" },
  { name: "Distributors", value: 15, color: "#FFB100" },
  { name: "Partners", value: 10, color: "#4CAF50" },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 55000 },
  { month: "Apr", revenue: 58000 },
  { month: "May", revenue: 45000 },
  { month: "Jun", revenue: 47000 },
  { month: "Jul", revenue: 60000 },
  { month: "Aug", revenue: 55000 },
  { month: "Sep", revenue: 50000 },
  { month: "Oct", revenue: 52000 },
  { month: "Nov", revenue: 58000 },
  { month: "Dec", revenue: 65000 },
]

export function FinanceReports() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [reportType, setReportType] = useState("revenue")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 animate-pulse">
        <div className="bg-gray-100 h-16 rounded-lg"></div>
        <div className="bg-gray-100 h-80 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 h-80 rounded-lg"></div>
          <div className="bg-gray-100 h-80 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <select
            className="border rounded-md text-sm py-2 px-3"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="revenue">Revenue Report</option>
            <option value="expense">Expense Report</option>
            <option value="profit">Profit Report</option>
            <option value="cashflow">Cash Flow Report</option>
          </select>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend (2023)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${value.toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#A200C1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByProduct}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip
                    formatter={(value) => `${value.toLocaleString()}`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#A200C1" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByChannel}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByChannel.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                        className="transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e2e8f0",
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
          <CardTitle>Revenue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-right py-3 px-4 font-medium">Q1</th>
                  <th className="text-right py-3 px-4 font-medium">Q2</th>
                  <th className="text-right py-3 px-4 font-medium">Q3</th>
                  <th className="text-right py-3 px-4 font-medium">Q4</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                  <th className="text-right py-3 px-4 font-medium">% of Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">3D Printers</td>
                  <td className="py-3 px-4 text-right">$55,000</td>
                  <td className="py-3 px-4 text-right">$65,000</td>
                  <td className="py-3 px-4 text-right">$60,000</td>
                  <td className="py-3 px-4 text-right">$70,000</td>
                  <td className="py-3 px-4 text-right">$250,000</td>
                  <td className="py-3 px-4 text-right">62.5%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Filaments</td>
                  <td className="py-3 px-4 text-right">$12,000</td>
                  <td className="py-3 px-4 text-right">$15,000</td>
                  <td className="py-3 px-4 text-right">$13,000</td>
                  <td className="py-3 px-4 text-right">$15,000</td>
                  <td className="py-3 px-4 text-right">$55,000</td>
                  <td className="py-3 px-4 text-right">13.8%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Services</td>
                  <td className="py-3 px-4 text-right">$15,000</td>
                  <td className="py-3 px-4 text-right">$18,000</td>
                  <td className="py-3 px-4 text-right">$17,000</td>
                  <td className="py-3 px-4 text-right">$20,000</td>
                  <td className="py-3 px-4 text-right">$70,000</td>
                  <td className="py-3 px-4 text-right">17.5%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Parts & Accessories</td>
                  <td className="py-3 px-4 text-right">$5,000</td>
                  <td className="py-3 px-4 text-right">$7,000</td>
                  <td className="py-3 px-4 text-right">$6,000</td>
                  <td className="py-3 px-4 text-right">$7,000</td>
                  <td className="py-3 px-4 text-right">$25,000</td>
                  <td className="py-3 px-4 text-right">6.3%</td>
                </tr>
                <tr className="border-b font-medium bg-brand/10">
                  <td className="py-3 px-4">Total</td>
                  <td className="py-3 px-4 text-right">$87,000</td>
                  <td className="py-3 px-4 text-right">$105,000</td>
                  <td className="py-3 px-4 text-right">$96,000</td>
                  <td className="py-3 px-4 text-right">$112,000</td>
                  <td className="py-3 px-4 text-right">$400,000</td>
                  <td className="py-3 px-4 text-right">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
