"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useFinanceData } from "@/hooks/use-finance-data"
import { Skeleton } from "@/components/ui/skeleton"
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

interface FinanceCustomersProps {
  year: string
  month: string
}

export function FinanceCustomers({ year, month }: FinanceCustomersProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "quarterly" | "yearly">("monthly")

  const { data: customerData, isLoading: isLoadingCustomerData } = useFinanceData<any>("customers", period)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

  const handlePeriodChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dropdown = document.getElementById("customer-period-dropdown")
    if (dropdown) {
      dropdown.classList.toggle("hidden")
    }
  }

  const selectPeriod = (selectedPeriod: "weekly" | "monthly" | "quarterly" | "yearly") => {
    setPeriod(selectedPeriod)
    const dropdown = document.getElementById("customer-period-dropdown")
    if (dropdown) {
      dropdown.classList.add("hidden")
    }
  }

  const getPeriodLabel = () => {
    switch (period) {
      case "weekly":
        return "Weeks"
      case "monthly":
        return "Months"
      case "quarterly":
        return "Quarters"
      case "yearly":
        return "Years"
      default:
        return "Months"
    }
  }

  // Overview section data
  const overviewData = {
    totalSales: "DT 21,190",
    operatingProfit: "DT 117,432",
    grossProfit: "DT 18,300",
    profitBeforeInterest: "DT 80,432",
    ebitda: "DT 17,432",
    netProfit: "DT 110,432",
  }

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">{overviewData.totalSales}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gross Profit</p>
                <p className="text-2xl font-bold">{overviewData.grossProfit}</p>
              </div>
              <div>
                <p className="text-sm text-purple-500">Operating Profit</p>
                <p className="text-2xl font-bold">{overviewData.operatingProfit}</p>
              </div>
              <div>
                <p className="text-sm text-purple-500">Profit Before Interest Tax</p>
                <p className="text-2xl font-bold">{overviewData.profitBeforeInterest}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current Year</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-purple-500">EBITDA</p>
                <p className="text-2xl font-bold">{overviewData.ebitda}</p>
              </div>
              <div>
                <p className="text-sm text-purple-500">Net Profit</p>
                <p className="text-2xl font-bold">{overviewData.netProfit}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center border rounded-md px-3 py-1.5 text-sm">
                <span className="mr-1">Year</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales and Profit Scatter Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Sum of Sales, Sum of Profit and Profit Margin Per Customer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoadingCustomerData ? (
            <Skeleton className="h-[500px] w-full" />
          ) : (
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
                  <Scatter
                    name="Positive Profit Margin"
                    data={customerData?.salesProfitScatter?.positive || []}
                    fill="#4CAF50"
                    shape="circle"
                  />
                  <Scatter
                    name="Negative Profit Margin"
                    data={customerData?.salesProfitScatter?.negative || []}
                    fill="#F44336"
                    shape="circle"
                  />
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
          )}
        </CardContent>
      </Card>

      {/* Most Profitable Categories and Profit by Printer Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Most Profitable Categories per Customer</CardTitle>
              <div className="flex items-center">
                <span className="text-sm mr-2">2025</span>
                <button className="flex items-center border rounded-md px-2 py-1 text-sm">
                  <span className="mr-1">Year</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoadingCustomerData ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerData?.profitableCategories || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerData?.profitableCategories?.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Categories</th>
                        <th className="text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData?.profitableCategories?.map((item: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 flex items-center">
                            <span
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            {item.name}
                          </td>
                          <td className="py-2 text-right">{item.value}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Sum of Profit by Printer Orders Per Customer</CardTitle>
              <div className="flex items-center">
                <span className="text-sm mr-2">2025</span>
                <button className="flex items-center border rounded-md px-2 py-1 text-sm">
                  <span className="mr-1">Year</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoadingCustomerData ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={customerData?.profitByPrinterOrders || []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="profit" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
