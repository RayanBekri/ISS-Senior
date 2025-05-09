import { AddProductForm } from "@/components/products/add-product-form"

export const metadata = {
  title: "Add Product | Infinite Dimensions",
  description: "Add a new product to the Infinite Dimensions inventory",
}

export default function AddProductPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
      </div>
      <AddProductForm />
    </div>
  )
}
