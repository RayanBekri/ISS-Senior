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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthSelector } from "@/components/finance/month-selector"
import { YearSelector } from "@/components/finance/year-selector"

export function ProfitLossGraphs() {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [selectedYear, setSelectedYear] = useState("2024")

  // Monthly Charts Data
  const monthlyProfitData = [
    { name: "Week1", gross: 4000, ebitda: 3500, operating: 2500, pbt: 500, net: 250 },
    { name: "Week2", gross: 5000, ebitda: 4200, operating: 3100, pbt: 600, net: 300 },
    { name: "Week3", gross: 4500, ebitda: 3800, operating: 2800, pbt: 450, net: 225 },
    { name: "Week4", gross: 5500, ebitda: 4500, operating: 3300, pbt: 700, net: 350 },
  ]

  const revenueData = [
    { name: "Product A", value: 67.8, color: "#4361EE" },
    { name: "Product B", value: 12.2, color: "#FFB100" },
    { name: "Product C", value: 20.0, color: "#F72585" },
  ]

  const expensesData = [
    { name: "Marketing", value: 4567, color: "#4361EE" },
    { name: "Operations", value: 3167, color: "#00B4D8" },
    { name: "Admin", value: 1845, color: "#4CAF50" },
  ]

  const nonOperatingIncomeData = [
    { name: "Interest Income", value: 1200 },
    { name: "Gains/Loss on Sales", value: 1800 },
    { name: "Exchange Gain/Loss", value: 2200 },
    { name: "Dividend Income", value: 2400 },
    { name: "Total Non-Operating Income", value: 2800 },
  ]

  // Yearly Charts Data
  const yearlyExpensesData = [
    { name: "Administration", value: 632349, color: "#4361EE" },
    { name: "Depreciation", value: 387598, color: "#4CAF50" },
    { name: "Interest Expense", value: 15840, color: "#FFB100" },
    { name: "Marketing", value: 343098, color: "#F44336" },
    { name: "Sales & Distribution", value: 260004, color: "#A200C1" },
    { name: "Taxation", value: 137582, color: "#F72585" },
    { name: "Amortization", value: 15098, color: "#6C63FF" },
  ]

  const yearlyProfitData = [
    { month: "Jan", grossProfit: 18000, operatingProfit: 13000, netProfit: 9000 },
    { month: "Feb", grossProfit: 22000, operatingProfit: 16000, netProfit: 11000 },
    { month: "Mar", grossProfit: 25000, operatingProfit: 19000, netProfit: 13000 },
    { month: "Apr", grossProfit: 29000, operatingProfit: 22000, netProfit: 15000 },
    { month: "May", grossProfit: 26000, operatingProfit: 20000, netProfit: 14000 },
    { month: "Jun", grossProfit: 30000, operatingProfit: 23000, netProfit: 16000 },
    { month: "Jul", grossProfit: 32000, operatingProfit: 24000, netProfit: 17000 },
    { month: "Aug", grossProfit: 34000, operatingProfit: 26000, netProfit: 18000 },
    { month: "Sep", grossProfit: 31000, operatingProfit: 23000, netProfit: 16000 },
    { month: "Oct", grossProfit: 35000, operatingProfit: 28000, netProfit: 19000 },
    { month: "Nov", grossProfit: 38000, operatingProfit: 30000, netProfit: 21000 },
    { month: "Dec", grossProfit: 40000, operatingProfit: 32000, netProfit: 22000 },
  ]

  const yearlyNonOperatingIncomeData = [
    { name: "Interest Income", value: 12000 },
    { name: "Gains/Loss on Sales", value: 18000 },
    { name: "Exchange Gain/Loss", value: 22000 },
    { name: "Dividend Income", value: 24000 },
    { name: "Total Non-Operating Income", value: 28000 },
  ]

  const yearlyRevenueData = [
    { name: "Product A", value: 78.5, color: "#4361EE" },
    { name: "Product B", value: 14.3, color: "#FFB100" },
    { name: "Product C", value: 7.2, color: "#F72585" },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium mb-2">Monthly Charts</h2>

      {/* First row: P&L Reports, Revenue, Monthly Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profit & Loss Reports */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Profit & Loss Reports</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            {/* KPI summary */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-purple-50 px-3 py-1 rounded-md">
                <div className="text-purple-600 text-xs">Gross Profit</div>
                <div className="text-lg font-bold">24k</div>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-md">
                <div className="text-blue-600 text-xs">EBITDA</div>
                <div className="text-lg font-bold">3.5k</div>
              </div>
              <div className="bg-pink-50 px-3 py-1 rounded-md">
                <div className="text-pink-600 text-xs">Operating Profit</div>
                <div className="text-lg font-bold">2.5k</div>
              </div>
              <div className="bg-yellow-50 px-3 py-1 rounded-md">
                <div className="text-yellow-600 text-xs">PBT</div>
                <div className="text-lg font-bold">0.5k</div>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-md">
                <div className="text-green-600 text-xs">Net Profit</div>
                <div className="text-lg font-bold">250</div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProfitData} margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `DT ${value}`} />
                  <Bar dataKey="gross" name="Gross" fill="#A200C1" />
                  <Bar dataKey="ebitda" name="EBITDA" fill="#4361EE" />
                  <Bar dataKey="operating" name="Operating" fill="#F72585" />
                  <Bar dataKey="pbt" name="PBT" fill="#FFB100" />
                  <Bar dataKey="net" name="Net" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Revenue</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue details */}
            <div className="mt-3">
              <div className="flex gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-[#4361EE] mt-1"></span>
                <div className="flex justify-between w-full">
                  <span>Sales</span>
                  <span className="font-medium">97,982.07</span>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-[#FFB100] mt-1"></span>
                <div className="flex justify-between w-full">
                  <span>Cost of Sales</span>
                  <span className="font-medium">53,230.57</span>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-[#F72585] mt-1"></span>
                <div className="flex justify-between w-full">
                  <span>Gross Profit</span>
                  <span className="font-medium">44,872.07</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Monthly Expenses</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {expensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `DT ${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row: Non-Operating Income */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Non-Operating Income */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Non-Operating Income</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={nonOperatingIncomeData}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => `DT ${value}`} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-medium mb-2 mt-8">Yearly Charts</h2>

      {/* Third row: Yearly Operating Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yearly Operating Expenses - Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Yearly Operating Expenses, Interest & Tax</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <table className="w-full text-sm">
                <tbody>
                  {yearlyExpensesData.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1 flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </td>
                      <td className="py-1 text-right">{item.value.toLocaleString()} DT</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={yearlyExpensesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={1}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {yearlyExpensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} DT`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Operating Expenses - Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Yearly Operating Expenses, Interest & Tax</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyExpensesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} DT`} />
                  <Bar dataKey="value" name="Amount">
                    {yearlyExpensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fourth row: Profit & Loss Reports (Line Chart) and Yearly Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profit & Loss Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Profit & Loss Reports</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            {/* KPI summary */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-purple-50 px-3 py-1 rounded-md">
                <div className="text-purple-600 text-xs">Gross Profit</div>
                <div className="text-lg font-bold">24k</div>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-md">
                <div className="text-blue-600 text-xs">EBITDA</div>
                <div className="text-lg font-bold">3.5k</div>
              </div>
              <div className="bg-pink-50 px-3 py-1 rounded-md">
                <div className="text-pink-600 text-xs">Operating Profit</div>
                <div className="text-lg font-bold">2.5k</div>
              </div>
              <div className="bg-yellow-50 px-3 py-1 rounded-md">
                <div className="text-yellow-600 text-xs">PBT</div>
                <div className="text-lg font-bold">0.5k</div>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-md">
                <div className="text-green-600 text-xs">Net Profit</div>
                <div className="text-lg font-bold">250k</div>
              </div>
            </div>

            {/* Line chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyProfitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `DT ${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="grossProfit" name="Gross Profit" stroke="#A200C1" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="operatingProfit"
                    name="Operating Profit"
                    stroke="#F72585"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="netProfit" name="Net Profit" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Yearly Revenue</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-purple-600 text-2xl font-bold">34k</div>
                  <div className="text-sm text-gray-500">Sales</div>
                </div>
                <div>
                  <div className="text-blue-600 text-2xl font-bold">20k</div>
                  <div className="text-sm text-gray-500">COGS</div>
                </div>
                <div>
                  <div className="text-green-600 text-2xl font-bold">8k</div>
                  <div className="text-sm text-gray-500">Gross Profit</div>
                </div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={yearlyRevenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {yearlyRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#4361EE]"></div>
                <span>Sales</span>
                <span className="ml-auto font-medium">297,982.07</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#FFB100]"></div>
                <span>Cost of Sales</span>
                <span className="ml-auto font-medium">153,230.57</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#F72585]"></div>
                <span>Gross Profit</span>
                <span className="ml-auto font-medium">124,872.07</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fifth row: Non-Operating Income (Yearly) and Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Yearly Non-Operating Income */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Non-Operating Income</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={yearlyNonOperatingIncomeData}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => `DT ${value}`} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Year 2023</span>
              <div className="w-2 h-2 rounded-full bg-purple-500 ml-4"></div>
              <span>Year 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
