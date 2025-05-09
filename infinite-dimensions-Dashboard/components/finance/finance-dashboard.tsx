"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinanceGeneral } from "./finance-general"
import { FinanceSales } from "./finance-sales"
import { FinanceShop } from "./finance-shop"
import { FinancePrinters } from "./finance-printers"
import { FinanceCustomers } from "./finance-customers"
import { FinanceOverview } from "./finance-overview"
import { YearSelector } from "./year-selector"
import { MonthSelector } from "./month-selector"
import { FinanceStatements } from "./finance-statements"
import { useMobile } from "@/hooks/use-mobile"

export function FinanceDashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2023)
  const [selectedMonth, setSelectedMonth] = useState<number>(5) // May
  const isMobile = useMobile()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Finance</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
        </div>
      </div>

      <FinanceOverview selectedYear={selectedYear} selectedMonth={selectedMonth} />

      <Card className="w-full">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Financial Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto px-6 bg-transparent">
              <TabsTrigger
                value="general"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4"
              >
                Sales
              </TabsTrigger>
              <TabsTrigger
                value="shop"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4"
              >
                Shop
              </TabsTrigger>
              <TabsTrigger
                value="printers"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4"
              >
                Printers
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4"
              >
                Customers
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="general" className="m-0">
                <FinanceGeneral selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </TabsContent>
              <TabsContent value="sales" className="m-0">
                <FinanceSales selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </TabsContent>
              <TabsContent value="shop" className="m-0">
                <FinanceShop selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </TabsContent>
              <TabsContent value="printers" className="m-0">
                <FinancePrinters selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </TabsContent>
              <TabsContent value="customers" className="m-0">
                <FinanceCustomers selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <FinanceStatements selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </div>
  )
}
