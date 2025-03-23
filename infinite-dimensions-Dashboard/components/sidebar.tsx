"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  Printer,
  Package,
  Users,
  Calendar,
  UserCheck,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Order", href: "/order", icon: ShoppingCart },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "Printers", href: "/printers", icon: Printer },
  { name: "Products", href: "/products", icon: Package },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Account confirmation", href: "/account-confirmation", icon: UserCheck },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "#", icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-brand rounded flex items-center justify-center">
            <span className="text-white font-bold">ID</span>
          </div>
          <div>
            <h1 className="font-bold text-brand text-lg">INFINITE</h1>
            <p className="text-xs text-brand">DIMENSIONS</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive ? "bg-brand text-white" : "text-gray-600 hover:bg-brand-light hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

