import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 bg-gray-200 rounded-md animate-pulse w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-48"></div>
        </div>
      </div>

      <div className="h-10 bg-gray-200 rounded-md animate-pulse w-64 mb-6"></div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
            </div>
          </Card>
        </div>
        <Card className="p-6">
          <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3 mb-4"></div>
          <div className="h-[300px] bg-gray-200 rounded-md animate-pulse"></div>
        </Card>
      </div>
    </div>
  )
}
