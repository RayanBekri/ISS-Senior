"use client"

import ProductTable from "@/components/products/product-table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Products() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Button asChild>
            <Link href="/products/add">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Manage your product inventory and categories.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="gifts">Gifts</TabsTrigger>
          <TabsTrigger value="toys">Toys</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <ProductTable />
        </TabsContent>
        <TabsContent value="gifts" className="mt-4">
          <ProductTable />
        </TabsContent>
        <TabsContent value="toys" className="mt-4">
          <ProductTable />
        </TabsContent>
        <TabsContent value="accessories" className="mt-4">
          <ProductTable />
        </TabsContent>
        <TabsContent value="other" className="mt-4">
          <ProductTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
