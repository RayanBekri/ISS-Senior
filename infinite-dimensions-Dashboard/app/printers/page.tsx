"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Printer = {
  id: number
  name: string
  model: string
  type: string
  power_usage: string
  buying_cost: string
  lifespan: string
  operational_status: string
}

export default function PrintersPage() {
  const [printers, setPrinters] = useState<Printer[]>([])
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    type: "",
    power_usage: "",
    buying_cost: "",
    lifespan: "",
    operational_status: "Active"
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null) // Track the printer being edited

  // Fetch printers when the component mounts
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/printers")
        const data = await res.json()
        setPrinters(data)
      } catch (error) {
        console.error("Error fetching printers:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPrinters()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      model: "",
      type: "",
      power_usage: "",
      buying_cost: "",
      lifespan: "",
      operational_status: "Active"
    })
    setEditingId(null)
  }

  const handleSavePrinter = async () => {
    try {
      let res;
      if (editingId !== null) {
        // EDIT MODE
        res = await fetch(`http://localhost:3000/api/printers/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error("Failed to update printer")

        const updatedPrinter = await res.json()
        setPrinters(printers.map((p) => (p.id === updatedPrinter.id ? updatedPrinter : p)))
        alert("Printer updated successfully!")
      } else {
        // ADD MODE
        res = await fetch("http://localhost:3000/api/printers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error("Failed to add printer")
        
        const newPrinter = await res.json()
        setPrinters([...printers, newPrinter])
        alert("Printer added successfully!")
      }

      setOpen(false)
      resetForm()
    } catch (error) {
      alert("Error saving printer")
      console.error(error)
    }
  }

  const handleEditClick = (printer: Printer) => {
    setFormData({ ...printer })
    setEditingId(printer.id)
    setOpen(true)
  }

  const handleDeleteClick = async (id: number) => {
    const confirmation = window.confirm("Are you sure you want to delete this printer?")
    if (!confirmation) return

    try {
      const res = await fetch(`http://localhost:3000/api/printers/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete printer")

      setPrinters(printers.filter((printer) => printer.id !== id))
      alert("Printer deleted successfully!")
    } catch (error) {
      alert("Error deleting printer")
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Printers</h1>
        <button
          onClick={() => {
            resetForm()
            setOpen(true)
          }}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Add Printer
        </button>
      </div>

      {loading ? (
        <p>Loading printers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Model</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Power Usage</th>
                <th className="py-2 px-4 border">Cost</th>
                <th className="py-2 px-4 border">Lifespan</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {printers.map((printer) => (
                <tr key={printer.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{printer.name}</td>
                  <td className="py-2 px-4 border">{printer.model}</td>
                  <td className="py-2 px-4 border">{printer.type}</td>
                  <td className="py-2 px-4 border">{printer.power_usage}</td>
                  <td className="py-2 px-4 border">{printer.buying_cost}</td>
                  <td className="py-2 px-4 border">{printer.lifespan}</td>
                  <td className="py-2 px-4 border capitalize">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        printer.operational_status.toLowerCase() === "active"
                          ? "bg-green-500"
                          : printer.operational_status.toLowerCase() === "maintenance"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {printer.operational_status
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleEditClick(printer)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(printer.id)}
                      className="ml-2 text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId !== null ? "Edit Printer" : "Add New Printer"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {["name", "model", "type", "power_usage", "buying_cost", "lifespan"].map((field) => (
              <div key={field}>
                <label className="block capitalize">{field.replace("_", " ")}</label>
                <input
                  name={field}
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block">Status</label>
              <select
                name="operational_status"
                className="w-full border p-2 rounded"
                value={formData.operational_status}
                onChange={(e) => setFormData({ ...formData, operational_status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="Decommissioned">Decommissioned</option>
              </select>
            </div>

            <button
              onClick={handleSavePrinter}
              className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800"
            >
              {editingId !== null ? "Update Printer" : "Add Printer"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
