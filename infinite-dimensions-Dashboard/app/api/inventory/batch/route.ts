import { type NextRequest, NextResponse } from "next/server"
import { batchUpdateInventory } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// PUT /api/inventory/batch - Batch update inventory
export async function PUT(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ success: false, error: "Missing or invalid items array" }, { status: 400 })
    }

    // Validate each item in the array
    for (const item of body.items) {
      if (!item.inventory_id || item.quantity === undefined) {
        return NextResponse.json(
          { success: false, error: "Each item must have inventory_id and quantity" },
          { status: 400 },
        )
      }
    }

    // Batch update inventory
    const result = await batchUpdateInventory(body.items)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error performing batch update:", error)
    return NextResponse.json({ success: false, error: "Failed to perform batch update" }, { status: 500 })
  }
}
