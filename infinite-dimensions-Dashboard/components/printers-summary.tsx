import { Printer, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PrintersSummary() {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Printers Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/printers" className="block">
            <div className="flex items-center gap-3 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
                <Printer className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-xl font-bold">31</p>
                <p className="text-sm text-gray-500">Number of Printers</p>
              </div>
            </div>
          </Link>

          <Link href="/printers" className="block">
            <div className="flex items-center gap-3 transition-all hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <div className="h-10 w-10 bg-brand-light/30 rounded-lg flex items-center justify-center">
                <Printer className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-xl font-bold">21</p>
                <p className="text-sm text-gray-500">Printers in Maintenance</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" asChild>
            <Link href="/printers" className="flex items-center gap-1">
              View printers <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
