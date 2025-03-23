export function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Total Revenue</h2>

      <div className="h-64 relative">
        {/* This is a simplified representation of the chart */}
        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between">
          {/* Monday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-32 rounded-t"></div>
            <div className="w-6 bg-brand-light h-24 rounded-t"></div>
          </div>

          {/* Tuesday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-40 rounded-t"></div>
            <div className="w-6 bg-brand-light h-20 rounded-t"></div>
          </div>

          {/* Wednesday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-16 rounded-t"></div>
            <div className="w-6 bg-brand-light h-44 rounded-t"></div>
          </div>

          {/* Thursday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-36 rounded-t"></div>
            <div className="w-6 bg-brand-light h-12 rounded-t"></div>
          </div>

          {/* Friday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-28 rounded-t"></div>
            <div className="w-6 bg-brand-light h-20 rounded-t"></div>
          </div>

          {/* Saturday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-36 rounded-t"></div>
            <div className="w-6 bg-brand-light h-8 rounded-t"></div>
          </div>

          {/* Sunday */}
          <div className="flex gap-1 items-end">
            <div className="w-6 bg-brand h-44 rounded-t"></div>
            <div className="w-6 bg-brand-light h-16 rounded-t"></div>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand"></div>
          <span className="text-sm">Online Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand-light"></div>
          <span className="text-sm">Offline Sales</span>
        </div>
      </div>
    </div>
  )
}

