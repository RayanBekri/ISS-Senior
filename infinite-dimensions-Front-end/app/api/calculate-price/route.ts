import { NextResponse } from "next/server"

// Optimized price calculation with caching
const materialCostCache: Record<string, number> = {
  pla: 0.15,
  abs: 0.18,
  petg: 0.21,
  tpu: 0.27,
  pa: 0.45,
}

const qualityFactorCache: Record<string, number> = {
  draft: 0.9,
  standard: 1.0,
  high: 1.2,
  engineering: 1.5,
}

// Constants
const MACHINE_TIME_COST_PER_HOUR = 7.5 // TND per hour
const SETUP_FEE = 15.0 // TND

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { printTimeMinutes, materialUsageGrams, material, quality } = body

    // Get material cost from cache
    const materialCostPerGram = materialCostCache[material] || materialCostCache.pla

    // Calculate material cost
    const materialCost = materialUsageGrams * materialCostPerGram

    // Calculate machine time cost
    const machineTimeCost = (printTimeMinutes / 60) * MACHINE_TIME_COST_PER_HOUR

    // Get quality factor from cache
    const qualityFactor = qualityFactorCache[quality] || qualityFactorCache.standard

    // Calculate final price
    const finalPrice = (materialCost + machineTimeCost + SETUP_FEE) * qualityFactor

    // Round to 3 decimal places (TND has 3 decimal places)
    const roundedPrice = Math.round(finalPrice * 1000) / 1000

    return NextResponse.json({ price: roundedPrice })
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate price" }, { status: 500 })
  }
}

