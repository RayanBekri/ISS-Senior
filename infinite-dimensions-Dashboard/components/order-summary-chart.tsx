export function OrderSummaryChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="h-48 relative">
        {/* Simplified line chart */}
        <div className="absolute inset-0 flex items-center">
          <svg className="w-full h-32" viewBox="0 0 300 100" preserveAspectRatio="none">
            <path
              d="M0,50 C20,30 40,60 60,40 C80,20 100,50 120,60 C140,70 160,40 180,30 C200,20 220,40 240,50 C260,60 280,40 300,50"
              fill="none"
              stroke="#A200C1"
              strokeWidth="2"
            />
            <path
              d="M0,70 C20,60 40,80 60,70 C80,60 100,70 120,80 C140,90 160,70 180,60 C200,50 220,60 240,70 C260,80 280,60 300,70"
              fill="none"
              stroke="#C080D3"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>May</div>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand"></div>
          <span className="text-sm">Ordered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand-light"></div>
          <span className="text-sm">Delivered</span>
        </div>
      </div>
    </div>
  )
}

