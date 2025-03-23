export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface BoundingBox {
  min: Vector3
  max: Vector3
}

export interface STLData {
  vertices: Vector3[]
  normals: Vector3[]
  boundingBox: BoundingBox
  volume: number
  surfaceArea: number
  triangleCount: number
}

// Optimized STL parser with faster calculations
export function parseSTL(buffer: ArrayBuffer): STLData {
  const view = new DataView(buffer)
  const vertices: Vector3[] = []
  const normals: Vector3[] = []

  // Initialize bounding box
  const boundingBox: BoundingBox = {
    min: { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY },
    max: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY, z: Number.NEGATIVE_INFINITY },
  }

  // Skip header (80 bytes) and read triangle count
  const triangleCount = view.getUint32(80, true)

  // Pre-allocate arrays for better performance
  vertices.length = triangleCount * 3
  normals.length = triangleCount

  let volume = 0
  let surfaceArea = 0

  // Process all triangles in a single loop for better performance
  let pos = 84 // Start after header (80 bytes) and triangle count (4 bytes)
  for (let i = 0; i < triangleCount; i++) {
    // Read normal
    const nx = view.getFloat32(pos, true)
    const ny = view.getFloat32(pos + 4, true)
    const nz = view.getFloat32(pos + 8, true)
    normals[i] = { x: nx, y: ny, z: nz }
    pos += 12

    // Read vertices
    const v1 = {
      x: view.getFloat32(pos, true),
      y: view.getFloat32(pos + 4, true),
      z: view.getFloat32(pos + 8, true),
    }
    pos += 12

    const v2 = {
      x: view.getFloat32(pos, true),
      y: view.getFloat32(pos + 4, true),
      z: view.getFloat32(pos + 8, true),
    }
    pos += 12

    const v3 = {
      x: view.getFloat32(pos, true),
      y: view.getFloat32(pos + 4, true),
      z: view.getFloat32(pos + 8, true),
    }
    pos += 12

    // Update bounding box in a single pass
    boundingBox.min.x = Math.min(boundingBox.min.x, v1.x, v2.x, v3.x)
    boundingBox.min.y = Math.min(boundingBox.min.y, v1.y, v2.y, v3.y)
    boundingBox.min.z = Math.min(boundingBox.min.z, v1.z, v2.z, v3.z)
    boundingBox.max.x = Math.max(boundingBox.max.x, v1.x, v2.x, v3.x)
    boundingBox.max.y = Math.max(boundingBox.max.y, v1.y, v2.y, v3.y)
    boundingBox.max.z = Math.max(boundingBox.max.z, v1.z, v2.z, v3.z)

    // Store vertices
    const idx = i * 3
    vertices[idx] = v1
    vertices[idx + 1] = v2
    vertices[idx + 2] = v3

    // Calculate volume and surface area in the same loop
    volume += calculateTetrahedronVolume(v1, v2, v3)
    surfaceArea += calculateTriangleArea(v1, v2, v3)

    // Skip attribute byte count
    pos += 2
  }

  return {
    vertices,
    normals,
    boundingBox,
    volume: Math.abs(volume),
    surfaceArea,
    triangleCount,
  }
}

// Optimized tetrahedron volume calculation
function calculateTetrahedronVolume(v1: Vector3, v2: Vector3, v3: Vector3): number {
  // Use cross product for faster calculation
  const cross = {
    x: (v2.y - v1.y) * (v3.z - v1.z) - (v2.z - v1.z) * (v3.y - v1.y),
    y: (v2.z - v1.z) * (v3.x - v1.x) - (v2.x - v1.x) * (v3.z - v1.z),
    z: (v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x),
  }

  // Dot product with first vertex
  return (v1.x * cross.x + v1.y * cross.y + v1.z * cross.z) / 6
}

// Optimized triangle area calculation using cross product
function calculateTriangleArea(v1: Vector3, v2: Vector3, v3: Vector3): number {
  // Calculate vectors from v1 to v2 and v1 to v3
  const v12 = {
    x: v2.x - v1.x,
    y: v2.y - v1.y,
    z: v2.z - v1.z,
  }

  const v13 = {
    x: v3.x - v1.x,
    y: v3.y - v1.y,
    z: v3.z - v1.z,
  }

  // Calculate cross product
  const cross = {
    x: v12.y * v13.z - v12.z * v13.y,
    y: v12.z * v13.x - v12.x * v13.z,
    z: v12.x * v13.y - v12.y * v13.x,
  }

  // Calculate magnitude of cross product (which is 2 * area)
  return Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z) / 2
}

// Cache for print speeds to avoid recalculation
const printSpeedsCache: Record<string, ReturnType<typeof getPrintSpeeds>> = {}

// Optimized print parameters calculation
export function calculatePrintParameters(
  stlData: STLData,
  params: {
    layerHeight: number
    infill: number
    quality: string
    supports: boolean
    wallThickness: number
  },
): {
  printTimeMinutes: number
  materialUsageGrams: number
  layerCount: number
  estimatedPowerConsumption: number
} {
  // Calculate dimensions once
  const dimensions = {
    x: stlData.boundingBox.max.x - stlData.boundingBox.min.x,
    y: stlData.boundingBox.max.y - stlData.boundingBox.min.y,
    z: stlData.boundingBox.max.z - stlData.boundingBox.min.z,
  }

  // Use constants for common values
  const NOZZLE_WIDTH = 0.4 // mm
  const PLA_DENSITY = 1.24 // g/cm³

  // Calculate layer count
  const layerCount = Math.ceil(dimensions.z / params.layerHeight)

  // Calculate perimeter length (optimized)
  const averagePerimeter = 2 * (dimensions.x + dimensions.y)

  // Calculate wall layers
  const wallLayers = Math.ceil(params.wallThickness / NOZZLE_WIDTH)

  // Calculate shell volume
  const shellVolume = stlData.surfaceArea * (wallLayers * NOZZLE_WIDTH)

  // Calculate infill volume (optimized)
  const infillVolume = (stlData.volume - shellVolume) * (params.infill / 100)

  // Calculate support volume if needed
  const supportVolume = params.supports ? estimateSupportVolume(stlData) : 0

  // Calculate total material volume
  const totalVolume = shellVolume + infillVolume + supportVolume

  // Convert to weight (g)
  const materialWeight = (totalVolume / 1000) * PLA_DENSITY

  // Get print speeds (using cache)
  const speeds = printSpeedsCache[params.quality] || (printSpeedsCache[params.quality] = getPrintSpeeds(params.quality))

  // Calculate print time
  const printTime = calculatePrintTime({
    layerCount,
    averagePerimeter,
    infillVolume,
    shellVolume,
    supportVolume,
    speeds,
    layerHeight: params.layerHeight,
  })

  // Calculate power consumption
  const estimatedPowerConsumption = (printTime / 60) * 0.1 // Approx 0.1 kWh per hour

  return {
    printTimeMinutes: Math.min(Math.round(printTime), 1440), // Cap at 24 hours for realism
    materialUsageGrams: Math.round(materialWeight * 10) / 10,
    layerCount,
    estimatedPowerConsumption: Math.round(estimatedPowerConsumption * 100) / 100,
  }
}

// Optimized print speeds calculation
function getPrintSpeeds(quality: string): {
  perimeter: number
  infill: number
  support: number
  travel: number
  firstLayer: number
} {
  // Lookup table for speeds
  const speedsTable = {
    draft: { perimeter: 60, infill: 80, support: 90, travel: 150, firstLayer: 30 },
    standard: { perimeter: 45, infill: 60, support: 70, travel: 120, firstLayer: 25 },
    high: { perimeter: 30, infill: 45, support: 50, travel: 100, firstLayer: 20 },
    engineering: { perimeter: 20, infill: 30, support: 35, travel: 80, firstLayer: 15 },
  }

  return speedsTable[quality as keyof typeof speedsTable] || speedsTable.standard
}

// Optimized print time calculation
function calculatePrintTime(params: {
  layerCount: number
  averagePerimeter: number
  infillVolume: number
  shellVolume: number
  supportVolume: number
  speeds: ReturnType<typeof getPrintSpeeds>
  layerHeight: number
}): number {
  const { layerCount, averagePerimeter, infillVolume, shellVolume, supportVolume, speeds, layerHeight } = params

  // Constants
  const NOZZLE_WIDTH = 0.4 // mm
  const SETUP_TIME = 5 // minutes
  const LAYER_CHANGE_TIME = 1 // seconds
  const ACCELERATION_FACTOR = 1.15

  // First layer (slower)
  const firstLayerTime = (averagePerimeter / speeds.firstLayer) * 60

  // Remaining perimeters
  const perimeterTime = (((layerCount - 1) * averagePerimeter) / speeds.perimeter) * 60

  // Infill
  const infillLineLength = infillVolume / (layerHeight * NOZZLE_WIDTH)
  const infillTime = (infillLineLength / speeds.infill) * 60

  // Support
  const supportTime = supportVolume > 0 ? (supportVolume / (layerHeight * NOZZLE_WIDTH) / speeds.support) * 60 : 0

  // Travel
  const layerChanges = layerCount - 1
  const layerChangeTime = layerChanges * LAYER_CHANGE_TIME
  const travelDistance = layerCount * (averagePerimeter * 0.3)
  const travelTime = (travelDistance / speeds.travel) * 60 + layerChangeTime

  // Total time with acceleration factor
  const totalTime = (firstLayerTime + perimeterTime + infillTime + supportTime + travelTime) * ACCELERATION_FACTOR

  // Add setup time and ensure minimum time
  return Math.max(totalTime + SETUP_TIME, 10)
}

// Optimized support volume estimation
function estimateSupportVolume(stlData: STLData): number {
  // Quick approximation based on model volume
  // This is much faster than analyzing each triangle
  const modelVolume = stlData.volume
  const supportDensity = 0.15 // 15% density

  // Estimate that 20% of the model needs support
  return modelVolume * 0.2 * supportDensity
}

