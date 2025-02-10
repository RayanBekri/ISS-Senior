"use client"

import type React from "react"
import { useState } from "react"
import Layout from "../components/Layout"

const CustomOrder: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [material, setMaterial] = useState("")
  const [color, setColor] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitted:", { file, material, color })
    // For now, we'll just show an alert
    alert("Your custom order has been submitted!")
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Custom Order</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Upload 3D Model
            </label>
            <input
              type="file"
              id="file"
              accept=".stl,.obj,.fbx"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
              Material
            </label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a material</option>
              <option value="pla">PLA</option>
              <option value="abs">ABS</option>
              <option value="resin">Resin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g., Red, Blue, Custom RGB"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Get Approximate Quote
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default CustomOrder

