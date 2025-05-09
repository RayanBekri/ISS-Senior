import { type NextRequest, NextResponse } from "next/server"
import { filterInventory } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/filter - Filter inventory
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const provider = searchParams.get("provider") || undefined
    const measurement_unit = searchParams.get("measurement_unit") || undefined
    const min_quantity = searchParams.get("min_quantity")
      ? Number.parseFloat(searchParams.get("min_quantity")!)
      : undefined
    const max_quantity = searchParams.get("max_quantity")
      ? Number.parseFloat(searchParams.get("max_quantity")!)
      : undefined
    const created_after = searchParams.get("created_after") || undefined
    const created_before = searchParams.get("created_before") || undefined
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter inventory
    const { items, total } = await filterInventory(
      {
        provider,
        measurement_unit,
        min_quantity,
        max_quantity,
        created_after,
        created_before,
      },
      page,
      limit,
    )

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        pages: totalPages,
      },
    })
  } catch (error) {
    console.error("Error filtering inventory:", error)
    return NextResponse.json({ success: false, error: "Failed to filter inventory" }, { status: 500 })
  }
}
