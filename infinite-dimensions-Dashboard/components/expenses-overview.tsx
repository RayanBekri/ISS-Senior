"use client"

import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export function ExpensesOverview() {
  const [timeframe, setTimeframe] = useState("6 Month")

  const handleTimeframeChange = () => {
    const options = ["1 Month", "3 Month", "6 Month", "1 Year"]
    const currentIndex = options.indexOf(timeframe)
    const nextIndex = (currentIndex + 1) % options.length
    setTimeframe(options[nextIndex])
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">All Expenses</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleTimeframeChange}>
          <span>{timeframe}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <p className="text-sm text-muted-foreground">Daily</p>
            <p className="text-xl font-bold">$475</p>
          </div>
          <div className="transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <p className="text-sm text-muted-foreground">Weekly</p>
            <p className="text-xl font-bold">$3,327</p>
          </div>
          <div className="transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <p className="text-sm text-muted-foreground">Monthly</p>
            <p className="text-xl font-bold">$12,131</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-48 h-48 relative group">
            <div className="w-full h-full rounded-full bg-gray-100 absolute"></div>
            <div
              className="w-full h-full rounded-full absolute transition-all group-hover:opacity-90"
              style={{
                background: "conic-gradient(#A200C1 0% 45%, #d1d5db 45% 65%, #C080D3 65% 85%, #e9d5ff 85% 100%)",
                clipPath: "circle(50% at center)",
              }}
            ></div>
            <div className="w-24 h-24 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="text-sm font-medium">
                Expense
                <br />
                Breakdown
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6">
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand"></div>
            <span className="text-sm">Shopping</span>
          </div>
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            <span className="text-sm">Supply Inventory</span>
          </div>
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-gray-800"></div>
            <span className="text-sm">Items Inventory</span>
          </div>
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand-light"></div>
            <span className="text-sm">Other Expenses</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/finance" className="flex items-center gap-1">
              View expense details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
