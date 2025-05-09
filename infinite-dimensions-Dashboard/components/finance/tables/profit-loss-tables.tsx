"use client"

import { useEffect, useState } from "react"

export function ProfitLossTables() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        const response = await fetch("/api/finance/profit-loss")
        // For now, we'll simulate the API response with local data
        const mockData = {
          summary: [
            {
              account: "Revenue",
              "2022": 3245780,
              "2023": 3574625,
              "2024": 5801845,
            },
            {
              account: "Cost of Goods Sold",
              "2022": -1789520,
              "2023": -1956756,
              "2024": -1729239,
            },
            {
              account: "Gross Profit",
              "2022": 1456260,
              "2023": 1617869,
              "2024": 4072606,
            },
            {
              account: "Operating Expenses",
              "2022": -876540,
              "2023": -984013,
              "2024": -3039459,
            },
            {
              account: "Operating Income",
              "2022": 579720,
              "2023": 633856,
              "2024": 1033147,
            },
            {
              account: "Other Income",
              "2022": 32450,
              "2023": 35316,
              "2024": 42798,
            },
            {
              account: "Other Expenses",
              "2022": -18760,
              "2023": -20316,
              "2024": -36000,
            },
            {
              account: "Net Income Before Taxes",
              "2022": 593410,
              "2023": 648856,
              "2024": 1039945,
            },
            {
              account: "Income Tax Expense",
              "2022": -148352,
              "2023": -162214,
              "2024": -259986,
            },
            {
              account: "Net Income",
              "2022": 445058,
              "2023": 486642,
              "2024": 779959,
            },
          ],
          detailed: [
            {
              account: "Revenue",
              subaccount: "Product Sales",
              "2022": 2845780,
              "2023": 3124625,
              "2024": 5101845,
            },
            {
              account: "Revenue",
              subaccount: "Service Revenue",
              "2022": 400000,
              "2023": 450000,
              "2024": 700000,
            },
            {
              account: "Cost of Goods Sold",
              subaccount: "Direct Materials",
              "2022": -1089520,
              "2023": -1156756,
              "2024": -929239,
            },
            {
              account: "Cost of Goods Sold",
              subaccount: "Direct Labor",
              "2022": -700000,
              "2023": -800000,
              "2024": -800000,
            },
            {
              account: "Operating Expenses",
              subaccount: "Sales & Marketing",
              "2022": -376540,
              "2023": -414013,
              "2024": -1539459,
            },
            {
              account: "Operating Expenses",
              subaccount: "Research & Development",
              "2022": -200000,
              "2023": -220000,
              "2024": -700000,
            },
            {
              account: "Operating Expenses",
              subaccount: "General & Administrative",
              "2022": -300000,
              "2023": -350000,
              "2024": -800000,
            },
            {
              account: "Other Income",
              subaccount: "Interest Income",
              "2022": 12450,
              "2023": 15316,
              "2024": 22798,
            },
            {
              account: "Other Income",
              subaccount: "Investment Income",
              "2022": 20000,
              "2023": 20000,
              "2024": 20000,
            },
            {
              account: "Other Expenses",
              subaccount: "Interest Expense",
              "2022": -18760,
              "2023": -20316,
              "2024": -36000,
            },
          ],
        }
        setData(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/3"></div>
        <div className="h-[400px] bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Summarized Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">ACCOUNT</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2022</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2023</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2024</th>
              </tr>
            </thead>
            <tbody>
              {data.summary.map((row: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 ${row.account === "Net Income" ? "bg-purple-50 font-medium" : ""}`}
                >
                  <td className="py-3 px-4">{row.account}</td>
                  <td className="py-3 px-4 text-right">{row["2022"].toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{row["2023"].toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{row["2024"].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Detailed Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">ACCOUNT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">SUBACCOUNT</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2022</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2023</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2024</th>
              </tr>
            </thead>
            <tbody>
              {data.detailed.map((row: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{row.account}</td>
                  <td className="py-3 px-4">{row.subaccount}</td>
                  <td className="py-3 px-4 text-right">{row["2022"].toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{row["2023"].toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{row["2024"].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
