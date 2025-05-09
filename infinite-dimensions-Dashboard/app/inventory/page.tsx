"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Pencil, Trash2, Plus } from "lucide-react"
import { AddMaterialDialog } from "@/components/inventory/add-material-dialog"
import { ViewMaterialDialog } from "@/components/inventory/view-material-dialog"
import { EditMaterialDialog } from "@/components/inventory/edit-material-dialog"
import { DeleteMaterialDialog } from "@/components/inventory/delete-material-dialog"

// Define the Material type
interface Material {
  id: string
  name: string
  category: "Shop Material" | "Printing Material"
  quantity: string
  price: string
  supplier: string
  status: "Low in Stock" | "High in Stock"
}

// Sample data
const initialMaterials: Material[] = [
  {
    id: "59237",
    name: "Material 1",
    category: "Shop Material",
    quantity: "500g",
    price: "80.5DT",
    supplier: "Supplier 1",
    status: "Low in Stock",
  },
  {
    id: "59239",
    name: "Material 2",
    category: "Printing Material",
    quantity: "5kg",
    price: "80.5DT",
    supplier: "Supplier 2",
    status: "High in Stock",
  },
  {
    id: "59219",
    name: "Material 3",
    category: "Shop Material",
    quantity: "500g",
    price: "80.5DT",
    supplier: "Supplier 3",
    status: "Low in Stock",
  },
  {
    id: "59220",
    name: "Material 4",
    category: "Shop Material",
    quantity: "600 units",
    price: "80.5DT",
    supplier: "Supplier 4",
    status: "High in Stock",
  },
  {
    id: "59223",
    name: "Material 5",
    category: "Printing Material",
    quantity: "75 units",
    price: "80.5DT",
    supplier: "Supplier 5",
    status: "Low in Stock",
  },
  {
    id: "59282",
    name: "Material 6",
    category: "Printing Material",
    quantity: "80 units",
    price: "80.5DT",
    supplier: "Supplier 6",
    status: "Low in Stock",
  },
  {
    id: "59282",
    name: "Material 7",
    category: "Printing Material",
    quantity: "65 units",
    price: "80.5DT",
    supplier: "Supplier 7",
    status: "Low in Stock",
  },
  {
    id: "59282",
    name: "Material 8",
    category: "Shop Material",
    quantity: "60 units",
    price: "80.5DT",
    supplier: "Supplier 8",
    status: "Low in Stock",
  },
  {
    id: "59282",
    name: "Material 9",
    category: "Printing Material",
    quantity: "70 units",
    price: "80.5DT",
    supplier: "Supplier 9",
    status: "Low in Stock",
  },
  {
    id: "59282",
    name: "Material 10",
    category: "Shop Material",
    quantity: "45 units",
    price: "80.5DT",
    supplier: "Supplier 10",
    status: "Low in Stock",
  },
]

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials)
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(initialMaterials)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMaterial, setViewMaterial] = useState<Material | null>(null)
  const [editMaterial, setEditMaterial] = useState<Material | null>(null)
  const [deleteMaterial, setDeleteMaterial] = useState<Material | null>(null)

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredMaterials.slice(startIndex, endIndex)
  const totalItems = filteredMaterials.length

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    filterMaterials(value, statusFilter, categoryFilter)
  }

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterMaterials(searchTerm, status, categoryFilter)
  }

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category)
    filterMaterials(searchTerm, statusFilter, category)
  }

  // Filter materials based on search term and filters
  const filterMaterials = (search: string, status: string, category: string) => {
    let filtered = materials

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (material) =>
          material.id.toLowerCase().includes(search.toLowerCase()) ||
          material.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((material) => material.status === status)
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((material) => material.category === category)
    }

    setFilteredMaterials(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Handle add material
  const handleAddMaterial = (newMaterial: Material) => {
    const updatedMaterials = [...materials, newMaterial]
    setMaterials(updatedMaterials)
    setFilteredMaterials(updatedMaterials)
    setIsAddDialogOpen(false)
  }

  // Handle edit material
  const handleEditMaterial = (updatedMaterial: Material) => {
    const updatedMaterials = materials.map((material) =>
      material.id === updatedMaterial.id ? updatedMaterial : material,
    )
    setMaterials(updatedMaterials)
    setFilteredMaterials(updatedMaterials)
    setEditMaterial(null)
  }

  // Handle delete material
  const handleDeleteMaterial = (id: string) => {
    const updatedMaterials = materials.filter((material) => material.id !== id)
    setMaterials(updatedMaterials)
    setFilteredMaterials(updatedMaterials)
    setDeleteMaterial(null)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-bold">Inventory</h1>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span className="text-purple-600">Inventory</span>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-xl font-semibold mb-4">Overview</h2>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="mr-2">Material ID</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Filter by Status</option>
              <option value="Low in Stock">Low in Stock</option>
              <option value="High in Stock">High in Stock</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Filter by Category</option>
              <option value="Shop Material">Shop Material</option>
              <option value="Printing Material">Printing Material</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Materials
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supply Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((material, index) => (
              <tr key={`${material.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      material.status === "Low in Stock" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {material.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMaterial(material)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label="View material"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditMaterial(material)}
                      className="text-green-600 hover:text-green-900"
                      aria-label="Edit material"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setDeleteMaterial(material)}
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete material"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded ${currentPage === 1 ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
          >
            &lt;
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Calculate page numbers to show
            let pageNum = i + 1
            if (totalPages > 5) {
              if (currentPage > 3) {
                pageNum = currentPage - 3 + i
              }
              if (currentPage > totalPages - 2) {
                pageNum = totalPages - 4 + i
              }
            }
            return (
              pageNum <= totalPages && (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded ${
              currentPage === totalPages ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Add Material Dialog */}
      <AddMaterialDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={handleAddMaterial} />

      {/* View Material Dialog */}
      {viewMaterial && (
        <ViewMaterialDialog isOpen={!!viewMaterial} material={viewMaterial} onClose={() => setViewMaterial(null)} />
      )}

      {/* Edit Material Dialog */}
      {editMaterial && (
        <EditMaterialDialog
          isOpen={!!editMaterial}
          material={editMaterial}
          onClose={() => setEditMaterial(null)}
          onEdit={handleEditMaterial}
        />
      )}

      {/* Delete Material Dialog */}
      {deleteMaterial && (
        <DeleteMaterialDialog
          isOpen={!!deleteMaterial}
          material={deleteMaterial}
          onClose={() => setDeleteMaterial(null)}
          onDelete={() => handleDeleteMaterial(deleteMaterial.id)}
        />
      )}
    </div>
  )
}
