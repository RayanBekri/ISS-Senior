import { DateRangePicker } from "@/components/date-range-picker"
import { SalesOverview } from "@/components/sales-overview"
import { ExpensesOverview } from "@/components/expenses-overview"
import { RevenueChart } from "@/components/revenue-chart"
import { OrderSummaryChart } from "@/components/order-summary-chart"
import { TransactionHistory } from "@/components/transaction-history"
import { InventorySummary } from "@/components/inventory-summary"
import { SuppliesSummary } from "@/components/supplies-summary"
import { PrintersSummary } from "@/components/printers-summary"
import { LowQuantityStock } from "@/components/low-quantity-stock"

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>Dashboard</span>
            <span className="mx-1">›</span>
            <span className="text-purple-500">Dashboard</span>
          </div>
        </div>
        <DateRangePicker startDate="28 Jan, 2021" endDate="28 Dec, 2021" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SalesOverview />
          <RevenueChart />
          <TransactionHistory />
        </div>
        <div className="space-y-6">
          <ExpensesOverview />
          <OrderSummaryChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InventorySummary />
              <SuppliesSummary />
            </div>
            <div className="space-y-6">
              <div className="h-[200px]">
                <LowQuantityStock />
              </div>
              <PrintersSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

