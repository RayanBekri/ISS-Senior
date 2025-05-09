"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Printer,
  Package,
  Users,
  Calendar,
  UserCheck,
  Settings,
  LogOut,
  Archive,
} from "lucide-react"

// Using default export - this is the correct way
export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Order", icon: BarChart3, path: "/order" },
    { name: "Finance", icon: DollarSign, path: "/finance" },
    { name: "Printers", icon: Printer, path: "/printers" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Inventory", icon: Archive, path: "/inventory" },
    { name: "Employees", icon: Users, path: "/employees" },
    { name: "Schedule", icon: Calendar, path: "/schedule" },
    { name: "Account confirmation", icon: UserCheck, path: "/account-confirmation" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">ID</span>
          </div>
          <div>
            <div className="text-purple-600 font-bold leading-tight">INFINITE</div>
            <div className="text-purple-600 font-bold leading-tight">DIMENSIONS</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path) ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
