"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/app/contexts/CartContext"
import AccountDropdown from "@/app/components/AccountDropdown"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-[180px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
                alt="Infinite Dimensions Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#A200C1] font-medium hover:text-purple-700 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-[#A200C1] font-medium hover:text-purple-700 transition-colors">
              Shop
            </Link>
            <Link href="/custom-order" className="text-[#A200C1] font-medium hover:text-purple-700 transition-colors">
              Custom Order
            </Link>
            <Link href="/slicer" className="text-[#A200C1] font-medium hover:text-purple-700 transition-colors">
              3D Slicer
            </Link>
            <Link href="/contacts" className="text-[#A200C1] font-medium hover:text-purple-700 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Cart and User Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <AccountDropdown />
            <Link href="/cart" className="text-[#A200C1] hover:text-purple-700 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#A200C1]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-[#A200C1] hover:text-purple-700">
              Home
            </Link>
            <Link href="/shop" className="block py-2 text-[#A200C1] hover:text-purple-700">
              Shop
            </Link>
            <Link href="/custom-order" className="block py-2 text-[#A200C1] hover:text-purple-700">
              Custom Order
            </Link>
            <Link href="/slicer" className="block py-2 text-[#A200C1] hover:text-purple-700">
              3D Slicer
            </Link>
            <Link href="/contacts" className="block py-2 text-[#A200C1] hover:text-purple-700">
              Contact Us
            </Link>
            <Link href="/cart" className="block py-2 text-[#A200C1] hover:text-purple-700">
              Cart ({totalItems})
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

