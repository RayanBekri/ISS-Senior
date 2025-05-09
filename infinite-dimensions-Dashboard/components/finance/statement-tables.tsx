"use client"

import { useEffect, useState } from "react"
import { ProfitLossTables } from "./tables/profit-loss-tables"
import { BalanceSheetTables } from "./tables/balance-sheet-tables"
import { CashFlowTables } from "./tables/cash-flow-tables"

interface StatementTablesProps {
  activeStatementTab: string
}

export function StatementTables({ activeStatementTab }: StatementTablesProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/3"></div>
        <div className="h-[400px] bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    )
  }

  return (
    <div>
      {activeStatementTab === "profit-loss" && <ProfitLossTables />}
      {activeStatementTab === "balance-sheet" && <BalanceSheetTables />}
      {activeStatementTab === "cash-flow" && <CashFlowTables />}
    </div>
  )
}
