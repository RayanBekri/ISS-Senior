"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, Info, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { customOrdersApi } from "../api/apiService"

export default function CustomOrder() {
  const { user, token } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [materialKnowledge, setMaterialKnowledge] = useState<"know" | "unknown">("know")
  const [material, setMaterial] = useState("")
  const [useCase, setUseCase] = useState("")
  const [strength, setStrength] = useState<"strong" | "medium" | "light">("medium")
  const [color, setColor] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAuthMessage, setShowAuthMessage] = useState(false)
  const [estimateLoading, setEstimateLoading] = useState(false)
  const [estimate, setEstimate] = useState<{ time: number; price: number } | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check file type
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (fileExtension !== "stl" && fileExtension !== "3mf") {
        setError("Please upload only STL or 3MF files")
        return
      }

      setFile(selectedFile)

      // Get price estimate
      if (fileExtension === "stl") {
        await getEstimate(selectedFile)
      }
    }
  }

  const getEstimate = async (file: File) => {
    setEstimateLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("model", file)

      const estimateData = await customOrdersApi.estimatePrice(formData)
      setEstimate(estimateData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get price estimate")
    } finally {
      setEstimateLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if user is logged in
    if (!user || !token) {
      setShowAuthMessage(true)
      return
    }

    if (!file) {
      setError("Please upload a 3D model file")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("userId", user.user_id.toString())
      formData.append("material", material || "PLA")
      formData.append("color", color)
      formData.append("strength", strength)
      if (additionalInfo) formData.append("additionalInfo", additionalInfo)
      formData.append("model", file)

      const response = await customOrdersApi.createCustomOrder(token, formData)
      setSubmitSuccess(true)

      // Reset form
      setFile(null)
      setMaterialKnowledge("know")
      setMaterial("")
      setUseCase("")
      setStrength("medium")
      setColor("")
      setAdditionalInfo("")
      setEstimate(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit custom order")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If showing auth message, display that instead of the form
  if (showAuthMessage) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-[#a408c3]" />
          <h1 className="text-2xl font-bold mb-4">Account Required</h1>
          <p className="text-gray-600 mb-6">
            You need to have an account to submit a custom order. This helps us track your orders and provide better
            service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#a408c3] text-white py-2 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors"
            >
              Register Now
            </Link>
            <Link
              href="/login"
              className="border border-[#a408c3] text-[#a408c3] py-2 px-6 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
          <button
            onClick={() => setShowAuthMessage(false)}
            className="mt-6 text-gray-500 hover:text-gray-700 underline"
          >
            Back to Form
          </button>
        </div>
      </div>
    )
  }

  // If order submitted successfully
  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-4">Order Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your custom order. Our team will review your request and contact you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#a408c3] text-white py-2 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors"
            >
              Return to Home
            </Link>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="border border-[#a408c3] text-[#a408c3] py-2 px-6 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors"
            >
              Submit Another Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Custom Order</h1>
          <p className="text-gray-600 mb-8">
            Tell us about your project and we'll bring it to life with our 3D printing expertise.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-900">Upload Your 3D Model</label>
              <p className="text-sm text-gray-500 mb-2">We accept STL or 3MF files up to 50MB</p>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#a408c3]"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".stl,.3mf"
                  className="hidden"
                  required
                />

                {file ? (
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button
                      type="button"
                      className="mt-4 text-[#a408c3] hover:text-[#8a06a3] text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFile(null)
                        setEstimate(null)
                      }}
                    >
                      Choose a different file
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-900">Drag and drop your file here</p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              {/* Price Estimate */}
              {estimateLoading && (
                <div className="mt-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#a408c3] mr-2"></div>
                  <span className="text-gray-600">Calculating estimate...</span>
                </div>
              )}

              {estimate && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-medium text-[#a408c3] mb-2">Preliminary Estimate</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Estimated Print Time:</p>
                      <p className="font-medium">{estimate.time.toFixed(2)} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Price:</p>
                      <p className="font-medium">{estimate.price.toFixed(3)} TND</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This is a preliminary estimate. Final price may vary based on material, quality, and other factors.
                  </p>
                </div>
              )}
            </div>

            {/* Material Knowledge */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-900">Do you know what material you need?</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialKnowledge"
                    checked={materialKnowledge === "know"}
                    onChange={() => setMaterialKnowledge("know")}
                    className="mr-2 accent-[#a408c3]"
                  />
                  Yes, I know
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="materialKnowledge"
                    checked={materialKnowledge === "unknown"}
                    onChange={() => setMaterialKnowledge("unknown")}
                    className="mr-2 accent-[#a408c3]"
                  />
                  I'm not sure
                </label>
              </div>
            </div>

            {/* Material Selection - Only show if user knows */}
            {materialKnowledge === "know" && (
              <div className="space-y-2">
                <label htmlFor="material" className="block text-lg font-medium text-gray-900">
                  Material Type
                </label>
                <select
                  id="material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                  required={materialKnowledge === "know"}
                >
                  <option value="">Select a material</option>
                  <option value="pla">PLA - Standard</option>
                  <option value="pla+">PLA+ - Enhanced Durability</option>
                  <option value="abs">ABS - Heat Resistant</option>
                  <option value="petg">PETG - Strong & Flexible</option>
                  <option value="tpu">TPU - Flexible</option>
                  <option value="nylon">Nylon - Tough & Durable</option>
                  <option value="resin">Resin - High Detail</option>
                </select>
              </div>
            )}

            {/* Use Case Description */}
            <div className="space-y-2">
              <label htmlFor="useCase" className="block text-lg font-medium text-gray-900">
                What will this model be used for?
              </label>
              <p className="text-sm text-gray-500 mb-2">
                This helps us recommend the right material and print settings
              </p>
              <textarea
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="E.g., Decorative display, Functional part, Prototype, etc."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                rows={3}
                required
              />
            </div>

            {/* Strength Selection */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-900">Required Strength</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                    strength === "strong"
                      ? "border-[#a408c3] bg-purple-50 ring-2 ring-[#a408c3]"
                      : "border-gray-300 hover:border-[#a408c3]"
                  }`}
                  onClick={() => setStrength("strong")}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#a408c3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">Strong</h3>
                  <p className="text-xs text-gray-500">High durability for functional parts</p>
                </div>

                <div
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                    strength === "medium"
                      ? "border-[#a408c3] bg-purple-50 ring-2 ring-[#a408c3]"
                      : "border-gray-300 hover:border-[#a408c3]"
                  }`}
                  onClick={() => setStrength("medium")}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#a408c3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                  <h3 className="font-medium">Medium</h3>
                  <p className="text-xs text-gray-500">Balanced strength for most uses</p>
                </div>

                <div
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                    strength === "light"
                      ? "border-[#a408c3] bg-purple-50 ring-2 ring-[#a408c3]"
                      : "border-gray-300 hover:border-[#a408c3]"
                  }`}
                  onClick={() => setStrength("light")}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#a408c3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">Light</h3>
                  <p className="text-xs text-gray-500">Lightweight for decorative items</p>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label htmlFor="color" className="block text-lg font-medium text-gray-900">
                Preferred Color
              </label>
              <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="E.g., Black, White, Red, Custom RGB code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <label htmlFor="additionalInfo" className="block text-lg font-medium text-gray-900">
                Additional Information (Optional)
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any special requirements or details we should know about"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Submitting Order...
                </div>
              ) : (
                "Submit Custom Order"
              )}
            </button>

            {/* Help Note */}
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Not sure what you need? Our team will review your order and contact you with recommendations based on
                your requirements.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

