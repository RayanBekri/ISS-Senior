import { BarChart3, FileText, Target, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SalesOverview() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Today's Sales</h2>
          <p className="text-sm text-muted-foreground">Sales Summary</p>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-light/20 p-4 rounded-lg">
          <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
            <BarChart3 className="h-4 w-4 text-brand" />
          </div>
          <h3 className="text-xl font-bold">$1k</h3>
          <p className="text-sm">Total Sales</p>
          <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
        </div>

        <div className="bg-brand-light/20 p-4 rounded-lg">
          <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
            <FileText className="h-4 w-4 text-brand" />
          </div>
          <h3 className="text-xl font-bold">300</h3>
          <p className="text-sm">Total Order</p>
          <p className="text-xs text-green-600 mt-1">+5% from yesterday</p>
        </div>

        <div className="bg-brand-light/20 p-4 rounded-lg">
          <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
            <Target className="h-4 w-4 text-brand" />
          </div>
          <h3 className="text-xl font-bold">5</h3>
          <p className="text-sm">Product Sold</p>
          <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
        </div>

        <div className="bg-brand-light/20 p-4 rounded-lg">
          <div className="h-8 w-8 bg-brand-light/50 rounded-full flex items-center justify-center mb-3">
            <Users className="h-4 w-4 text-brand" />
          </div>
          <h3 className="text-xl font-bold">8</h3>
          <p className="text-sm">New Customers</p>
          <p className="text-xs text-green-600 mt-1">0.5% from yesterday</p>
        </div>
      </div>
    </div>
  )
}

