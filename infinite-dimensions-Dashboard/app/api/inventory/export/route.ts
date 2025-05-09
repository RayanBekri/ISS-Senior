import { type NextRequest, NextResponse } from "next/server"
import { filterInventory } from "@/lib/inventory-service"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/inventory/export - Export inventory
export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get("format") || "csv"

    // Validate format
    if (!["csv", "xlsx", "pdf"].includes(format)) {
      return NextResponse.json({ success: false, error: "Invalid export format" }, { status: 400 })
    }

    // Get filter parameters
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

    // Get all items matching the filters (no pagination for export)
    const { items } = await filterInventory(
      {
        provider,
        measurement_unit,
        min_quantity,
        max_quantity,
        created_after,
        created_before,
      },
      1,
      1000000, // Large limit to get all items
    )

    // Generate export file based on format
    let fileContent = ""
    let contentType = ""
    let filename = `inventory-export-${new Date().toISOString().split("T")[0]}`

    if (format === "csv") {
      // Generate CSV
      contentType = "text/csv"
      filename += ".csv"

      // CSV header
      fileContent = "ID,Name,Quantity,Measurement Unit,Provider,Created At,Updated At\n"

      // CSV rows
      items.forEach((item) => {
        fileContent += `${item.inventory_id},${item.name},${item.quantity},${item.measurement_unit},${item.provider || ""},${item.created_at},${item.updated_at}\n`
      })
    } else if (format === "xlsx" || format === "pdf") {
      // For XLSX and PDF, we would need additional libraries
      // This is a simplified implementation
      return NextResponse.json(
        { success: false, error: `${format.toUpperCase()} export not implemented yet` },
        { status: 501 },
      )
    }

    // Return the file
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error exporting inventory:", error)
    return NextResponse.json({ success: false, error: "Failed to export inventory" }, { status: 500 })
  }
}
