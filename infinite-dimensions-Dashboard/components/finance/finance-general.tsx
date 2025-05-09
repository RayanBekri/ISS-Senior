"use client"
import { YearSelector } from "@/components/finance/year-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SalesAndProfitChart, RevenueFrequencyChart } from "@/components/lazy-components"

export function FinanceGeneral() {
  return (
    <div className="space-y-16 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 21,190</span>
              <span className="text-sm font-medium text-purple-500">Total Sales</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 117,432</span>
              <span className="text-sm font-medium text-purple-500">Operating Profit</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Current Year</CardTitle>
            <YearSelector />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 18,300</span>
              <span className="text-sm font-medium text-purple-500">Gross Profit</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 80,432</span>
              <span className="text-sm font-medium text-purple-500">Profit Before Interest Tax</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 17,432</span>
              <span className="text-sm font-medium text-purple-500">EBITDA</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-semibold text-gray-900">DT 110,432</span>
              <span className="text-sm font-medium text-purple-500">Net Profit</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 pb-8 border-b">
        <Card className="overflow-visible">
          <CardHeader>
            <CardTitle>Sales and Profit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[450px]">
              <SalesAndProfitChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8">
        <Card className="overflow-visible">
          <CardHeader>
            <CardTitle>Revenue Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[450px]">
              <RevenueFrequencyChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
