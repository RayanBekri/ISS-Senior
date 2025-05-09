"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MoreHorizontal, Search, PlusCircle, Filter, Download, Trash2, Edit, Eye } from "lucide-react"
import Link from "next/link"

// Sample product data
const products = [
  {
    id: "PRD-001",
    name: "Custom 3D Printed Figurine",
    price: 29.99,
    size: "Medium",
    quantity: 15,
    date: "2023-10-15",
    status: "in-stock",
    category: "Gifts",
    image: "/placeholder.svg?key=fvdpp",
  },
  {
    id: "PRD-002",
    name: "3D Printed Phone Stand",
    price: 14.99,
    size: "Small",
    quantity: 8,
    date: "2023-10-12",
    status: "low-stock",
    category: "Accessories",
    image: "/placeholder.svg?key=vyeak",
  },
  {
    id: "PRD-003",
    name: "Custom Desk Organizer",
    price: 24.99,
    size: "Large",
    quantity: 0,
    date: "2023-10-10",
    status: "out-of-stock",
    category: "Home Decor",
    image: "/placeholder.svg?key=2ab71",
  },
  {
    id: "PRD-004",
    name: "3D Printed Puzzle Cube",
    price: 19.99,
    size: "Small",
    quantity: 12,
    date: "2023-10-08",
    status: "in-stock",
    category: "Toys",
    image: "/placeholder.svg?key=gj99e",
  },
  {
    id: "PRD-005",
    name: "Personalized Keychains",
    price: 9.99,
    size: "Small",
    quantity: 25,
    date: "2023-10-05",
    status: "in-stock",
    category: "Accessories",
    image: "/placeholder.svg?key=d6y9j",
  },
]

const statusColorMap = {
  "in-stock": "green",
  "low-stock": "yellow",
  "out-of-stock": "red",
}

const categoryColorMap = {
  Gifts: "blue",
  Accessories: "purple",
  "Home Decor": "pink",
  Toys: "orange",
}

const ProductTable = () => {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const isProductSelected = (productId: string) => selectedProducts.includes(productId)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete products</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedProducts.length} product(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search products..."
            className="max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Category</DropdownMenuItem>
              <DropdownMenuItem>Price</DropdownMenuItem>
              <DropdownMenuItem>Date Created</DropdownMenuItem>
              <DropdownMenuItem>Inventory</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {selectedProducts.length > 0 ? (
            <Button variant="destructive" onClick={() => setOpen(true)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          ) : (
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>
      </div>
      <div className="border rounded-md mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Input type="checkbox" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <Input
                    type="checkbox"
                    checked={isProductSelected(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="capitalize"
                    style={{ backgroundColor: categoryColorMap[product.category] }}
                  >
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="capitalize"
                    style={{ backgroundColor: statusColorMap[product.status] }}
                  >
                    {product.quantity} {product.status}
                  </Badge>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        <Link href={`/products/${product.id}`}>View</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductTable
