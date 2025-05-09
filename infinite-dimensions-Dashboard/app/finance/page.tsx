"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FinanceGeneral,
  FinanceSales,
  FinanceShop,
  FinancePrinters,
  FinanceCustomers,
  FinanceStatementsUI,
} from "@/components/lazy-components"

// Loading skeleton component is no longer needed as it's handled by the lazy components

export default function Finance() {
  const [activeTab, setActiveTab] = useState("general")

  // Prefetch data for other tabs when idle
  useState(() => {
    if (typeof window !== "undefined") {
      // Use requestIdleCallback to prefetch data when browser is idle
      const prefetchData = () => {
        const prefetchUrl = "/data/finance-dashboard-data.json"

        // Create a link element for prefetching
        const link = document.createElement("link")
        link.rel = "prefetch"
        link.href = prefetchUrl
        link.as = "fetch"
        link.crossOrigin = "anonymous"

        document.head.appendChild(link)
      }

      if ("requestIdleCallback" in window) {
        // @ts-ignore
        window.requestIdleCallback(prefetchData)
      } else {
        setTimeout(prefetchData, 2000) // Fallback for browsers that don't support requestIdleCallback
      }
    }
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Finance</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="text-gray-500">Dashboard</span>
            <span className="mx-1 text-gray-500">›</span>
            <span className="text-purple-500">Finance</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 p-1 mb-6 grid grid-cols-5 h-auto w-fit">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 py-2 px-4"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 py-2 px-4"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="shop"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 py-2 px-4"
          >
            Shop
          </TabsTrigger>
          <TabsTrigger
            value="printers"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 py-2 px-4"
          >
            Printers
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 py-2 px-4"
          >
            Customers
          </TabsTrigger>
        </TabsList>

        {activeTab === "general" && <FinanceGeneral />}
        {activeTab === "sales" && <FinanceSales />}
        {activeTab === "shop" && <FinanceShop year="2024" month="All" />}
        {activeTab === "printers" && <FinancePrinters year="2024" month="All" />}
        {activeTab === "customers" && <FinanceCustomers year="2024" month="All" />}
        {activeTab === "statements" && <FinanceStatementsUI />}
      </Tabs>
    </div>
  )
}
