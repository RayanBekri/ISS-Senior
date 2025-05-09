"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthSelector } from "@/components/finance/month-selector"
import { YearSelector } from "@/components/finance/year-selector"

export function CashFlowGraphs() {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [selectedYear, setSelectedYear] = useState("2024")

  // Monthly Cash Flow Trends
  const monthlyCashFlowData = [
    { month: "January", inflow: 400, outflow: 600, netFlow: -200 },
    { month: "February", inflow: 600, outflow: 400, netFlow: 200 },
    { month: "March", inflow: 500, outflow: 300, netFlow: 200 },
    { month: "April", inflow: 700, outflow: 500, netFlow: 200 },
    { month: "May", inflow: 500, outflow: 400, netFlow: 100 },
    { month: "June", inflow: 600, outflow: 500, netFlow: 100 },
    { month: "July", inflow: 400, outflow: 600, netFlow: -200 },
  ]

  // Financing Cash Flow Activities
  const financingCashFlowData = {
    issuedEquity: 2.5,
    debtRepayment: 3.5,
    dividends: 24,
  }

  // Cash flow by activity (for bar charts)
  const financingActivitiesData = [
    { quarter: "Q1", debt: 0.8, equity: 0.5, dividends: 0.2, other: 0.1 },
    { quarter: "Q2", debt: 0.9, equity: 0.4, dividends: 0.3, other: 0.1 },
    { quarter: "Q3", debt: 0.7, equity: 0.6, dividends: 0.2, other: 0.1 },
    { quarter: "Q4", debt: 1.0, equity: 0.7, dividends: 0.4, other: 0.1 },
  ]

  // Investing Cash Flow Activities
  const investingCashFlowData = {
    capEx: 2.5,
    assetsPurchase: 3.5,
  }

  const investingActivitiesData = [
    { quarter: "Q1", capex: 0.6, acquisition: 0.4 },
    { quarter: "Q2", capex: 0.7, acquisition: 0.5 },
    { quarter: "Q3", capex: 0.5, acquisition: 0.4 },
    { quarter: "Q4", capex: 0.7, acquisition: 0.6 },
  ]

  // Operating Cash Flow Activities
  const operatingCashFlowData = {
    netIncome: 2.5,
    depreciation: 3.5,
    workingCapital: 24,
  }

  const operatingActivitiesData = [
    { quarter: "Q1", income: 0.8, depreciation: 0.3, working: 0.5, other: 0.1 },
    { quarter: "Q2", income: 0.6, depreciation: 0.3, working: 0.4, other: 0.1 },
    { quarter: "Q3", income: 0.2, depreciation: 0.3, working: 0.1, other: 0.1 },
    { quarter: "Q4", income: 0.9, depreciation: 0.3, working: 0.5, other: 0.2 },
  ]

  // Net Increase in Cash
  const netIncreaseData = {
    operating: 34,
    investing: 45,
    financing: 50.5,
  }

  const netIncreaseLineData = [
    { month: "Jan", operating: 28, investing: 38, financing: 45 },
    { month: "Feb", operating: 30, investing: 40, financing: 47 },
    { month: "Mar", operating: 35, investing: 42, financing: 48 },
    { month: "Apr", operating: 33, investing: 43, financing: 46 },
    { month: "May", operating: 32, investing: 41, financing: 47 },
    { month: "Jun", operating: 34, investing: 44, financing: 50 },
    { month: "Jul", operating: 36, investing: 45, financing: 52 },
    { month: "Aug", operating: 33, investing: 43, financing: 48 },
    { month: "Sep", operating: 31, investing: 42, financing: 47 },
    { month: "Oct", operating: 34, investing: 44, financing: 49 },
    { month: "Nov", operating: 36, investing: 46, financing: 51 },
    { month: "Dec", operating: 34, investing: 45, financing: 50 },
  ]

  // Net Increase in Cash per Month (Radar Chart)
  const netIncreaseMonthRadar = [
    { subject: "Operating", A: 80, B: 90, C: 70, fullMark: 100 },
    { subject: "Investing", A: 60, B: 85, C: 75, fullMark: 100 },
    { subject: "Financing", A: 70, B: 78, C: 85, fullMark: 100 },
    { subject: "Total Cash Flow", A: 75, B: 80, C: 65, fullMark: 100 },
  ]

  return (
    <div className="space-y-8">
      {/* Monthly Cash Flow Trends */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md">Monthly Cash Flow Trends</CardTitle>
            <YearSelector value={selectedYear} onChange={setSelectedYear} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyCashFlowData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" scale="band" axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={false}
                  domain={[-1000, 1000]}
                  ticks={[-1000, -800, -600, -400, -200, 0, 200, 400, 600, 800, 1000]}
                />
                <Tooltip formatter={(value) => `${value}`} />
                <Legend />
                <Bar yAxisId="left" dataKey="inflow" name="Positive Cash Flow (incoming)" fill="#90be6d" />
                <Bar yAxisId="left" dataKey="outflow" name="Negative Cash Flow (outgoing)" fill="#5390d9" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="netFlow"
                  name="Cumulative (monthly)"
                  stroke="#f94144"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financing, Net Increase in Cash */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financing Cash Flow Activities */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Financing Cash Flow Activities Distribution per Year</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">{financingCashFlowData.issuedEquity}k</div>
                <div className="text-xs text-gray-500 leading-tight">
                  Cash Flow for
                  <br />
                  Equity Movements
                </div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">{financingCashFlowData.debtRepayment}k</div>
                <div className="text-xs text-gray-500 leading-tight">
                  Cash Flow for
                  <br />
                  Debt Movements
                </div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">{financingCashFlowData.dividends}k</div>
                <div className="text-xs text-gray-500 leading-tight">
                  Cash Flow for
                  <br />
                  Dividends
                </div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financingActivitiesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="debt" name="Debt" fill="#9381ff" />
                  <Bar dataKey="equity" name="Equity" fill="#b8b8ff" />
                  <Bar dataKey="dividends" name="Dividends" fill="#f8f9fa" />
                  <Bar dataKey="other" name="Other" fill="#dee2e6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Net Increase in Cash per Year */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Net Increase in Cash per Year</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">{netIncreaseData.operating}k</div>
                <div className="text-xs text-gray-500">Operating Activities</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">{netIncreaseData.investing}k</div>
                <div className="text-xs text-gray-500">Investing Activities</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">{netIncreaseData.financing}k</div>
                <div className="text-xs text-gray-500">Financing Activities</div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={netIncreaseLineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[25, 55]} />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Line type="monotone" dataKey="operating" name="Operating" stroke="#7209b7" strokeWidth={2} />
                  <Line type="monotone" dataKey="investing" name="Investing" stroke="#f72585" strokeWidth={2} />
                  <Line type="monotone" dataKey="financing" name="Financing" stroke="#4361ee" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investing Cash Flow Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Investing Cash Flow Activities Distribution per Year</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">{investingCashFlowData.capEx}k</div>
                <div className="text-xs text-gray-500">
                  Cash Flow from
                  <br />
                  CapEx
                </div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">{investingCashFlowData.assetsPurchase}k</div>
                <div className="text-xs text-gray-500">
                  Cash Flow from
                  <br />
                  Assets Purchases
                </div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investingActivitiesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="capex" name="Capital Expenditures" fill="#ffb3c1">
                    <Cell fill="#ffb3c1" />
                    <Cell fill="#ffb3c1" />
                    <Cell fill="#ffb3c1" />
                    <Cell fill="#ffb3c1" />
                  </Bar>
                  <Bar dataKey="acquisition" name="Asset Acquisitions" fill="#c5baaf">
                    <Cell fill="#c5baaf" />
                    <Cell fill="#c5baaf" />
                    <Cell fill="#c5baaf" />
                    <Cell fill="#c5baaf" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Net Increase in Cash per Month - Radar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Net Increase in Cash per Month</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={netIncreaseMonthRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Financing" dataKey="A" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
                  <Radar name="Investing" dataKey="B" stroke="#82CA9D" fill="#82CA9D" fillOpacity={0.6} />
                  <Radar name="Operating" dataKey="C" stroke="#8884D8" fill="#8884D8" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operating Cash Flow Activities */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md">Operating Cash Flow Activities Distribution per Year</CardTitle>
            <YearSelector value={selectedYear} onChange={setSelectedYear} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <div className="text-pink-600 text-lg font-bold">{operatingCashFlowData.netIncome}k</div>
              <div className="text-xs text-gray-500">
                Cash Flow from
                <br />
                Net Income
              </div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-lg font-bold">{operatingCashFlowData.depreciation}k</div>
              <div className="text-xs text-gray-500">
                Cash Flow from
                <br />
                Depreciation
              </div>
            </div>
            <div className="text-center">
              <div className="text-purple-600 text-lg font-bold">{operatingCashFlowData.workingCapital}k</div>
              <div className="text-xs text-gray-500">
                Cash Flow from
                <br />
                Working Capital
              </div>
            </div>
          </div>

          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operatingActivitiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}k`} />
                <Legend />
                <Bar dataKey="income" name="Net Income" fill="#8884d8" />
                <Bar dataKey="depreciation" name="Depreciation" fill="#82ca9d" />
                <Bar dataKey="working" name="Working Capital" fill="#ffc658" />
                <Bar dataKey="other" name="Other" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
