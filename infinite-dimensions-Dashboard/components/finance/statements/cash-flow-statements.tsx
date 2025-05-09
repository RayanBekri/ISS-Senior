"use client"
import { CashFlowTables } from "@/components/finance/tables/cash-flow-tables"
import { CashFlowGraphs } from "@/components/finance/graphs/cash-flow-graphs"

interface CashFlowStatementsProps {
  view: string
}

export function CashFlowStatements({ view }: CashFlowStatementsProps) {
  return (
    <div>
      {view === "tables" && <CashFlowTables />}
      {view === "graphs" && <CashFlowGraphs />}
    </div>
  )
}
