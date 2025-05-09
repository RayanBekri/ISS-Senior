"use client"
import { ProfitLossTables } from "@/components/finance/tables/profit-loss-tables"
import { ProfitLossGraphs } from "@/components/finance/graphs/profit-loss-graphs"
import { useEffect } from "react"

interface ProfitLossStatementsProps {
  view: string
}

export function ProfitLossStatements({ view }: ProfitLossStatementsProps) {
  // Debug logging
  useEffect(() => {
    console.log("Profit & Loss Statement rendered with view:", view)
  }, [view])

  return (
    <div>
      {view === "tables" && <ProfitLossTables />}
      {view === "graphs" && <ProfitLossGraphs />}
    </div>
  )
}
