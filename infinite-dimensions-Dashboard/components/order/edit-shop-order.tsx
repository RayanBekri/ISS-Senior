"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Pencil, Trash, Plus } from "lucide-react"
import { updateShopOrder, type ShopOrder } from "@/lib/order-service"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface EditShopOrderProps {
  order: ShopOrder
  onOrderUpdated: () => void
}

export function EditShopOrder({ order, onOrderUpdated }: EditShopOrderProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: order.date,
    customerName: order.customerName,
    amount: order.amount.replace("DT", "").trim(),
    status: order.status,
    deliveryAddress: order.deliveryAddress,
    shipping: order.shipping.replace("DT", "").trim(),
    discount: order.discount.replace("DT", "").trim(),
    products: [...order.products],
  })
  const { toast } = useToast()

  // Reset form data when order changes or dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        date: order.date,
        customerName: order.customerName,
        amount: order.amount.replace("DT", "").trim(),
        status: order.status,
        deliveryAddress: order.deliveryAddress,
        shipping: order.shipping.replace("DT", "").trim(),
        discount: order.discount.replace("DT", "").trim(),
        products: [...order.products],
      })
    }
  }, [order, open])

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
        // Update total if price or qty changes
        ...(field === "price" || field === "qty"
          ? {
              total: `${(Number.parseFloat(value) * Number.parseFloat(field === "price" ? updatedProducts[index].qty : updatedProducts[index].price)).toFixed(2)}DT`,
            }
          : {}),
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
      products: [
        ...prev.products,
        {
          id: `#${prev.products.length + 1}`,
          name: "New Product",
          price: "0.00DT",
          qty: "1",
          total: "0.00DT",
        },
      ],
    }))
  }

  const removeProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  const calculateSubtotal = () => {
    const subtotal = formData.products.reduce((sum, product) => {
      const total = Number.parseFloat(product.total.replace("DT", ""))
      return sum + (isNaN(total) ? 0 : total)
    }, 0)
    return subtotal.toFixed(2)
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

    const subtotal = calculateSubtotal()
    const total = calculateTotal()

    try {
      const result = await updateShopOrder(order.id, {
        date: formData.date,
        customerName: formData.customerName,
        amount: `${formData.amount}DT`,
        status: formData.status as ShopOrder["status"],
        deliveryAddress: formData.deliveryAddress,
        shipping: `${formData.shipping} DT`,
        discount: `${formData.discount} DT`,
        products: formData.products,
        subtotal: `${subtotal} DT`,
        total: `${total} DT`,
      })

      if (result.success) {
        toast({
          title: "Order updated",
          description: "The order has been updated successfully.",
        })
        setOpen(false)
        onOrderUpdated()
      } else {
        toast({
          title: "Update failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating the order.",
        variant: "destructive",
      })
      console.error("Error updating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit order</span>
      </Button>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>Update the order details below. Click save when you're done.</DialogDescription>
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
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button type="button" onClick={addProduct} size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add Product
                  </Button>
                </div>

                {formData.products.map((product, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Product #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="grid gap-3">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`product-name-${index}`} className="text-right">
                            Name
                          </Label>
                          <Input
                            id={`product-name-${index}`}
                            value={product.name}
                            onChange={(e) => handleProductChange(index, "name", e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`product-price-${index}`} className="text-right">
                            Price
                          </Label>
                          <div className="col-span-3 relative">
                            <Input
                              id={`product-price-${index}`}
                              value={product.price.replace("DT", "")}
                              onChange={(e) => handleProductChange(index, "price", e.target.value)}
                              className="pr-8"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              DT
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`product-qty-${index}`} className="text-right">
                            Quantity
                          </Label>
                          <Input
                            id={`product-qty-${index}`}
                            value={product.qty}
                            onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Total</Label>
                          <div className="col-span-3">
                            <span className="text-sm font-medium">
                              {(
                                Number.parseFloat(product.price.replace("DT", "")) * Number.parseFloat(product.qty)
                              ).toFixed(2)}{" "}
                              DT
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="amount"
                      value={formData.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">DT</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shipping" className="text-right">
                    Shipping
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="shipping"
                      value={formData.shipping}
                      onChange={(e) => handleChange("shipping", e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">DT</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discount" className="text-right">
                    Discount
                  </Label>
                  <div className="col-span-3 relative">
                    <Input
                      id="discount"
                      value={formData.discount}
                      onChange={(e) => handleChange("discount", e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">DT</span>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-start-3 text-right">
                      <p className="text-sm text-gray-500">Subtotal:</p>
                      <p className="text-sm text-gray-500 mt-2">Shipping:</p>
                      <p className="text-sm text-gray-500 mt-2">Discount:</p>
                      <p className="font-medium mt-2">Total:</p>
                    </div>
                    <div>
                      <p className="text-sm">{calculateSubtotal()} DT</p>
                      <p className="text-sm mt-2">{formData.shipping} DT</p>
                      <p className="text-sm text-red-500 mt-2">-{formData.discount} DT</p>
                      <p className="font-medium mt-2">{calculateTotal()} DT</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
