"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useFinanceData } from "@/hooks/use-finance-data"

interface FinancePrintersProps {
  year?: string
  month?: string
}

export function FinancePrinters({ year = "2024", month = "All" }: FinancePrintersProps) {
  const [selectedYear, setSelectedYear] = useState(year)
  const [selectedMonth, setSelectedMonth] = useState(month)
  const { data, isLoading } = useFinanceData("printers")

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">DT 21,190</p>
                <p className="text-xs text-purple-500">Total Sales</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">DT 117,432</p>
                <p className="text-xs text-purple-500">Operating Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current Year</CardTitle>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Year <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">DT 18,300</p>
                <p className="text-xs text-purple-500">Gross Profit</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">DT 80,432</p>
                <p className="text-xs text-purple-500">Profit Before Interest Tax</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">DT 1,01,432</p>
                <p className="text-xs text-purple-500">Net Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productions per Year */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Productions per Year</CardTitle>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">2023, 2024, 2025</p>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Year <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-700">220</p>
              <p className="text-xs text-muted-foreground">2025</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">160</p>
              <p className="text-xs text-muted-foreground">2024</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-500">98</p>
              <p className="text-xs text-muted-foreground">2023</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ProductionsYearChart selectedYear={selectedYear} />
          </div>
        </CardContent>
      </Card>

      {/* Productions per Month */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Productions per Month</CardTitle>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">2025</p>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Year <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ProductionsMonthChart selectedYear={selectedYear} selectedMonth={selectedMonth} />
          </div>
        </CardContent>
      </Card>

      {/* Net Profit and Sum Profit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Net Profit from Production Per Year</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2023, 2024, 2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <NetProfitProductionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Sum of Profit from Production Per Year</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <SumProfitProductionChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Yearly Sum of Profit by Color Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Yearly Sum of Profit by Multicolor Productions</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <YearlyMulticolorProfitChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Yearly Sum of Profit by Single Color Productions</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <YearlySingleColorProfitChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials Consumption */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Most Consumed Materials Per Month</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">March 2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs mr-2">
                Material <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <MaterialsConsumptionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Materials Consumption Costs Per Year</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <MaterialsCostChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Colors Consumption */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Most Used Colors Per Month</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">March 2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs mr-2">
                Material <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ColorsConsumptionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Colors Consumption Costs Per Year</CardTitle>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Year <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ColorsCostChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Import chart components at the end to avoid circular dependencies
import {
  ProductionsYearChart,
  ProductionsMonthChart,
  NetProfitProductionChart,
  SumProfitProductionChart,
  YearlyMulticolorProfitChart,
  YearlySingleColorProfitChart,
  MaterialsConsumptionChart,
  MaterialsCostChart,
  ColorsConsumptionChart,
  ColorsCostChart,
} from "@/components/lazy-components"
