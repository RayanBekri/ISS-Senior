"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatementTables } from "./statement-tables"
import { StatementGraphs } from "./statement-graphs"

export function FinanceStatementsUI() {
  const [activeTab, setActiveTab] = useState("profit-loss")
  const [activeView, setActiveView] = useState("tables")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="profit-loss" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
            <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView("tables")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeView === "tables" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Tables
          </button>
          <button
            onClick={() => setActiveView("graphs")}
            className={`px-3 py-1 text-sm rounded-md ${
              activeView === "graphs" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Graphs
          </button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {activeView === "tables" ? (
            <StatementTables activeStatementTab={activeTab} />
          ) : (
            <StatementGraphs activeStatementTab={activeTab} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
