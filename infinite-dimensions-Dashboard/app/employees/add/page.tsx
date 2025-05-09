"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ImageIcon } from "lucide-react"

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    cinPassport: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Employees</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
          <span className="mx-2">›</span>
          <Link href="/employees" className="hover:text-purple-600">
            Employees
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-600">Add Employee</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Employee Details */}
        <div className="w-full md:w-1/2 bg-white rounded-md p-6 border">
          <h2 className="text-xl font-medium mb-2">Employee</h2>
          <p className="text-gray-500 text-sm mb-6">
            Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam aenean in velit mattis.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Input name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Input email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Input no phone number"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="Input Role"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CIN/Passport</label>
                <input
                  type="text"
                  name="cinPassport"
                  placeholder="Input CIN / Passport"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  value={formData.cinPassport}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                placeholder="Input address"
                rows={4}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Save Employee
              </button>
              <Link href="/employees" className="flex-1">
                <button
                  type="button"
                  className="w-full py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>

        {/* Right Column - Image Upload */}
        <div className="w-full md:w-1/2 bg-white rounded-md p-6 border">
          <h2 className="text-xl font-medium mb-2">Image Employee</h2>
          <p className="text-gray-500 text-sm mb-2">
            <span className="text-purple-600 font-medium">Note : </span>
            Format photos SVG, PNG, or JPG (Max size 4mb)
          </p>

          <div className="mt-4">
            <label
              htmlFor="photo-upload"
              className="border border-dashed border-purple-300 bg-purple-50 rounded-md p-6 flex flex-col items-center justify-center h-64 cursor-pointer"
            >
              {/* {photo ? (
                <img
                  src={photo || "/placeholder.svg"}
                  alt="Employee"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-purple-400 mb-2" />
                  <span className="text-purple-600">Photo 1</span>
                </>
              )}
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} /> */}
              <ImageIcon className="text-purple-600 mb-2" size={24} />
              <p className="text-purple-600">Photo 1</p>
            </label>
          </div>

          <button className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Save Image</button>
        </div>
      </div>
    </div>
  )
}
