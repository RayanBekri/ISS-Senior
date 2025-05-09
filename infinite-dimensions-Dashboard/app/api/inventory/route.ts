import { type NextRequest, NextResponse } from "next/server"
import { getInventoryItems, addInventoryItem } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory - Get all inventory items
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sort = searchParams.get("sort") || "name"
    const order = searchParams.get("order") || "asc"

    // Get inventory items
    const { items, total } = await getInventoryItems(page, limit, sort, order)

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
    console.error("Error fetching inventory items:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch inventory items" }, { status: 500 })
  }
}

// POST /api/inventory - Create a new inventory item
export async function POST(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.name || body.quantity === undefined || !body.measurement_unit) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Add inventory item
    const result = await addInventoryItem({
      name: body.name,
      quantity: body.quantity,
      measurement_unit: body.measurement_unit,
      provider: body.provider || null,
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error creating inventory item:", error)
    return NextResponse.json({ success: false, error: "Failed to create inventory item" }, { status: 500 })
  }
}
