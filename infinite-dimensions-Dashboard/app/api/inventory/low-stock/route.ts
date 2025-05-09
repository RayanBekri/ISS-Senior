import { type NextRequest, NextResponse } from "next/server"
import { getLowStockItems } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/low-stock - Get low stock items
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const threshold = Number.parseInt(searchParams.get("threshold") || "5")

    // Get low stock items
    const items = await getLowStockItems(threshold)

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    })
  } catch (error) {
    console.error("Error fetching low stock items:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch low stock items" }, { status: 500 })
  }
}
