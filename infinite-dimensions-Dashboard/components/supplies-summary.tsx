import { Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SuppliesSummary() {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Supplies Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/inventory" className="block">
            <div className="flex items-center gap-3 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-xl font-bold">31</p>
                <p className="text-sm text-gray-500">Number of Suppliers</p>
              </div>
            </div>
          </Link>

          <Link href="/inventory" className="block">
            <div className="flex items-center gap-3 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-xl font-bold">21</p>
                <p className="text-sm text-gray-500">Number of Categories</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/inventory" className="flex items-center gap-1">
              View suppliers <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
