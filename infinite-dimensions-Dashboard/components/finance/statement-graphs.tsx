"use client"

import { ProfitLossGraphs } from "./graphs/profit-loss-graphs"
import { BalanceSheetGraphs } from "./graphs/balance-sheet-graphs"
import { CashFlowGraphs } from "./graphs/cash-flow-graphs"

interface StatementGraphsProps {
  activeStatementTab: string
}

export function StatementGraphs({ activeStatementTab }: StatementGraphsProps) {
  return (
    <div className="w-full">
      {activeStatementTab === "profit-loss" && <ProfitLossGraphs />}
      {activeStatementTab === "balance-sheet" && <BalanceSheetGraphs />}
      {activeStatementTab === "cash-flow" && <CashFlowGraphs />}
    </div>
  )
}
