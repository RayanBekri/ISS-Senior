import { BarChart3, FileText, Target, Users, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function SalesOverview() {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold">Today's Sales</CardTitle>
          <CardDescription>Sales Summary</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <span>6 Month</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/order" className="block">
            <div className="bg-brand-light/20 p-4 rounded-lg transition-all hover:bg-brand-light/30 cursor-pointer">
              <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
                <BarChart3 className="h-4 w-4 text-brand" />
              </div>
              <h3 className="text-xl font-bold">$1k</h3>
              <p className="text-sm">Total Sales</p>
              <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
            </div>
          </Link>

          <Link href="/order" className="block">
            <div className="bg-brand-light/20 p-4 rounded-lg transition-all hover:bg-brand-light/30 cursor-pointer">
              <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-4 w-4 text-brand" />
              </div>
              <h3 className="text-xl font-bold">300</h3>
              <p className="text-sm">Total Order</p>
              <p className="text-xs text-green-600 mt-1">+5% from yesterday</p>
            </div>
          </Link>

          <Link href="/products" className="block">
            <div className="bg-brand-light/20 p-4 rounded-lg transition-all hover:bg-brand-light/30 cursor-pointer">
              <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
                <Target className="h-4 w-4 text-brand" />
              </div>
              <h3 className="text-xl font-bold">5</h3>
              <p className="text-sm">Product Sold</p>
              <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
            </div>
          </Link>

          <Link href="/employees" className="block">
            <div className="bg-brand-light/20 p-4 rounded-lg transition-all hover:bg-brand-light/30 cursor-pointer">
              <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
                <Users className="h-4 w-4 text-brand" />
              </div>
              <h3 className="text-xl font-bold">8</h3>
              <p className="text-sm">New Customers</p>
              <p className="text-xs text-green-600 mt-1">0.5% from yesterday</p>
            </div>
          </Link>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/finance" className="flex items-center gap-1">
              View detailed reports <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
