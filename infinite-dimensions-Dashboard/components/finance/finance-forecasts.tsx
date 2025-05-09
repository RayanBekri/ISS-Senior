"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const revenueForecast = [
  { month: "Jan", actual: 42000, forecast: 40000 },
  { month: "Feb", actual: 38000, forecast: 42000 },
  { month: "Mar", actual: 55000, forecast: 45000 },
  { month: "Apr", actual: 58000, forecast: 50000 },
  { month: "May", actual: 45000, forecast: 55000 },
  { month: "Jun", actual: 47000, forecast: 57000 },
  { month: "Jul", actual: 60000, forecast: 60000 },
  { month: "Aug", forecast: 65000 },
  { month: "Sep", forecast: 70000 },
  { month: "Oct", forecast: 75000 },
  { month: "Nov", forecast: 80000 },
  { month: "Dec", forecast: 85000 },
]

const cashFlowForecast = [
  { month: "Jan", inflow: 42000, outflow: 30000, balance: 12000 },
  { month: "Feb", inflow: 38000, outflow: 28000, balance: 22000 },
  { month: "Mar", inflow: 55000, outflow: 35000, balance: 42000 },
  { month: "Apr", inflow: 58000, outflow: 36000, balance: 64000 },
  { month: "May", inflow: 45000, outflow: 32000, balance: 77000 },
  { month: "Jun", inflow: 47000, outflow: 33000, balance: 91000 },
  { month: "Jul", inflow: 60000, outflow: 38000, balance: 113000 },
  { month: "Aug", inflow: 65000, outflow: 40000, balance: 138000 },
  { month: "Sep", inflow: 70000, outflow: 45000, balance: 163000 },
  { month: "Oct", inflow: 75000, outflow: 50000, balance: 188000 },
  { month: "Nov", inflow: 80000, outflow: 55000, balance: 213000 },
  { month: "Dec", inflow: 85000, outflow: 60000, balance: 238000 },
]

const profitForecast = [
  { quarter: "Q1 2023", actual: 42000 },
  { quarter: "Q2 2023", actual: 48000 },
  { quarter: "Q3 2023", actual: 53000 },
  { quarter: "Q4 2023", actual: 60000 },
  { quarter: "Q1 2024", forecast: 65000 },
  { quarter: "Q2 2024", forecast: 72000 },
  { quarter: "Q3 2024", forecast: 80000 },
  { quarter: "Q4 2024", forecast: 90000 },
]

export function FinanceForecasts() {
  const [isLoading, setIsLoading] = useState(true)
  const [forecastType, setForecastType] = useState("revenue")
  const [forecastPeriod, setForecastPeriod] = useState("12months")

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
            value={forecastType}
            onChange={(e) => setForecastType(e.target.value)}
          >
            <option value="revenue">Revenue Forecast</option>
            <option value="cashflow">Cash Flow Forecast</option>
            <option value="profit">Profit Forecast</option>
          </select>
          <select
            className="border rounded-md text-sm py-2 px-3"
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
          >
            <option value="12months">12 Months</option>
            <option value="24months">24 Months</option>
            <option value="5years">5 Years</option>
          </select>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Scenarios</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export Forecast</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Forecast (12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  dataKey="actual"
                  name="Actual Revenue"
                  stroke="#A200C1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="Forecasted Revenue"
                  stroke="#C080D3"
                  strokeWidth={2}
                  strokeDasharray="5 5"
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
            <CardTitle>Cash Flow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    dataKey="inflow"
                    name="Cash Inflow"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.2}
                    activeDot={{ r: 6 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="outflow"
                    name="Cash Outflow"
                    stroke="#F44336"
                    fill="#F44336"
                    fillOpacity={0.2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Cash Balance"
                    stroke="#A200C1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quarterly Profit Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="quarter" />
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
                  <Bar dataKey="actual" name="Actual Profit" fill="#A200C1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="forecast" name="Forecasted Profit" fill="#C080D3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forecast Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Revenue Growth</h3>
              <p className="text-sm text-gray-600">
                Monthly revenue is projected to grow at an average rate of 5% month-over-month for the next 12 months,
                based on historical performance and market expansion plans.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Expense Projections</h3>
              <p className="text-sm text-gray-600">
                Operating expenses are expected to increase at 3% month-over-month, reflecting planned hiring and
                marketing initiatives while maintaining operational efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Cash Flow Considerations</h3>
              <p className="text-sm text-gray-600">
                The cash flow forecast accounts for seasonal variations in sales, planned capital expenditures in Q3,
                and anticipated improvements in accounts receivable collection.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Profit Margin Targets</h3>
              <p className="text-sm text-gray-600">
                Gross profit margins are projected to improve from 50% to 52% by year-end due to economies of scale and
                improved supplier terms. Net profit margins are expected to reach 25% by Q4.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
