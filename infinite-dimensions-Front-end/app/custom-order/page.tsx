"use client"

import { useState } from "react"

export default function CustomOrder() {
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
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Custom Order</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8">
        <div className="space-y-2">
          <label htmlFor="file" className="block text-sm text-gray-400">
            Upload 3D Model
          </label>
          <input
            type="file"
            id="file"
            accept=".stl,.obj,.fbx"
            onChange={handleFileChange}
            className="w-full p-2 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="material" className="block text-sm text-gray-400">
            Material
          </label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
          >
            <option value="" className="bg-black">
              Select a material
            </option>
            <option value="pla" className="bg-black">
              PLA
            </option>
            <option value="abs" className="bg-black">
              ABS
            </option>
            <option value="resin" className="bg-black">
              Resin
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="block text-sm text-gray-400">
            Color
          </label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="e.g., Red, Blue, Custom RGB"
            className="w-full p-2 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-100 transition-colors"
        >
          Get Approximate Quote
        </button>
      </form>
    </div>
  )
}

