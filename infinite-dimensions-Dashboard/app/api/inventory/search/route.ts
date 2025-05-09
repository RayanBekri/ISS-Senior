import { type NextRequest, NextResponse } from "next/server"
import { searchInventory } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/search - Search inventory
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Search inventory
    const { items, total } = await searchInventory(query, page, limit)

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
    console.error("Error searching inventory:", error)
    return NextResponse.json({ success: false, error: "Failed to search inventory" }, { status: 500 })
  }
}
