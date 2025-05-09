"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OrderSummaryChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("5m")

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
          <CardDescription>Order trends over time</CardDescription>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="5m">5 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-48 relative group">
          {/* Simplified line chart */}
          <div className="absolute inset-0 flex items-center">
            <svg className="w-full h-32" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M0,50 C20,30 40,60 60,40 C80,20 100,50 120,60 C140,70 160,40 180,30 C200,20 220,40 240,50 C260,60 280,40 300,50"
                fill="none"
                stroke="#A200C1"
                strokeWidth="2"
                className="transition-all group-hover:stroke-[#8a00a1]"
              />
              <path
                d="M0,70 C20,60 40,80 60,70 C80,60 100,70 120,80 C140,90 160,70 180,60 C200,50 220,60 240,70 C260,80 280,60 300,70"
                fill="none"
                stroke="#C080D3"
                strokeWidth="2"
                className="transition-all group-hover:stroke-[#a66cb9]"
              />

              {/* Interactive data points */}
              <circle cx="60" cy="40" r="3" fill="#A200C1" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="120" cy="60" r="3" fill="#A200C1" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="180" cy="30" r="3" fill="#A200C1" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="240" cy="50" r="3" fill="#A200C1" className="cursor-pointer hover:r-4 transition-all" />

              <circle cx="60" cy="70" r="3" fill="#C080D3" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="120" cy="80" r="3" fill="#C080D3" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="180" cy="60" r="3" fill="#C080D3" className="cursor-pointer hover:r-4 transition-all" />
              <circle cx="240" cy="70" r="3" fill="#C080D3" className="cursor-pointer hover:r-4 transition-all" />
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <div>Jan</div>
            <div>Feb</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand"></div>
            <span className="text-sm">Ordered</span>
          </div>
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand-light"></div>
            <span className="text-sm">Delivered</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/order" className="flex items-center gap-1">
              View order details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
