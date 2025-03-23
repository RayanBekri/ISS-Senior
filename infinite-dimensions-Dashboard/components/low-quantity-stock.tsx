export function LowQuantityStock() {
  const materials = [
    { id: 1, name: "Material 1", quantity: 10 },
    { id: 2, name: "Material 2", quantity: 15 },
    { id: 3, name: "Material 3", quantity: 15 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Low Quantity Stock</h2>
        <a href="#" className="text-sm text-blue-500">
          See All
        </a>
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <div key={material.id} className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="h-8 w-8 bg-orange-200 rounded"></div>
            </div>
            <div className="flex-1">
              <p className="font-medium">{material.name}</p>
              <p className="text-sm text-gray-500">Remaining Quantity : {material.quantity} Units</p>
            </div>
            <div className="px-2 py-1 bg-red-50 text-red-500 text-xs rounded">Low</div>
          </div>
        ))}
      </div>
    </div>
  )
}

