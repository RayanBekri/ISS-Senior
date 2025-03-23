import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExpensesOverview() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Expenses</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <span>6 Month</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Daily</p>
          <p className="text-xl font-bold">$475</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Weekly</p>
          <p className="text-xl font-bold">$3,327</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Monthly</p>
          <p className="text-xl font-bold">$12,131</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-48 h-48 relative">
          <div className="w-full h-full rounded-full bg-gray-100 absolute"></div>
          <div
            className="w-full h-full rounded-full absolute"
            style={{
              background: "conic-gradient(#A200C1 0% 45%, #d1d5db 45% 65%, #C080D3 65% 85%, #e9d5ff 85% 100%)",
              clipPath: "circle(50% at center)",
            }}
          ></div>
          <div className="w-24 h-24 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand"></div>
          <span className="text-sm">Shopping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-400"></div>
          <span className="text-sm">Supply Inventory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-800"></div>
          <span className="text-sm">Items Inventory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand-light"></div>
          <span className="text-sm">Other Expenses</span>
        </div>
      </div>
    </div>
  )
}

