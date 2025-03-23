import { Package } from "lucide-react"

export function InventorySummary() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">868</p>
            <p className="text-sm text-gray-500">Quantity in Hand</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">200</p>
            <p className="text-sm text-gray-500">To be received</p>
          </div>
        </div>
      </div>
    </div>
  )
}

