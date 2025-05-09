"use client"

import { lazyLoad } from "@/utils/lazy-load"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

// Dashboard components
export const SalesOverview = lazyLoad(() =>
  import("@/components/sales-overview").then((mod) => ({ default: mod.SalesOverview })),
)
export const ExpensesOverview = lazyLoad(() =>
  import("@/components/expenses-overview").then((mod) => ({ default: mod.ExpensesOverview })),
)
export const RevenueChart = lazyLoad(() =>
  import("@/components/revenue-chart").then((mod) => ({ default: mod.RevenueChart })),
)
export const OrderSummaryChart = lazyLoad(() =>
  import("@/components/order-summary-chart").then((mod) => ({ default: mod.OrderSummaryChart })),
)
export const InventorySummary = lazyLoad(() =>
  import("@/components/inventory-summary").then((mod) => ({ default: mod.InventorySummary })),
)
export const SuppliesSummary = lazyLoad(() =>
  import("@/components/supplies-summary").then((mod) => ({ default: mod.SuppliesSummary })),
)
export const PrintersSummary = lazyLoad(() =>
  import("@/components/printers-summary").then((mod) => ({ default: mod.PrintersSummary })),
)
export const LowQuantityStock = lazyLoad(() =>
  import("@/components/low-quantity-stock").then((mod) => ({ default: mod.LowQuantityStock })),
)
export const TransactionHistory = lazyLoad(() =>
  import("@/components/transaction-history").then((mod) => ({ default: mod.TransactionHistory })),
)

// Finance components
export const FinanceGeneral = lazyLoad(
  () => import("@/components/finance/finance-general").then((mod) => ({ default: mod.FinanceGeneral })),
  { fallback: <Skeleton className="w-full h-96" /> },
)
export const FinanceSales = lazyLoad(
  () => import("@/components/finance/finance-sales").then((mod) => ({ default: mod.FinanceSales })),
  { fallback: <Skeleton className="w-full h-96" /> },
)
export const FinanceShop = lazyLoad(
  () => import("@/components/finance/finance-shop").then((mod) => ({ default: mod.FinanceShop })),
  { fallback: <Skeleton className="w-full h-96" /> },
)
export const FinancePrinters = lazyLoad(
  () => import("@/components/finance/finance-printers").then((mod) => ({ default: mod.FinancePrinters })),
  { fallback: <Skeleton className="w-full h-96" /> },
)
export const FinanceCustomers = lazyLoad(
  () => import("@/components/finance/finance-customers").then((mod) => ({ default: mod.FinanceCustomers })),
  { fallback: <Skeleton className="w-full h-96" /> },
)
export const FinanceStatementsUI = lazyLoad(
  () => import("@/components/finance/finance-statements-ui").then((mod) => ({ default: mod.FinanceStatementsUI })),
  { fallback: <Skeleton className="w-full h-96" /> },
)

// Chart components
export const SalesAndProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/sales-and-profit-chart").then((mod) => ({ default: mod.SalesAndProfitChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const RevenueFrequencyChart = lazyLoad(
  () =>
    import("@/components/finance/charts/revenue-frequency-chart").then((mod) => ({
      default: mod.RevenueFrequencyChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)

// Finance Charts
export const BestSellingCategoriesChart = dynamic(
  () =>
    import("@/components/finance/charts/best-selling-categories-chart").then((mod) => mod.BestSellingCategoriesChart),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const ProductSalesChart = dynamic(
  () => import("@/components/finance/charts/product-sales-chart").then((mod) => mod.ProductSalesChart),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const ProductSalesYearlyComparisonChart = dynamic(
  () =>
    import("@/components/finance/charts/product-sales-yearly-comparison-chart").then(
      (mod) => mod.ProductSalesYearlyComparisonChart,
    ),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const SumProfitShopChart = dynamic(
  () => import("@/components/finance/charts/sum-profit-shop-chart").then((mod) => mod.SumProfitShopChart),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const YearlySumProfitShopChart = dynamic(
  () => import("@/components/finance/charts/yearly-sum-profit-shop-chart").then((mod) => mod.YearlySumProfitShopChart),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const CategoriesHighestProfitChart = dynamic(
  () =>
    import("@/components/finance/charts/categories-highest-profit-chart").then(
      (mod) => mod.CategoriesHighestProfitChart,
    ),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const YearlyProfitCategoryChart = dynamic(
  () => import("@/components/finance/charts/yearly-profit-category-chart").then((mod) => mod.YearlyProfitCategoryChart),
  {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  },
)

export const ShopProfitChart = lazyLoad(
  () => import("@/components/finance/charts/shop-profit-chart").then((mod) => ({ default: mod.ShopProfitChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const YearlyShopProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/yearly-shop-profit-chart").then((mod) => ({
      default: mod.YearlyShopProfitChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const CategoriesProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/categories-profit-chart").then((mod) => ({
      default: mod.CategoriesProfitChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const CategoryProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/category-profit-chart").then((mod) => ({ default: mod.CategoryProfitChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)

// Printer charts
export const ProductionsYearChart = lazyLoad(
  () =>
    import("@/components/finance/charts/productions-year-chart").then((mod) => ({ default: mod.ProductionsYearChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const ProductionsMonthChart = lazyLoad(
  () =>
    import("@/components/finance/charts/productions-month-chart").then((mod) => ({
      default: mod.ProductionsMonthChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const NetProfitProductionChart = lazyLoad(
  () =>
    import("@/components/finance/charts/net-profit-production-chart").then((mod) => ({
      default: mod.NetProfitProductionChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const SumProfitProductionChart = lazyLoad(
  () =>
    import("@/components/finance/charts/sum-profit-production-chart").then((mod) => ({
      default: mod.SumProfitProductionChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const YearlyMulticolorProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/yearly-multicolor-profit-chart").then((mod) => ({
      default: mod.YearlyMulticolorProfitChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const YearlySingleColorProfitChart = lazyLoad(
  () =>
    import("@/components/finance/charts/yearly-single-color-profit-chart").then((mod) => ({
      default: mod.YearlySingleColorProfitChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const MaterialsConsumptionChart = lazyLoad(
  () =>
    import("@/components/finance/charts/materials-consumption-chart").then((mod) => ({
      default: mod.MaterialsConsumptionChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const MaterialsCostChart = lazyLoad(
  () => import("@/components/finance/charts/materials-cost-chart").then((mod) => ({ default: mod.MaterialsCostChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const ColorsConsumptionChart = lazyLoad(
  () =>
    import("@/components/finance/charts/colors-consumption-chart").then((mod) => ({
      default: mod.ColorsConsumptionChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const ColorsCostChart = lazyLoad(
  () => import("@/components/finance/charts/colors-cost-chart").then((mod) => ({ default: mod.ColorsCostChart })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const ProfitByPrinterOrdersChart = lazyLoad(
  () =>
    import("@/components/finance/charts/profit-by-printer-orders-chart").then((mod) => ({
      default: mod.ProfitByPrinterOrdersChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)

// Customer charts
export const SalesProfitScatterChart = lazyLoad(
  () =>
    import("@/components/finance/charts/sales-profit-scatter-chart").then((mod) => ({
      default: mod.SalesProfitScatterChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const ProfitableCategoriesChart = lazyLoad(
  () =>
    import("@/components/finance/charts/profitable-categories-chart").then((mod) => ({
      default: mod.ProfitableCategoriesChart,
    })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)

// Statement components
export const ProfitLossGraphs = lazyLoad(
  () => import("@/components/finance/graphs/profit-loss-graphs").then((mod) => ({ default: mod.ProfitLossGraphs })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const BalanceSheetGraphs = lazyLoad(
  () => import("@/components/finance/graphs/balance-sheet-graphs").then((mod) => ({ default: mod.BalanceSheetGraphs })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
export const CashFlowGraphs = lazyLoad(
  () => import("@/components/finance/graphs/cash-flow-graphs").then((mod) => ({ default: mod.CashFlowGraphs })),
  { fallback: <Skeleton className="w-full h-[400px]" /> },
)
