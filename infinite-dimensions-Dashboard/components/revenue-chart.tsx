"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueChart() {
  const [activeView, setActiveView] = useState("weekly")

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Total Revenue</CardTitle>
          <CardDescription>Weekly revenue breakdown</CardDescription>
        </div>
        <Tabs value={activeView} onValueChange={setActiveView} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="weekly" className="mt-0">
          <div className="h-64 relative">
            {/* This is a simplified representation of the chart */}
            <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between">
              {/* Monday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-32 rounded-t transition-all group-hover:h-36 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-24 rounded-t transition-all group-hover:h-28 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Tuesday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-40 rounded-t transition-all group-hover:h-44 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-20 rounded-t transition-all group-hover:h-24 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Wednesday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-16 rounded-t transition-all group-hover:h-20 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-44 rounded-t transition-all group-hover:h-48 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Thursday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-36 rounded-t transition-all group-hover:h-40 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-12 rounded-t transition-all group-hover:h-16 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Friday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-28 rounded-t transition-all group-hover:h-32 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-20 rounded-t transition-all group-hover:h-24 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Saturday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-36 rounded-t transition-all group-hover:h-40 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-8 rounded-t transition-all group-hover:h-12 group-hover:bg-brand-light/90"></div>
              </div>

              {/* Sunday */}
              <div className="flex gap-1 items-end group cursor-pointer">
                <div className="w-6 bg-brand h-44 rounded-t transition-all group-hover:h-48 group-hover:bg-brand/90"></div>
                <div className="w-6 bg-brand-light h-16 rounded-t transition-all group-hover:h-20 group-hover:bg-brand-light/90"></div>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Monthly data is loading...</p>
          </div>
        </TabsContent>

        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand"></div>
            <span className="text-sm">Online Sales</span>
          </div>
          <div className="flex items-center gap-2 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
            <div className="h-3 w-3 rounded-full bg-brand-light"></div>
            <span className="text-sm">Offline Sales</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/finance" className="flex items-center gap-1">
              View revenue details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
