"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportDataButtonProps {
  section: string
  viewType: string
}

export function ExportDataButton({ section, viewType }: ExportDataButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const exportFormats = [
    { id: "csv", label: "CSV" },
    { id: "excel", label: "Excel" },
    { id: "pdf", label: "PDF" },
  ]

  const handleExport = (format: string) => {
    setIsOpen(false)

    // In a real application, this would trigger an API call to generate the export
    console.log(`Exporting ${section} in ${format} format from ${viewType} view`)

    // Mock download - in a real app, this would be replaced with actual file download
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} data exported as ${format.toUpperCase()}`)
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
        <Download className="h-4 w-4" />
        <span>Export</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 py-1">
          {exportFormats.map((format) => (
            <div
              key={format.id}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleExport(format.id)}
            >
              {format.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
