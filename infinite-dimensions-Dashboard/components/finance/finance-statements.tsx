"use client"
import { StatementTables } from "./statement-tables"
import { StatementGraphs } from "./statement-graphs"

interface FinanceStatementsProps {
  activeStatementTab: string
  activeViewTab: string
}

export function FinanceStatements({ activeStatementTab, activeViewTab }: FinanceStatementsProps) {
  return (
    <div>
      {activeViewTab === "tables" ? (
        <StatementTables activeStatementTab={activeStatementTab} />
      ) : (
        <StatementGraphs activeStatementTab={activeStatementTab} />
      )}
    </div>
  )
}
