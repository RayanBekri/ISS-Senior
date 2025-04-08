"use client"

import { useState, useEffect } from "react"
import type { FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Mail,
  Building,
  CreditCard,
  Lock,
  CheckCircle,
  ChevronRight,
  Home,
  Bell,
  ShoppingBag,
  LogOut,
  Save,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { authApi } from "../api/apiService"

export default function AccountPage() {
  const { user, token, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  })
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    setShowConfirmation(false)

    try {
      if (!token) throw new Error("Not authenticated")
      await authApi.changePassword(token, passwordData)
      setSuccess("Password changed successfully")
      setPasswordData({ oldPassword: "", newPassword: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault()
    // This would connect to a profile update API
    setSuccess("Profile information updated successfully")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#a408c3] flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Account Settings</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full bg-[#a408c3] bg-opacity-10 flex items-center justify-center">
                  <User className="w-8 h-8 text-[#a408c3]" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    {user.first_name || "User"} {user.last_name || ""}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "profile"
                      ? "bg-[#a408c3] bg-opacity-10 text-[#a408c3]"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span>Profile Information</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center p-3 rounded-md text-left ${
                    activeTab === "security"
                      ? "bg-[#a408c3] bg-opacity-10 text-[#a408c3]"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Lock className="w-5 h-5 mr-3" />
                  <span>Security</span>
                </button>

                {user.is_company && (
                  <button
                    onClick={() => setActiveTab("company")}
                    className={`w-full flex items-center p-3 rounded-md text-left ${
                      activeTab === "company"
                        ? "bg-[#a408c3] bg-opacity-10 text-[#a408c3]"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Building className="w-5 h-5 mr-3" />
                    <span>Company Details</span>
                  </button>
                )}

                <Link
                  href="/orders"
                  className="w-full flex items-center p-3 rounded-md text-left hover:bg-gray-100 text-gray-700"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  <span>Order History</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 rounded-md text-left hover:bg-gray-100 text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#a408c3] to-[#8a06a3] rounded-lg shadow-sm p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm mb-4 opacity-90">
                Our support team is here to assist you with any questions or issues.
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center text-sm bg-white text-[#a408c3] px-3 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <User className="w-5 h-5 mr-2 text-[#a408c3]" />
                      Profile Information
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Update your personal information and how we can reach you
                    </p>
                  </div>
                </div>

                {success && activeTab === "profile" && (
                  <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-green-700 text-sm">{success}</div>
                  </div>
                )}

                <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="first_name"
                          value={profileData.first_name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setProfileData({ ...profileData, first_name: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="last_name"
                          value={profileData.last_name}
                          onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={profileData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">To change your email address, please contact support</p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center bg-[#a408c3] text-white py-2 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-[#a408c3]" />
                      Security Settings
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your password and account security</p>
                  </div>
                </div>

                {error && (
                  <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-red-700 text-sm">{error}</div>
                  </div>
                )}

                {success && activeTab === "security" && (
                  <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-green-700 text-sm">{success}</div>
                  </div>
                )}

                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault()
                    setShowConfirmation(true)
                  }}
                  className="p-6 space-y-6"
                >
                  <div>
                    <label htmlFor="old_password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        id="old_password"
                        value={passwordData.oldPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPasswordData({ ...passwordData, oldPassword: e.target.value })
                        }
                        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        required
                        disabled={isLoading}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="new_password"
                        value={passwordData.newPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                        required
                        disabled={isLoading}
                        minLength={8}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading || !passwordData.oldPassword || !passwordData.newPassword}
                      className="flex items-center justify-center bg-[#a408c3] text-white py-2 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Change Password
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="border-t border-gray-200 p-6">
                  <h3 className="font-medium mb-4">Account Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-[#a408c3] mr-3" />
                        <div>
                          <p className="font-medium">Email Verification</p>
                          <p className="text-sm text-gray-500">Your email has been verified</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-[#a408c3] mr-3" />
                        <div>
                          <p className="font-medium">Login Notifications</p>
                          <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a408c3]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === "company" && user.is_company && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Building className="w-5 h-5 mr-2 text-[#a408c3]" />
                      Company Information
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your company details and tax information</p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={user.company_name || ""}
                          disabled
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={user.company_tax_number || ""}
                          disabled
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                    <p className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      To update your company information, please contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Password Change</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to change your password? You'll be logged out of all other devices.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-[#a408c3] text-white rounded-md hover:bg-[#8a06a3]"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
