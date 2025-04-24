//printers-summary component
"use client"
import { useState, useEffect } from "react"
import { Printer } from "lucide-react"

export function PrintersSummary() {
  const [summary, setSummary] = useState({
    totalPrinters: 0,
    printersInMaintenance: 0,
  })

  useEffect(() => {
    fetch("/api/printers/summary")
      .then((response) => response.json())
      .then((data) => setSummary(data))
      .catch((error) => console.error("Error fetching printer summary:", error))
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Printers Summary</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Printer className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">{summary.totalPrinters}</p>
            <p className="text-sm text-gray-500">Number of Printers</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Printer className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">{summary.printersInMaintenance}</p>
            <p className="text-sm text-gray-500">Printers in Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
