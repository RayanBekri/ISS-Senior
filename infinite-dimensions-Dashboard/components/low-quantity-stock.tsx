import { ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LowQuantityStock() {
  const materials = [
    { id: 1, name: "Material 1", quantity: 10 },
    { id: 2, name: "Material 2", quantity: 15 },
    { id: 3, name: "Material 3", quantity: 15 },
  ]

  return (
    <Card className="transition-all hover:shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Low Quantity Stock</CardTitle>
        <Button variant="link" size="sm" asChild>
          <Link href="/inventory">See All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {materials.map((material) => (
            <Link href="/inventory" key={material.id} className="block">
              <div className="flex items-center gap-3 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{material.name}</p>
                  <p className="text-sm text-gray-500">Remaining Quantity: {material.quantity} Units</p>
                </div>
                <div className="px-2 py-1 bg-red-50 text-red-500 text-xs rounded">Low</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/inventory" className="flex items-center gap-1">
              View all inventory <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
