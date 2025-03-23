import { Users } from "lucide-react"

export function SuppliesSummary() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Supplies Summary</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">31</p>
            <p className="text-sm text-gray-500">Number of Suppliers</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xl font-bold">21</p>
            <p className="text-sm text-gray-500">Number of Categories</p>
          </div>
        </div>
      </div>
    </div>
  )
}

