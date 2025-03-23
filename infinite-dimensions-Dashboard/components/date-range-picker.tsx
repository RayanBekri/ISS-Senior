import { ChevronDown } from "lucide-react"

interface DateRangePickerProps {
  startDate: string
  endDate: string
}

export function DateRangePicker({ startDate, endDate }: DateRangePickerProps) {
  return (
    <div className="flex items-center border rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
      <span>
        {startDate} - {endDate}
      </span>
      <ChevronDown className="ml-2 h-4 w-4" />
    </div>
  )
}

