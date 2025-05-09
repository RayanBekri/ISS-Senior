import { type NextRequest, NextResponse } from "next/server"
import { getInventoryItemById, updateInventoryItem, deleteInventoryItem } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/:id - Get a single inventory item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Get inventory item
    const item = await getInventoryItemById(id)

    if (!item) {
      return NextResponse.json({ success: false, error: "Inventory item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error(`Error fetching inventory item ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to fetch inventory item" }, { status: 500 })
  }
}

// PUT /api/inventory/:id - Update an inventory item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Parse request body
    const body = await request.json()

    // Update inventory item
    const result = await updateInventoryItem(id, {
      name: body.name,
      quantity: body.quantity,
      measurement_unit: body.measurement_unit,
      provider: body.provider,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error updating inventory item ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to update inventory item" }, { status: 500 })
  }
}

// DELETE /api/inventory/:id - Delete an inventory item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Delete inventory item
    const result = await deleteInventoryItem(id)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error deleting inventory item ${params.id}:`, error)
    return NextResponse.json({ success: false, error: "Failed to delete inventory item" }, { status: 500 })
  }
}
