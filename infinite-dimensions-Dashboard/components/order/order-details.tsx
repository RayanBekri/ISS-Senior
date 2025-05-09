"use client"

import { useState } from "react"

interface OrderDetailsProps {
  type: "shop" | "printer"
  orderId: string
}

export function OrderDetails({ type, orderId }: OrderDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Sample shop order details
  const shopOrderDetails = {
    products: [
      {
        id: "021231",
        name: "Product 1",
        category: "SPECIAL GIFT",
        color: "RED",
        unitPrice: "27.00DT",
        qty: 1,
        discount: "5%",
        total: "40.50DT",
      },
      {
        id: "021231",
        name: "Product 2",
        category: "ORIGINAL DESIGNS",
        color: "PINK",
        unitPrice: "27.00DT",
        qty: 1,
        discount: "5%",
        total: "40.50DT",
      },
    ],
    summary: {
      subtotal: "81.00 DT",
      shipping: "8.00 DT",
      discount: "4.05 DT",
      total: "84.95 DT",
    },
  }

  // Sample printer order details
  const printerOrderDetails = {
    models: [
      {
        id: "#1",
        name: "Model1.png",
        price: "27.00DT",
        qty: 1,
        total: "27.00DT",
      },
      {
        id: "#2",
        name: "Model2.png",
        price: "27.00DT",
        qty: 1,
        total: "27.00DT",
      },
      {
        id: "#3",
        name: "Model3.png",
        price: "27.00DT",
        qty: 1,
        total: "27.00DT",
      },
    ],
    summary: {
      subtotal: "81.00 DT",
      shipping: "8.00 DT",
      discount: "0.00 DT",
      total: "89.00 DT",
    },
  }

  if (type === "shop") {
    return (
      <div className="bg-gray-50 p-4 border-b">
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs border-b bg-gray-100">
                <th className="py-2 px-4 font-medium">#</th>
                <th className="py-2 px-4 font-medium">PRODUCT</th>
                <th className="py-2 px-4 font-medium">CATEGORY</th>
                <th className="py-2 px-4 font-medium">COLOR</th>
                <th className="py-2 px-4 font-medium">UNIT PRICE</th>
                <th className="py-2 px-4 font-medium">QTY</th>
                <th className="py-2 px-4 font-medium">DISC.</th>
                <th className="py-2 px-4 font-medium">TOTAL</th>
                <th className="py-2 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {shopOrderDetails.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm">{product.id}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 1.5L1.5 4.5L8 7.5L14.5 4.5L8 1.5Z"
                            stroke="#6B7280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.5 11.5L8 14.5L14.5 11.5"
                            stroke="#6B7280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.5 8L8 11L14.5 8"
                            stroke="#6B7280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4 text-sm">{product.color}</td>
                  <td className="py-3 px-4 text-sm">{product.unitPrice}</td>
                  <td className="py-3 px-4 text-sm">x{product.qty}</td>
                  <td className="py-3 px-4 text-sm">{product.discount}</td>
                  <td className="py-3 px-4 text-sm">{product.total}</td>
                  <td className="py-3 px-4 text-sm">
                    <button className="p-1 rounded-full hover:bg-gray-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.6667 4L3.33333 4"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66667 7.33333V11.3333"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33333 7.33333V11.3333"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6667 4V13.3333C11.6667 13.5101 11.5964 13.6797 11.4714 13.8047C11.3464 13.9298 11.1768 14 11 14H5C4.82319 14 4.65362 13.9298 4.5286 13.8047C4.40357 13.6797 4.33333 13.5101 4.33333 13.3333V4"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.3333 4V2.66667C10.3333 2.31305 10.1929 1.97391 9.94281 1.72386C9.69276 1.47381 9.35362 1.33333 9 1.33333H7C6.64638 1.33333 6.30724 1.47381 6.05719 1.72386C5.80714 1.97391 5.66667 2.31305 5.66667 2.66667V4"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{shopOrderDetails.summary.subtotal}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>{shopOrderDetails.summary.shipping}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-red-500">
              <span>Discount</span>
              <span>{shopOrderDetails.summary.discount}</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-medium border-t mt-2">
              <span>Total</span>
              <span>{shopOrderDetails.summary.total}</span>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-gray-50 p-4 border-b">
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs border-b bg-gray-100">
                <th className="py-2 px-4 font-medium">#</th>
                <th className="py-2 px-4 font-medium">MODEL NO</th>
                <th className="py-2 px-4 font-medium">MODELS</th>
                <th className="py-2 px-4 font-medium">PRICE</th>
                <th className="py-2 px-4 font-medium">QTY</th>
                <th className="py-2 px-4 font-medium">TOTAL</th>
                <th className="py-2 px-4 font-medium">MATERIALS</th>
                <th className="py-2 px-4 font-medium">DOWNLOAD</th>
                <th className="py-2 px-4 font-medium">PRINT</th>
                <th className="py-2 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {printerOrderDetails.models.map((model, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm">{model.id}</td>
                  <td className="py-3 px-4 text-sm">{model.id}</td>
                  <td className="py-3 px-4 text-sm">{model.name}</td>
                  <td className="py-3 px-4 text-sm">{model.price}</td>
                  <td className="py-3 px-4 text-sm">x{model.qty}</td>
                  <td className="py-3 px-4 text-sm">{model.total}</td>
                  <td className="py-3 px-4 text-sm">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 3.33333V12.6667"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.33334 8H12.6667"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.66667 6.66667L8 10L11.3333 6.66667"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10V2"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 6H12V13.3333C12 13.5101 11.9298 13.6797 11.8047 13.8047C11.6797 13.9298 11.5101 14 11.3333 14H4.66667C4.48986 14 4.32029 13.9298 4.19526 13.8047C4.07024 13.6797 4 13.5101 4 13.3333V6Z"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6V4.66667C6 4.31305 6.14048 3.97391 6.39052 3.72386C6.64057 3.47381 6.97971 3.33333 7.33333 3.33333H8.66667C9.02029 3.33333 9.35943 3.47381 9.60948 3.72386C9.85952 3.97391 10 4.31305 10 4.66667V6"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.66667 6H13.3333"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 4H3.33333H14"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66667 7.33333V11.3333"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33333 7.33333V11.3333"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.66667 4V13.3333C4.66667 13.6869 4.80714 14.0261 5.05719 14.2761C5.30724 14.5262 5.64638 14.6667 6 14.6667H10C10.3536 14.6667 10.6928 14.5262 10.9428 14.2761C11.1929 14.0261 11.3333 13.6869 11.3333 13.3333V4"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{printerOrderDetails.summary.subtotal}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>{printerOrderDetails.summary.shipping}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-red-500">
              <span>Discount</span>
              <span>{printerOrderDetails.summary.discount}</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-medium border-t mt-2">
              <span>Total</span>
              <span>{printerOrderDetails.summary.total}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
