"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { createShopOrder } from "@/lib/order-service"

interface CreateShopOrderProps {
  isOpen: boolean
  onClose: () => void
  onOrderCreated: () => void
}

export function CreateShopOrder({ isOpen, onClose, onOrderCreated }: CreateShopOrderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    customerName: "",
    amount: "",
    status: "Pending",
    deliveryAddress: "",
    shipping: "0",
    discount: "0",
    products: [
      {
        name: "",
        price: "",
        qty: "1",
      },
    ],
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleProductChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedProducts = [...prev.products]
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value,
      }
      return {
        ...prev,
        products: updatedProducts,
      }
    })
  }

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", price: "", qty: "1" }],
    }))
  }

  const removeProduct = (index: number) => {
    if (formData.products.length === 1) return
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  const calculateSubtotal = () => {
    return formData.products
      .reduce((total, product) => {
        const price = Number.parseFloat(product.price) || 0
        const qty = Number.parseInt(product.qty) || 0
        return total + price * qty
      }, 0)
      .toFixed(2)
  }

  const calculateTotal = () => {
    const subtotal = Number.parseFloat(calculateSubtotal())
    const shipping = Number.parseFloat(formData.shipping) || 0
    const discount = Number.parseFloat(formData.discount) || 0
    return (subtotal + shipping - discount).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const subtotal = calculateSubtotal()
      const total = calculateTotal()

      const result = await createShopOrder({
        date: formData.date,
        customerName: formData.customerName,
        amount: `${formData.amount}DT`,
        status: formData.status,
        deliveryAddress: formData.deliveryAddress,
        shipping: `${formData.shipping} DT`,
        discount: `${formData.discount} DT`,
        products: formData.products.map((product, index) => ({
          id: `#${index + 1}`,
          name: product.name,
          price: `${product.price}DT`,
          qty: product.qty,
          total: `${(Number.parseFloat(product.price) * Number.parseInt(product.qty)).toFixed(2)}DT`,
        })),
        subtotal: `${subtotal} DT`,
        total: `${total} DT`,
        profit: `${(Number.parseFloat(total) * 0.2).toFixed(2)}DT`,
        profitPercentage: "20%",
      })

      if (result.success) {
        toast({
          title: "Order created",
          description: "The order has been created successfully.",
        })
        onClose()
        onOrderCreated()
      } else {
        toast({
          title: "Creation failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "An error occurred while creating the order.",
        variant: "destructive",
      })
      console.error("Error creating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Shop Order</DialogTitle>
          <DialogDescription>Fill in the details to create a new shop order.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">
                    Customer Name
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleChange("customerName", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Delivery Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.deliveryAddress}
                    onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="space-y-4 py-4">
                {formData.products.map((product, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Product {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeProduct(index)}
                        disabled={formData.products.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`product-name-${index}`} className="text-right">
                          Name
                        </Label>
                        <Input
                          id={`product-name-${index}`}
                          value={product.name}
                          onChange={(e) => handleProductChange(index, "name", e.target.value)}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`product-price-${index}`} className="text-right">
                          Price (DT)
                        </Label>
                        <Input
                          id={`product-price-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, "price", e.target.value)}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor={`product-qty-${index}`} className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id={`product-qty-${index}`}
                          type="number"
                          min="1"
                          value={product.qty}
                          onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addProduct} className="w-full">
                  Add Product
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shipping" className="text-right">
                    Shipping (DT)
                  </Label>
                  <Input
                    id="shipping"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.shipping}
                    onChange={(e) => handleChange("shipping", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discount" className="text-right">
                    Discount (DT)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) => handleChange("discount", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">{calculateSubtotal()} DT</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">Shipping:</span>
                    <span className="text-sm font-medium">{formData.shipping} DT</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">Discount:</span>
                    <span className="text-sm font-medium text-red-600">{formData.discount} DT</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                    <span className="text-base font-medium">Total:</span>
                    <span className="text-base font-bold">{calculateTotal()} DT</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
