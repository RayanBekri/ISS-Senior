"use client"

import React, { useState, useRef, useCallback } from "react"
import { Upload, AlertCircle } from "lucide-react"
import dynamic from "next/dynamic"
import { customOrdersApi } from "../api/apiService"

// Dynamically import the ModelViewer component with no SSR
// This improves initial page load performance
const ModelViewer = dynamic(() => import("./model-viewer"), { ssr: false })

export default function SlicerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [priceEstimate, setPriceEstimate] = useState<number | null>(null)
  const [slicingResult, setSlicingResult] = useState<{
    printTimeMinutes: number
    materialUsageGrams?: number
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Use useCallback for event handlers to prevent unnecessary re-creation
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPriceEstimate(null)
    setSlicingResult(null)

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check file type - only allow STL
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (fileExtension !== "stl") {
        setError("Please upload an STL file only")
        return
      }

      // Check file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size exceeds 50MB limit")
        return
      }

      setFile(selectedFile)

      // Create a blob URL for the file - this helps with CORS issues
      const url = URL.createObjectURL(selectedFile)
      setFileUrl(url)
    }
  }, [])

  // Update the getApproximateQuote function to better handle file uploads
  const getApproximateQuote = useCallback(async () => {
    if (!file) {
      setError("Please upload an STL file first")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create a new FormData instance
      const formData = new FormData()

      // Log file details for debugging
      console.log("Uploading file:", file.name, file.size, "bytes", file.type)

      // Append the file with the correct field name
      formData.append("model", file)

      // Call the API to get the estimate
      const result = await customOrdersApi.estimatePrice(formData)
      console.log("Received estimate result:", result)

      // Convert time from hours to minutes for UI consistency
      const printTimeMinutes = Math.round(result.time * 60)

      setSlicingResult({
        printTimeMinutes: printTimeMinutes,
      })

      setPriceEstimate(result.price)
    } catch (err) {
      console.error("Error getting price estimate:", err)
      setError(err instanceof Error ? err.message : "Failed to get price estimate")
    } finally {
      setIsLoading(false)
    }
  }, [file])

  const resetFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl)
      }
      setFile(null)
      setFileUrl(null)
      setPriceEstimate(null)
      setSlicingResult(null)
    },
    [fileUrl],
  )

  // Clean up blob URL when component unmounts or fileUrl changes
  React.useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl)
      }
    }
  }, [fileUrl])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">3D Print Quote Calculator</h1>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Your 3D Model</h2>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#a408c3] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".stl" className="hidden" />

            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />

            {file ? (
              <div>
                <p className="text-lg font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button className="mt-4 text-[#a408c3] hover:text-[#8a06a3] text-sm" onClick={resetFile}>
                  Choose a different file
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-900">Drag and drop your STL file here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
                <p className="mt-2 text-xs text-gray-400">Supports STL files up to 50MB</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          )}
        </div>

        {/* 3D Model Preview - Only render when needed */}
        {fileUrl && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">3D Model Preview</h2>
            <ModelViewer fileUrl={fileUrl} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              You can rotate, zoom, and pan to inspect your model
            </p>
          </div>
        )}

        {/* Quote Button */}
        {file && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <button
              onClick={getApproximateQuote}
              disabled={isLoading || !file}
              className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Calculating Quote...
                </div>
              ) : (
                "Get Approximate Quote"
              )}
            </button>
          </div>
        )}

        {/* Quote Results - Only render when needed */}
        {priceEstimate !== null && slicingResult && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quote Results</h2>

            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-700">Estimated Print Time:</span>
                <span className="font-medium">
                  {Math.floor(slicingResult.printTimeMinutes / 60)} hours{" "}
                  {Math.round(slicingResult.printTimeMinutes % 60)} minutes
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-lg font-bold text-gray-900">Total Price:</span>
                <span className="text-2xl font-bold text-[#a408c3]">{priceEstimate.toFixed(3)} TND</span>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                This is an approximate quote based on standard print settings. For custom settings or special
                requirements, please contact our team.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
