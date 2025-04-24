//filtered-printer-grid component
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const statusVariants = {
  "view-details": "bg-primary hover:bg-primary/90",
};

export type PrinterOperationalStatus = "free" | "in-use" | "maintenance";

export const operationalStatusLabels = {
  free: "Free",
  "in-use": "In Use",
  maintenance: "Maintenance",
};

export const operationalStatusColors = {
  free: "bg-emerald-600",
  "in-use": "bg-indigo-600",
  maintenance: "bg-amber-600",
};

export type PrinterStatus = "view-details";

export interface PrinterData {
  id: number;
  name: string;
  model: string;
  type: string;
  powerUsage: string;
  buyingCost: string;
  lifespan: string;
  status: PrinterStatus;
  operationalStatus: PrinterOperationalStatus;
}

interface PrinterCardProps {
  printer: PrinterData;
  onViewDetails: (printer: PrinterData) => void;
}

function PrinterCard({ printer, onViewDetails }: PrinterCardProps) {
  const statusText = printer.status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex h-48 items-center justify-center bg-gray-100 p-4">
          <Image
            src="/placeholder.svg?height=150&width=150"
            alt={printer.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-lg font-medium">{printer.name}</h3>
          <div
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${operationalStatusColors[printer.operationalStatus]}`}
          >
            {operationalStatusLabels[printer.operationalStatus]}
          </div>
        </div>
        <button
          className={`rounded-md px-5 py-3 text-xs font-medium text-white ${statusVariants[printer.status]}`}
          onClick={() => onViewDetails(printer)}
        >
          {statusText}
        </button>
      </CardFooter>
    </Card>
  );
}

export default function FilteredPrinterGrid({
  statusFilter,
  onViewDetails,
}: {
  statusFilter: string;
  onViewDetails: (printer: PrinterData) => void;
}) {
  const [printers, setPrinters] = useState<PrinterData[]>([]);

  useEffect(() => {
    fetch(`/api/printers?status=${statusFilter}`)
      .then((response) => response.json())
      .then((data) => setPrinters(data))
      .catch((error) => console.error("Error fetching printers:", error));
  }, [statusFilter]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {printers.map((printer) => (
        <PrinterCard key={printer.id} printer={printer} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}
