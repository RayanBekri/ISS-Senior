"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
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
import { YearSelector } from "@/components/finance/year-selector"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface FinanceOverviewProps {
  year: string
  month: string
}

export function FinanceOverview({ year, month }: FinanceOverviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // This would typically come from your data source
  const metrics = [
    {
      title: "Total Revenue",
      value: "$125,430.00",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: "$54,230.00",
      change: "-3.2%",
      trend: "down",
    },
    {
      title: "Net Profit",
      value: "$71,200.00",
      change: "+18.3%",
      trend: "up",
    },
    {
      title: "Profit Margin",
      value: "56.8%",
      change: "+5.1%",
      trend: "up",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
    { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
    { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
    { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
    { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
    { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
    { month: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
    { month: "Aug", revenue: 4000, expenses: 2400, profit: 1600 },
    { month: "Sep", revenue: 3000, expenses: 1398, profit: 1602 },
    { month: "Oct", revenue: 2000, expenses: 9800, profit: -7800 },
    { month: "Nov", revenue: 2780, expenses: 3908, profit: -1128 },
    { month: "Dec", revenue: 1890, expenses: 4800, profit: -2910 },
  ]

  const expenseCategories = [
    { name: "Marketing", value: 400, color: "#0088FE" },
    { name: "Operations", value: 300, color: "#00C49F" },
    { name: "Salaries", value: 300, color: "#FFBB28" },
    { name: "Technology", value: 200, color: "#FF8042" },
  ]

  const cashFlowData = [
    { month: "Jan", operating: 4000, investing: -1400, financing: -600 },
    { month: "Feb", operating: 3000, investing: -1398, financing: 602 },
    { month: "Mar", operating: 2000, investing: -9800, financing: -800 },
    { month: "Apr", operating: 2780, investing: 3908, financing: -128 },
    { month: "May", operating: 1890, investing: -4800, financing: -910 },
    { month: "Jun", operating: 2390, investing: 3800, financing: -410 },
    { month: "Jul", operating: 3490, investing: -4300, financing: 10 },
    { month: "Aug", operating: 4000, investing: -2400, financing: -600 },
    { month: "Sep", operating: 3000, investing: -1398, financing: 602 },
    { month: "Oct", operating: 2000, investing: -9800, financing: -800 },
    { month: "Nov", operating: 2780, investing: 3908, financing: -128 },
    { month: "Dec", operating: 1890, investing: -4800, financing: -910 },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
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
        {metrics.map((metric, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardContent className="p-4 flex flex-col">
              <div className="text-sm text-muted-foreground">{metric.title}</div>
              <div className="text-2xl font-bold mt-1">{metric.value}</div>
              <div className="flex items-center mt-1">
                {metric.trend === "up" ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue, Expenses & Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#A200C1"
                    fill="#A200C1"
                    fillOpacity={0.2}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#FFB100"
                    fill="#FFB100"
                    fillOpacity={0.2}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    name="Profit"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.2}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
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
                    {expenseCategories.map((entry, index) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Bar dataKey="operating" name="Operating" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="investing" name="Investing" fill="#F44336" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="financing" name="Financing" fill="#FFB100" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Margin Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={(entry) => ((entry.profit / entry.revenue) * 100).toFixed(1)}
                    name="Profit Margin"
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
      </div>
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium mb-4">Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="text-gray-500 text-sm">DT 21,190</div>
                <div className="text-purple-500 text-sm">Total Sales</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">DT 117,432</div>
                <div className="text-purple-500 text-sm">Operating Profit</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Current Year</h2>
              <YearSelector />
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-gray-500 text-sm">DT 18,300</div>
                <div className="text-purple-500 text-sm">Gross Profit</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">DT 80,432</div>
                <div className="text-purple-500 text-sm">Profit Before Interest Tax</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">DT 17,432</div>
                <div className="text-purple-500 text-sm">EBITDA</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">DT 110,432</div>
                <div className="text-purple-500 text-sm">Net Profit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
