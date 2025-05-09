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
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthSelector } from "@/components/finance/month-selector"
import { YearSelector } from "@/components/finance/year-selector"

export function BalanceSheetGraphs() {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [selectedYear, setSelectedYear] = useState("2024")

  // Monthly Equity data
  const monthlyEquityData = {
    assets: 4567,
    liabilities: 3167,
    equity: 1845,
  }

  // Liquidity Ratio data
  const liquidityRatioValue = 1.6
  const liqudityRatioMonthData = [
    { name: "Jan", value: 1.2 },
    { name: "Feb", value: 1.3 },
    { name: "Mar", value: 1.2 },
    { name: "Apr", value: 1.3 },
    { name: "May", value: 1.4 },
    { name: "Jun", value: 1.5 },
    { name: "Jul", value: 1.7 },
    { name: "Aug", value: 1.5 },
    { name: "Sep", value: 1.4 },
    { name: "Oct", value: 1.5 },
    { name: "Nov", value: 1.6 },
    { name: "Dec", value: 1.6 },
  ]

  // Monthly Asset Distribution
  const monthlyAssetsLiabilitiesData = {
    assets: 28,
    liabilities: 20,
    equity: 8,
  }

  // Yearly Asset Distribution
  const yearlyAssetsLiabilitiesData = {
    assets: 78,
    liabilities: 40,
    equity: 38,
  }

  const yearlyAssetsLiabilitiesLineData = [
    { month: "Jan", assets: 72, liabilities: 36, equity: 36 },
    { month: "Feb", assets: 73, liabilities: 37, equity: 36 },
    { month: "Mar", assets: 75, liabilities: 37.5, equity: 37.5 },
    { month: "Apr", assets: 78, liabilities: 40, equity: 38 },
    { month: "May", assets: 76, liabilities: 39, equity: 37 },
    { month: "Jun", assets: 78, liabilities: 40, equity: 38 },
    { month: "Jul", assets: 78, liabilities: 40, equity: 38 },
    { month: "Aug", assets: 79, liabilities: 41, equity: 38 },
    { month: "Sep", assets: 77, liabilities: 39, equity: 38 },
    { month: "Oct", assets: 79, liabilities: 39.5, equity: 39.5 },
    { month: "Nov", assets: 78, liabilities: 39, equity: 39 },
    { month: "Dec", assets: 78, liabilities: 40, equity: 38 },
  ]

  // Current Assets Distribution data
  const currentAssetsData = [
    { quarter: "Q1", cash: 24, inventory: 3.5, investments: 2.5, receivables: 0.5, prepaid: 250 },
    { quarter: "Q2", cash: 26, inventory: 3.8, investments: 2.6, receivables: 0.6, prepaid: 260 },
    { quarter: "Q3", cash: 25, inventory: 3.7, investments: 2.4, receivables: 0.7, prepaid: 240 },
    { quarter: "Q4", cash: 28, inventory: 4.0, investments: 2.8, receivables: 0.5, prepaid: 270 },
  ]

  // Current Liabilities Distribution data
  const currentLiabilitiesData = [
    { quarter: "Q1", accPayable: 24, notes: 3.5, interest: 2.5, taxes: 0.5, accrued: 250 },
    { quarter: "Q2", accPayable: 26, notes: 3.8, interest: 2.7, taxes: 0.6, accrued: 270 },
    { quarter: "Q3", accPayable: 25, notes: 3.6, interest: 2.6, taxes: 0.5, accrued: 260 },
    { quarter: "Q4", accPayable: 28, notes: 4.0, interest: 2.9, taxes: 0.7, accrued: 280 },
  ]

  // Non-Current Assets Distribution data
  const nonCurrentAssetsData = [
    { quarter: "Q1", fixedAssets: 24, intangible: 3.5, investments: 2.5, equipment: 250 },
    { quarter: "Q2", fixedAssets: 26, intangible: 3.8, investments: 2.7, equipment: 270 },
    { quarter: "Q3", fixedAssets: 25, intangible: 3.6, investments: 2.6, equipment: 260 },
    { quarter: "Q4", fixedAssets: 28, intangible: 4.0, investments: 2.9, equipment: 280 },
  ]

  // Non-Current Liabilities Distribution data
  const nonCurrentLiabilitiesData = [
    { quarter: "Q1", debentures: 3.5, loans: 2.5 },
    { quarter: "Q2", debentures: 3.8, loans: 2.7 },
    { quarter: "Q3", debentures: 3.6, loans: 2.6 },
    { quarter: "Q4", debentures: 4.0, loans: 2.9 },
  ]

  // Debt to Equity Ratio data
  const debtToEquityData = {
    totalLiabilities: 40,
    totalEquity: 38,
  }

  const debtToEquityLineData = [
    { month: "Jan", liabilities: 36, equity: 36 },
    { month: "Feb", liabilities: 37, equity: 36 },
    { month: "Mar", liabilities: 37.5, equity: 37.5 },
    { month: "Apr", liabilities: 40, equity: 38 },
    { month: "May", liabilities: 39, equity: 37 },
    { month: "Jun", liabilities: 40, equity: 38 },
    { month: "Jul", liabilities: 40, equity: 38 },
    { month: "Aug", liabilities: 41, equity: 38 },
    { month: "Sep", liabilities: 39, equity: 38 },
    { month: "Oct", liabilities: 39.5, equity: 39.5 },
    { month: "Nov", liabilities: 39, equity: 39 },
    { month: "Dec", liabilities: 40, equity: 38 },
  ]

  // Years comparison data for assets, liabilities and equity
  const yearlyComparisonData = {
    total: {
      assets: { current: 10, nonCurrent: 20 },
      liabilities: { current: 8, nonCurrent: 12 },
      equity: 10,
    },
  }

  return (
    <div className="space-y-8">
      {/* First row: Monthly Equity and Liquidity Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Equity */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Monthly Equity</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative">
                {/* Blue circle */}
                <div className="absolute -top-12 -left-14 w-40 h-40 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-medium">Net Assets</div>
                    <div className="text-2xl font-bold">{monthlyEquityData.assets.toLocaleString()}</div>
                    <div className="text-xs">This Month</div>
                  </div>
                </div>

                {/* Cyan circle */}
                <div className="absolute -top-2 left-16 w-32 h-32 bg-cyan-500 rounded-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-medium">Liabilities</div>
                    <div className="text-xl font-bold">{monthlyEquityData.liabilities.toLocaleString()}</div>
                  </div>
                </div>

                {/* Green circle */}
                <div className="absolute top-20 -left-6 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-xs font-medium">Equity</div>
                    <div className="text-lg font-bold">{monthlyEquityData.equity.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Ratio */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Monthly Liquidity Ratio</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Gauge chart */}
              <div className="w-full md:w-1/3">
                {/* Semi-circle gauge */}
                <div className="relative w-40 h-20 mx-auto">
                  <div className="absolute inset-0 bg-gray-200 rounded-t-full"></div>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-t-full"
                    style={{
                      clipPath: `polygon(0 0, ${(liquidityRatioValue / 2) * 100}% 0, ${(liquidityRatioValue / 2) * 100}% 100%, 0 100%)`,
                    }}
                  ></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-black"></div>
                  {/* Needle */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom rotate-[60deg]"
                    style={{ transform: `translateX(-50%) rotate(${(liquidityRatioValue / 2) * 180}deg)` }}
                  >
                    <div className="w-1 h-16 bg-black"></div>
                    <div className="w-3 h-3 rounded-full bg-black -mt-1 ml-[-3.5px]"></div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold">{liquidityRatioValue}</span>
                  <p className="text-sm text-gray-500">Current</p>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex justify-between w-full">
                      <span>Good Liquidity</span>
                      <span>Above 1.5</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="flex justify-between w-full">
                      <span>Average Liquidity</span>
                      <span>1.0 - 1.5</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex justify-between w-full">
                      <span>Low Liquidity</span>
                      <span>Below 1.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line chart */}
              <div className="w-full md:w-2/3 h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liqudityRatioMonthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 2]} />
                    <Tooltip formatter={(value) => value} />
                    <Line type="monotone" dataKey="value" stroke="#a4133c" strokeWidth={2} dot={{ r: 3 }} />
                    {/* Reference lines */}
                    <Line yAxisId="0" y={1.0} stroke="#f9c74f" strokeWidth={1} strokeDasharray="3 3" />
                    <Line yAxisId="0" y={1.5} stroke="#90be6d" strokeWidth={1} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row: Assets, Liabilities, and Equity Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Assets, Liabilities, and Equity Per Month Distribution</CardTitle>
              <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-2xl font-bold">{monthlyAssetsLiabilitiesData.assets}k</div>
                <div className="text-sm text-gray-500">Total Assets</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-2xl font-bold">{monthlyAssetsLiabilitiesData.liabilities}k</div>
                <div className="text-sm text-gray-500">Total Liabilities</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-2xl font-bold">{monthlyAssetsLiabilitiesData.equity}k</div>
                <div className="text-sm text-gray-500">Total Equity</div>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="horizontal" barSize={40} barGap={4} data={[monthlyAssetsLiabilitiesData]}>
                  <XAxis type="category" dataKey="name" hide />
                  <YAxis type="number" />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar name="Current Assets" stackId="assets" dataKey="assets" fill="#a376f1">
                    <Cell fill="#d5c8f9" />
                    <Cell fill="#a376f1" />
                  </Bar>
                  <Bar name="Current Liabilities" stackId="liabilities" dataKey="liabilities" fill="#de63a7">
                    <Cell fill="#f6b6d8" />
                    <Cell fill="#de63a7" />
                  </Bar>
                  <Bar name="Total Equity" stackId="equity" dataKey="equity" fill="#7b8af9" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <div>Total Assets</div>
              <div>Total Liabilities</div>
              <div>Total Equity</div>
            </div>
          </CardContent>
        </Card>

        {/* Annual Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Assets, Liabilities, and Equity Monthly Distribution</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-2xl font-bold">{yearlyAssetsLiabilitiesData.assets}k</div>
                <div className="text-sm text-gray-500">Total Assets</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-2xl font-bold">{yearlyAssetsLiabilitiesData.liabilities}k</div>
                <div className="text-sm text-gray-500">Total Liabilities</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-2xl font-bold">{yearlyAssetsLiabilitiesData.equity}k</div>
                <div className="text-sm text-gray-500">Total Equity</div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyAssetsLiabilitiesLineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[30, 85]} />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Line type="monotone" dataKey="assets" name="Assets" stroke="#7b8af9" strokeWidth={2} />
                  <Line type="monotone" dataKey="liabilities" name="Liabilities" stroke="#a376f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="equity" name="Equity" stroke="#de63a7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third row: Distribution of Current Assets and Liabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution of Current Assets */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Distribution of Current Assets Per Year (Quarterly)</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">24k</div>
                <div className="text-xs text-gray-500">Cash & Bank</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">3.5k</div>
                <div className="text-xs text-gray-500">Inventory</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">2.5k</div>
                <div className="text-xs text-gray-500">ST Investments</div>
              </div>
              <div className="text-center">
                <div className="text-teal-600 text-lg font-bold">0.5k</div>
                <div className="text-xs text-gray-500">Receivables</div>
              </div>
              <div className="text-center">
                <div className="text-amber-600 text-lg font-bold">250k</div>
                <div className="text-xs text-gray-500">Prepaid Exp.</div>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentAssetsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="cash" name="Cash & Bank" fill="#7b68ee" />
                  <Bar dataKey="inventory" name="Inventory" fill="#ff69b4" />
                  <Bar dataKey="investments" name="ST Investments" fill="#1e90ff" />
                  <Bar dataKey="receivables" name="Receivables" fill="#20b2aa" />
                  <Bar dataKey="prepaid" name="Prepaid Exp." fill="#ffa500" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution of Current Liabilities */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Distribution of Current Liabilities Per Year (Quarterly)</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">24k</div>
                <div className="text-xs text-gray-500">Acc. Payable</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">3.5k</div>
                <div className="text-xs text-gray-500">Notes Payable</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">2.5k</div>
                <div className="text-xs text-gray-500">Interest Payable</div>
              </div>
              <div className="text-center">
                <div className="text-teal-600 text-lg font-bold">0.5k</div>
                <div className="text-xs text-gray-500">Taxes Payable</div>
              </div>
              <div className="text-center">
                <div className="text-amber-600 text-lg font-bold">250k</div>
                <div className="text-xs text-gray-500">Accrued Exp.</div>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentLiabilitiesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="accPayable" name="Acc. Payable" fill="#7b68ee" />
                  <Bar dataKey="notes" name="Notes Payable" fill="#ff69b4" />
                  <Bar dataKey="interest" name="Interest Payable" fill="#1e90ff" />
                  <Bar dataKey="taxes" name="Taxes Payable" fill="#20b2aa" />
                  <Bar dataKey="accrued" name="Accrued Exp." fill="#ffa500" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fourth row: Distribution of Non-Current Assets and Liabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution of Non-Current Assets */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Distribution of Non-Current Assets Per Year (Quarterly)</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">24k</div>
                <div className="text-xs text-gray-500">Fixed Real Estate</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">3.5k</div>
                <div className="text-xs text-gray-500">Intangible Assets</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold">2.5k</div>
                <div className="text-xs text-gray-500">LT Investments</div>
              </div>
              <div className="text-center">
                <div className="text-teal-600 text-lg font-bold">250k</div>
                <div className="text-xs text-gray-500">Equipment</div>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nonCurrentAssetsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="fixedAssets" name="Fixed Real Estate" fill="#ffb6c1" />
                  <Bar dataKey="intangible" name="Intangible Assets" fill="#ffb6c1" />
                  <Bar dataKey="investments" name="LT Investments" fill="#ffb6c1" />
                  <Bar dataKey="equipment" name="Equipment" fill="#ffb6c1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution of Non-Current Liabilities */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Distribution of Non-Current Liabilities Per Year (Quarterly)</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold">3.5k</div>
                <div className="text-xs text-gray-500">Debentures</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-lg font-bold">2.5k</div>
                <div className="text-xs text-gray-500">LT Loans</div>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nonCurrentLiabilitiesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Bar dataKey="debentures" name="Debentures" fill="#E0BBE4" />
                  <Bar dataKey="loans" name="LT Loans" fill="#E0BBE4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fifth row: Yearly Distribution and Debt-to-Equity Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yearly Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Assets, Liabilities, and Equity Yearly Distribution</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            {/* Horizontal stacked bar chart */}
            <div className="h-[250px] flex flex-col items-center">
              {/* Total Assets bar */}
              <div className="w-full mb-8">
                <div className="text-sm text-gray-600 mb-1">Total Assets</div>
                <div className="flex h-12 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="bg-blue-500 flex items-center justify-center text-white text-xs"
                    style={{ width: "30%" }}
                  >
                    Non-Current
                  </div>
                  <div
                    className="bg-blue-300 flex items-center justify-center text-white text-xs"
                    style={{ width: "70%" }}
                  >
                    Current
                  </div>
                </div>
              </div>

              {/* Total Liabilities bar */}
              <div className="w-full mb-8">
                <div className="text-sm text-gray-600 mb-1">Total Liabilities</div>
                <div className="flex h-12 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="bg-purple-500 flex items-center justify-center text-white text-xs"
                    style={{ width: "60%" }}
                  >
                    Non-Current
                  </div>
                  <div
                    className="bg-purple-300 flex items-center justify-center text-white text-xs"
                    style={{ width: "40%" }}
                  >
                    Current
                  </div>
                </div>
              </div>

              {/* Total Equity bar */}
              <div className="w-full">
                <div className="text-sm text-gray-600 mb-1">Total Equity</div>
                <div className="flex h-12 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="bg-pink-500 flex items-center justify-center text-white text-xs"
                    style={{ width: "100%" }}
                  >
                    30.1
                  </div>
                </div>
              </div>

              <div className="w-full mt-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <div>0</div>
                  <div>5</div>
                  <div>10</div>
                  <div>15</div>
                  <div>20</div>
                  <div>25</div>
                  <div>30</div>
                </div>
              </div>

              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-blue-500 mr-1 rounded-sm"></span>
                  <span>Year 2023</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-pink-500 mr-1 rounded-sm"></span>
                  <span>Year 2024</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debt-to-Equity Ratio */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Debt-to-Equity Ratio Per Year</CardTitle>
              <YearSelector value={selectedYear} onChange={setSelectedYear} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-purple-600 text-2xl font-bold">{debtToEquityData.totalLiabilities}k</div>
                <div className="text-sm text-gray-500">Total Liabilities</div>
              </div>
              <div className="text-center">
                <div className="text-pink-600 text-2xl font-bold">{debtToEquityData.totalEquity}k</div>
                <div className="text-sm text-gray-500">Total Equity</div>
              </div>
            </div>

            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={debtToEquityLineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[30, 45]} />
                  <Tooltip formatter={(value) => `${value}k`} />
                  <Legend />
                  <Line type="monotone" dataKey="liabilities" name="Liabilities" stroke="#a376f1" strokeWidth={2} />
                  <Line type="monotone" dataKey stroke="#a376f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="equity" name="Equity" stroke="#de63a7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
