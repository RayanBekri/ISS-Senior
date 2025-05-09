"use client"

import { useEffect, useState } from "react"

export function BalanceSheetTables() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        const response = await fetch("/api/finance/balance-sheet")
        // For now, we'll simulate the API response with local data
        const mockData = {
          summary: [
            {
              account: "Assets",
              "2022": 5045678,
              "2023": 5531381,
              "2024": 7531084,
            },
            {
              account: "Liabilities",
              "2022": 2623456,
              "2023": 2872972,
              "2024": 4280299,
            },
            {
              account: "Equity",
              "2022": 2422222,
              "2023": 2658409,
              "2024": 3250785,
            },
          ],
          detailed: [
            {
              account: "Assets",
              subaccount: "Current Assets",
              subclass: "Cash & Cash Equivalents",
              "2022": 2245000,
              "2023": 2450000,
              "2024": 3500000,
            },
            {
              account: "Assets",
              subaccount: "Current Assets",
              subclass: "Accounts Receivable",
              "2022": 495000,
              "2023": 540000,
              "2024": 650000,
            },
            {
              account: "Assets",
              subaccount: "Current Assets",
              subclass: "Inventory",
              "2022": 3200000,
              "2023": 3500000,
              "2024": 3800000,
            },
            {
              account: "Assets",
              subaccount: "Current Assets",
              subclass: "Prepaid Expenses",
              "2022": 115000,
              "2023": 125000,
              "2024": 145000,
            },
            {
              account: "Assets",
              subaccount: "Non-Current Assets",
              subclass: "Property, Plant & Equipment",
              "2022": 1150000,
              "2023": 1250000,
              "2024": 1375000,
            },
            {
              account: "Assets",
              subaccount: "Non-Current Assets",
              subclass: "Intangible Assets",
              "2022": 230000,
              "2023": 250000,
              "2024": 275000,
            },
            {
              account: "Liabilities",
              subaccount: "Current Liabilities",
              subclass: "Accounts Payable",
              "2022": 1150000,
              "2023": 1250000,
              "2024": 1870000,
            },
            {
              account: "Liabilities",
              subaccount: "Current Liabilities",
              subclass: "Short-term Loans",
              "2022": 690000,
              "2023": 750000,
              "2024": 850000,
            },
            {
              account: "Liabilities",
              subaccount: "Current Liabilities",
              subclass: "Accrued Expenses",
              "2022": 320000,
              "2023": 350000,
              "2024": 494852,
            },
            {
              account: "Liabilities",
              subaccount: "Non-Current Liabilities",
              subclass: "Long-term Debt",
              "2022": 463456,
              "2023": 522972,
              "2024": 1065447,
            },
            {
              account: "Equity",
              subaccount: "Shareholders' Equity",
              subclass: "Common Stock",
              "2022": 1000000,
              "2023": 1000000,
              "2024": 1000000,
            },
            {
              account: "Equity",
              subaccount: "Shareholders' Equity",
              subclass: "Retained Earnings",
              "2022": 1422222,
              "2023": 1658409,
              "2024": 2250785,
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
                  className={`border-b hover:bg-gray-50 ${row.account === "Equity" ? "bg-purple-50 font-medium" : ""}`}
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
                <th className="text-left py-3 px-4 font-medium text-gray-600">SUBCLASS</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2022</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2023</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">2024</th>
              </tr>
            </thead>
            <tbody>
              {data.detailed.map((row: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 ${row.account === "Equity" && row.subclass === "Total Equity" ? "bg-purple-50 font-medium" : ""}`}
                >
                  <td className="py-3 px-4">{row.account}</td>
                  <td className="py-3 px-4">{row.subaccount}</td>
                  <td className="py-3 px-4">{row.subclass}</td>
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
