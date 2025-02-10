"use client"

import type React from "react"
import { useState } from "react"
import Layout from "../../components/Layout"
import { Eye, EyeOff } from "lucide-react"

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    companyName: "",
    companyTaxNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Login submitted", { email: formData.email, password: formData.password })
      // Implement login logic here
    } else {
      if (!acceptedPolicy) {
        alert("Please accept the policy to register.")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.")
        return
      }
      console.log("Registration submitted", formData)
      // Implement registration logic here
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-8 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-8 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isCompany"
                      name="isCompany"
                      checked={isCompany}
                      onChange={(e) => setIsCompany(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isCompany" className="text-sm text-gray-700">
                      I am a company
                    </label>
                  </div>
                  {isCompany && (
                    <>
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          required={isCompany}
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="companyTaxNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Tax Number
                        </label>
                        <input
                          type="text"
                          id="companyTaxNumber"
                          name="companyTaxNumber"
                          required={isCompany}
                          value={formData.companyTaxNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="acceptPolicy"
                      name="acceptPolicy"
                      checked={acceptedPolicy}
                      onChange={(e) => setAcceptedPolicy(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="acceptPolicy" className="text-sm text-gray-700">
                      I accept the policy
                    </label>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-purple-600 hover:underline">
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage

