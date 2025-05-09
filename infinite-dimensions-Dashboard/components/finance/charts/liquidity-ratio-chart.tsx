export function LiquidityRatioChart() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-gray-400">Liquidity ratio over time</p>
        <div className="mt-4 h-[150px] w-full bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sales%20Report-%20Profit%20%26%20Loss-YnrQhjaVN2oHhPMVVkk8IAvHRanWSC.png"
            alt="Liquidity Ratio Chart"
            className="max-h-full object-contain opacity-50"
          />
        </div>
      </div>
    </div>
  )
}
