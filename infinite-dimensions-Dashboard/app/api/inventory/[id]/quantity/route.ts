import { type NextRequest, NextResponse } from "next/server"
import { updateInventoryQuantity } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// PATCH /api/inventory/:id/quantity - Update inventory quantity
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (body.quantity === undefined || !body.operation) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate operation
    if (!["set", "add", "subtract"].includes(body.operation)) {
      return NextResponse.json({ success: false, error: "Invalid operation" }, { status: 400 })
    }

    // Update inventory quantity
    const result = await updateInventoryQuantity(id, body.quantity, body.operation)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error updating inventory quantity for item ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to update inventory quantity" }, { status: 500 })
  }
}
