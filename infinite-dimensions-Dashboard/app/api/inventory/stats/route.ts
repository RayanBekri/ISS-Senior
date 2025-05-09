import { type NextRequest, NextResponse } from "next/server"
import { getInventoryStats } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/stats - Get inventory statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get inventory statistics
    const result = await getInventoryStats()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching inventory statistics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch inventory statistics" }, { status: 500 })
  }
}
