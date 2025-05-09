export interface ShopOrder {
  id: string
  orderNumber: string
  date: string
  customerName: string
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  amount: string
  profit: string
  profitPercentage: string
  deliveryAddress: string
  products: {
    id: string
    name: string
    price: string
    qty: string
    total: string
  }[]
  subtotal: string
  shipping: string
  discount: string
  total: string
}

export interface PrinterOrder {
  id: string
  orderNumber: string
  date: string
  customerName: string
  coloring: "Multicolor" | "Single Color"
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  amount: string
  profit: string
  profitPercentage: string
  priority: "Low" | "Medium" | "High"
  deliveryAddress: string
  models: {
    id: string
    modelNo: string
    name: string
    price: string
    qty: string
    total: string
  }[]
  subtotal: string
  shipping: string
  discount: string
  total: string
}

export interface PrinterOrderModel {
  id: string
  modelNo: string
  name: string
  price: string
  qty: string
  total: string
}

export interface ShopOrderProduct {
  id: string
  name: string
  price: string
  qty: string
  total: string
}

// Mock data for shop orders
let shopOrdersData: ShopOrder[] = [
  {
    id: "59217",
    orderNumber: "59217342",
    date: "01/03/2025",
    customerName: "Cody Fisher",
    status: "Pending",
    amount: "80.50DT",
    profit: "12.88DT",
    profitPercentage: "16%",
    deliveryAddress: "Street, City, State, Country",
    products: [
      { id: "#1", name: "Model1.png", price: "27.00DT", qty: "1", total: "27.00DT" },
      { id: "#2", name: "Model2.png", price: "27.00DT", qty: "1", total: "27.00DT" },
      { id: "#3", name: "Model3.png", price: "27.00DT", qty: "1", total: "27.00DT" },
    ],
    subtotal: "81.00 DT",
    shipping: "8.00 DT",
    discount: "0.00 DT",
    total: "89.00 DT",
  },
  {
    id: "59218",
    orderNumber: "59218342",
    date: "02/03/2025",
    customerName: "Jane Cooper",
    status: "Completed",
    amount: "120.75DT",
    profit: "24.15DT",
    profitPercentage: "20%",
    deliveryAddress: "123 Main St, Anytown, State, Country",
    products: [
      { id: "#1", name: "Product1.png", price: "40.25DT", qty: "2", total: "80.50DT" },
      { id: "#2", name: "Product2.png", price: "40.25DT", qty: "1", total: "40.25DT" },
    ],
    subtotal: "120.75 DT",
    shipping: "10.00 DT",
    discount: "0.00 DT",
    total: "130.75 DT",
  },
]

// Mock data for printer orders
let printerOrdersData: PrinterOrder[] = [
  {
    id: "12345",
    orderNumber: "PO-12345",
    date: "01/03/2025",
    customerName: "Alex Johnson",
    coloring: "Multicolor",
    status: "In Progress",
    amount: "150.00DT",
    profit: "30.00DT",
    profitPercentage: "20%",
    priority: "High",
    deliveryAddress: "456 Oak St, Sometown, State, Country",
    models: [
      { id: "#1", modelNo: "M001", name: "3D Model 1", price: "50.00DT", qty: "2", total: "100.00DT" },
      { id: "#2", modelNo: "M002", name: "3D Model 2", price: "50.00DT", qty: "1", total: "50.00DT" },
    ],
    subtotal: "150.00 DT",
    shipping: "15.00 DT",
    discount: "0.00 DT",
    total: "165.00 DT",
  },
  {
    id: "12346",
    orderNumber: "PO-12346",
    date: "02/03/2025",
    customerName: "Sarah Smith",
    coloring: "Single Color",
    status: "Pending",
    amount: "75.00DT",
    profit: "15.00DT",
    profitPercentage: "20%",
    priority: "Medium",
    deliveryAddress: "789 Pine St, Othertown, State, Country",
    models: [{ id: "#1", modelNo: "M003", name: "3D Model 3", price: "75.00DT", qty: "1", total: "75.00DT" }],
    subtotal: "75.00 DT",
    shipping: "10.00 DT",
    discount: "5.00 DT",
    total: "80.00 DT",
  },
]

// Get all printer orders
export async function getPrinterOrders(): Promise<PrinterOrder[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...printerOrdersData]
}

// Get all shop orders
export async function getShopOrders(): Promise<ShopOrder[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...shopOrdersData]
}

// Update a printer order model
export async function updatePrinterOrderModel(
  orderId: string,
  modelId: string,
  updates: Partial<PrinterOrderModel>,
): Promise<{ success: boolean; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const orderIndex = printerOrdersData.findIndex((order) => order.id === orderId)
  if (orderIndex === -1) {
    return { success: false, message: "Order not found" }
  }

  const modelIndex = printerOrdersData[orderIndex].models.findIndex((model) => model.id === modelId)
  if (modelIndex === -1) {
    return { success: false, message: "Model not found" }
  }

  printerOrdersData[orderIndex].models[modelIndex] = {
    ...printerOrdersData[orderIndex].models[modelIndex],
    ...updates,
  }

  return { success: true }
}

// Update a shop order product
export async function updateShopOrderProduct(
  orderId: string,
  productId: string,
  updates: Partial<ShopOrderProduct>,
): Promise<{ success: boolean; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const orderIndex = shopOrdersData.findIndex((order) => order.id === orderId)
  if (orderIndex === -1) {
    return { success: false, message: "Order not found" }
  }

  const productIndex = shopOrdersData[orderIndex].products.findIndex((product) => product.id === productId)
  if (productIndex === -1) {
    return { success: false, message: "Product not found" }
  }

  shopOrdersData[orderIndex].products[productIndex] = {
    ...shopOrdersData[orderIndex].products[productIndex],
    ...updates,
  }

  return { success: true }
}

// Update a printer order
export async function updatePrinterOrder(
  id: string,
  updates: Partial<PrinterOrder>,
): Promise<{ success: boolean; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const orderIndex = printerOrdersData.findIndex((order) => order.id === id)
  if (orderIndex === -1) {
    return { success: false, message: "Order not found" }
  }

  printerOrdersData[orderIndex] = { ...printerOrdersData[orderIndex], ...updates }
  return { success: true }
}

// Update a shop order
export async function updateShopOrder(
  id: string,
  updates: Partial<ShopOrder>,
): Promise<{ success: boolean; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const orderIndex = shopOrdersData.findIndex((order) => order.id === id)
  if (orderIndex === -1) {
    return { success: false, message: "Order not found" }
  }

  shopOrdersData[orderIndex] = { ...shopOrdersData[orderIndex], ...updates }
  return { success: true }
}

// Create a new printer order
export async function createPrinterOrder(
  orderData: Omit<PrinterOrder, "id" | "orderNumber">,
): Promise<{ success: boolean; message?: string; order?: PrinterOrder }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newId = `${Date.now()}`
  const orderNumber = `PO-${Math.floor(10000 + Math.random() * 90000)}`

  const newOrder: PrinterOrder = {
    id: newId,
    orderNumber,
    ...orderData,
  }

  printerOrdersData.push(newOrder)
  return { success: true, order: newOrder }
}

// Create a new shop order
export async function createShopOrder(
  orderData: Omit<ShopOrder, "id" | "orderNumber">,
): Promise<{ success: boolean; message?: string; order?: ShopOrder }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newId = `${Date.now()}`
  const orderNumber = `SO-${Math.floor(10000 + Math.random() * 90000)}`

  const newOrder: ShopOrder = {
    id: newId,
    orderNumber,
    ...orderData,
  }

  shopOrdersData.push(newOrder)
  return { success: true, order: newOrder }
}

// Perform bulk actions on orders
export async function performBulkAction(
  orderIds: string[],
  action: string,
  orderType: "shop" | "printer",
): Promise<{ success: boolean; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const targetOrders = orderType === "shop" ? shopOrdersData : printerOrdersData
  const validOrderIds = orderIds.filter((id) => targetOrders.some((order) => order.id === id))

  if (validOrderIds.length === 0) {
    return { success: false, message: "No valid orders found" }
  }

  try {
    // Process different bulk actions
    switch (action) {
      case "markCompleted":
        validOrderIds.forEach((id) => {
          const orderIndex = targetOrders.findIndex((order) => order.id === id)
          if (orderIndex !== -1) {
            targetOrders[orderIndex].status = "Completed"
          }
        })
        return { success: true, message: `${validOrderIds.length} orders marked as completed` }

      case "markPending":
        validOrderIds.forEach((id) => {
          const orderIndex = targetOrders.findIndex((order) => order.id === id)
          if (orderIndex !== -1) {
            targetOrders[orderIndex].status = "Pending"
          }
        })
        return { success: true, message: `${validOrderIds.length} orders marked as pending` }

      case "markInProgress":
        validOrderIds.forEach((id) => {
          const orderIndex = targetOrders.findIndex((order) => order.id === id)
          if (orderIndex !== -1) {
            targetOrders[orderIndex].status = "In Progress"
          }
        })
        return { success: true, message: `${validOrderIds.length} orders marked as in progress` }

      case "delete":
        if (orderType === "shop") {
          shopOrdersData = shopOrdersData.filter((order) => !validOrderIds.includes(order.id))
        } else {
          printerOrdersData = printerOrdersData.filter((order) => !validOrderIds.includes(order.id))
        }
        return { success: true, message: `${validOrderIds.length} orders deleted` }

      case "export":
        // In a real application, this would generate and download a CSV or other export format
        return { success: true, message: `${validOrderIds.length} orders prepared for export` }

      case "priorityHigh":
      case "priorityMedium":
      case "priorityLow":
        if (orderType === "printer") {
          const priority = action === "priorityHigh" ? "High" : action === "priorityMedium" ? "Medium" : "Low"
          validOrderIds.forEach((id) => {
            const orderIndex = printerOrdersData.findIndex((order) => order.id === id)
            if (orderIndex !== -1) {
              printerOrdersData[orderIndex].priority = priority as "High" | "Medium" | "Low"
            }
          })
          return { success: true, message: `Priority set to ${priority} for ${validOrderIds.length} orders` }
        } else {
          return { success: false, message: "Priority actions are only available for printer orders" }
        }

      default:
        return { success: false, message: "Unknown action" }
    }
  } catch (error) {
    console.error("Error performing bulk action:", error)
    return { success: false, message: "An error occurred while processing the action" }
  }
}
