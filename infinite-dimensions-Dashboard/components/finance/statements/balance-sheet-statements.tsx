"use client"
import { BalanceSheetTables } from "@/components/finance/tables/balance-sheet-tables"
import { BalanceSheetGraphs } from "@/components/finance/graphs/balance-sheet-graphs"
import { useEffect } from "react"

interface BalanceSheetStatementsProps {
  view: string
}

export function BalanceSheetStatements({ view }: BalanceSheetStatementsProps) {
  // Debug logging
  useEffect(() => {
    console.log("Balance Sheet Statement rendered with view:", view)
  }, [view])

  return (
    <div>
      {view === "tables" && <BalanceSheetTables />}
      {view === "graphs" && <BalanceSheetGraphs />}
    </div>
  )
}
