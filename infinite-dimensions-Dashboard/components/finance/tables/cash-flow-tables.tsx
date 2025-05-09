"use client"

import { useEffect, useState } from "react"

export function CashFlowTables() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        const response = await fetch("/api/finance/cash-flow")
        // For now, we'll simulate the API response with local data
        const mockData = {
          summary: [
            {
              account: "Operating Activities",
              "2022": 1465035,
              "2023": 1605039,
              "2024": 2569545,
            },
            {
              account: "Investing Activities",
              "2022": -850438,
              "2023": -932438,
              "2024": -1065467,
            },
            {
              account: "Financing Activities",
              "2022": -14517,
              "2023": -15917,
              "2024": -21731,
            },
            {
              account: "Net Increase in Cash",
              "2022": 33277,
              "2023": 36477,
              "2024": 47152,
            },
            {
              account: "Cash at Beginning of Period",
              "2022": 2211723,
              "2023": 2245000,
              "2024": 2450000,
            },
            {
              account: "Cash at End of Period",
              "2022": 2245000,
              "2023": 2450000,
              "2024": 3500000,
            },
          ],
          detailed: [
            {
              account: "Operating Activities",
              subaccount: "Cash Received from Customers",
              "2022": 3245780,
              "2023": 3574625,
              "2024": 4297845,
            },
            {
              account: "Operating Activities",
              subaccount: "Cash Paid to Suppliers",
              "2022": -1789520,
              "2023": -1956756,
              "2024": -1729239,
            },
            {
              account: "Operating Activities",
              subaccount: "Cash Paid to Employees",
              "2022": -1145352,
              "2023": -1254352,
              "2024": -1354352,
            },
            {
              account: "Operating Activities",
              subaccount: "Cash Paid for Operating Expenses",
              "2022": -495098,
              "2023": -543098,
              "2024": -643098,
            },
            {
              account: "Operating Activities",
              subaccount: "Interest Paid",
              "2022": -18760,
              "2023": -20316,
              "2024": -36000,
            },
            {
              account: "Operating Activities",
              subaccount: "Income Taxes Paid",
              "2022": -148352,
              "2023": -162214,
              "2024": -259986,
            },
            {
              account: "Operating Activities",
              subaccount: "Other Operating Cash Flows",
              "2022": 32450,
              "2023": 35316,
              "2024": 42798,
            },
            {
              account: "Investing Activities",
              subaccount: "Purchase of Property, Plant & Equipment",
              "2022": -185000,
              "2023": -205000,
              "2024": -225000,
            },
            {
              account: "Investing Activities",
              subaccount: "Purchase of Investments",
              "2022": -690438,
              "2023": -752438,
              "2024": -865467,
            },
            {
              account: "Investing Activities",
              subaccount: "Proceeds from Sale of Equipment",
              "2022": 25000,
              "2023": 25000,
              "2024": 25000,
            },
            {
              account: "Financing Activities",
              subaccount: "Proceeds from Issuance of Debt",
              "2022": 35000,
              "2023": 35000,
              "2024": 35000,
            },
            {
              account: "Financing Activities",
              subaccount: "Repayment of Debt",
              "2022": -45000,
              "2023": -45000,
              "2024": -45000,
            },
            {
              account: "Financing Activities",
              subaccount: "Dividends Paid",
              "2022": -22500,
              "2023": -25000,
              "2024": -30000,
            },
            {
              account: "Financing Activities",
              subaccount: "Interest Paid",
              "2022": -13500,
              "2023": -15000,
              "2024": -18000,
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
        <h3 className="text-lg font-medium mb-4">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="text-sm font-medium mb-1">DT {data.summary[0]["2023"].toLocaleString()}</div>
            <div className="text-xs text-purple-500">Operating Cash Flow</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">DT {Math.abs(data.summary[1]["2023"]).toLocaleString()}</div>
            <div className="text-xs text-purple-500">Investing Cash Flow</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">DT {Math.abs(data.summary[2]["2023"]).toLocaleString()}</div>
            <div className="text-xs text-purple-500">Financing Cash Flow</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium mb-1">DT {data.summary[3]["2023"].toLocaleString()}</div>
            <div className="text-xs text-purple-500">Net Increase in Cash</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">DT {data.summary[5]["2023"].toLocaleString()}</div>
            <div className="text-xs text-purple-500">Cash at End of Period</div>
          </div>
        </div>
      </div>

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
                  className={`border-b hover:bg-gray-50 ${row.account === "Cash at End of Period" ? "bg-purple-50 font-medium" : ""}`}
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
