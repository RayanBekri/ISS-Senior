"use client"

import type React from "react"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, Menu, X, ChevronDown, Printer, CuboidIcon as Cube, Layers, Users } from "lucide-react"
import { useCart } from "@/app/contexts/CartContext"
import AccountDropdown from "@/app/components/AccountDropdown"

// Memoize the Header component to prevent unnecessary re-renders
const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems } = useCart()
  const pathname = usePathname()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Use useCallback for toggle functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
    if (isSearchOpen) setIsSearchOpen(false)
  }, [isSearchOpen])

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev)
    if (isMenuOpen) setIsMenuOpen(false)
  }, [isMenuOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
  }

  // Check if the current path matches the link
  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10">
            <div className="relative h-10 w-[150px] md:h-12 md:w-[180px] transition-all">
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
          <nav className="hidden lg:flex items-center">
            <div className="flex">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md text-[#A200C1] font-medium hover:bg-purple-50 transition-colors ${
                  isActive("/") ? "bg-purple-50 font-semibold" : ""
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center px-4 py-2 rounded-md text-[#A200C1] font-medium hover:bg-purple-50 transition-colors ${
                    isActive("/shop") || isActive("/custom-order") || isActive("/slicer")
                      ? "bg-purple-50 font-semibold"
                      : ""
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                <div
                  className={`absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                    isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="p-2">
                    <Link
                      href="/shop"
                      className="flex items-center px-4 py-3 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Cube className="w-5 h-5 text-[#A200C1] mr-3" />
                      <div>
                        <div className="font-medium">Shop</div>
                        <div className="text-xs text-gray-500">Browse our products</div>
                      </div>
                    </Link>

                    <Link
                      href="/custom-order"
                      className="flex items-center px-4 py-3 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Printer className="w-5 h-5 text-[#A200C1] mr-3" />
                      <div>
                        <div className="font-medium">Custom Order</div>
                        <div className="text-xs text-gray-500">Request a custom print</div>
                      </div>
                    </Link>

                    <Link
                      href="/slicer"
                      className="flex items-center px-4 py-3 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Layers className="w-5 h-5 text-[#A200C1] mr-3" />
                      <div>
                        <div className="font-medium">3D Slicer</div>
                        <div className="text-xs text-gray-500">Get a price estimate</div>
                      </div>
                    </Link>
                    <Link
                      href="/consultation"
                      className="flex items-center px-4 py-3 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Users className="w-5 h-5 text-[#A200C1] mr-3" />
                      <div>
                        <div className="font-medium">Consultation</div>
                        <div className="text-xs text-gray-500">Book an expert session</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/contacts"
                className={`px-4 py-2 rounded-md text-[#A200C1] font-medium hover:bg-purple-50 transition-colors ${
                  isActive("/contacts") ? "bg-purple-50 font-semibold" : ""
                }`}
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-[#A200C1] hover:bg-purple-50 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <AccountDropdown />

            <Link
              href="/cart"
              className="p-2 text-[#A200C1] hover:bg-purple-50 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={toggleSearch}
              className="p-2 text-[#A200C1] hover:bg-purple-50 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="p-2 text-[#A200C1] hover:bg-purple-50 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="p-2 text-[#A200C1] hover:bg-purple-50 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <div
          className={`absolute inset-x-0 top-full mt-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${
            isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                type="submit"
                className="ml-2 bg-[#a408c3] text-white px-6 py-3 rounded-lg hover:bg-[#8a06a3] transition-colors"
              >
                Search
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Popular:</span>
              <button
                onClick={() => setSearchQuery("3D printed vase")}
                className="text-sm text-[#A200C1] hover:underline"
              >
                3D printed vase
              </button>
              <button
                onClick={() => setSearchQuery("custom figurine")}
                className="text-sm text-[#A200C1] hover:underline"
              >
                custom figurine
              </button>
              <button
                onClick={() => setSearchQuery("desk organizer")}
                className="text-sm text-[#A200C1] hover:underline"
              >
                desk organizer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-[#A200C1]">Menu</h2>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-500 hover:text-[#A200C1] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <AccountDropdown />
        </div>

        <nav className="px-4 py-2">
          <Link
            href="/"
            className={`flex items-center py-3 ${isActive("/") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
            onClick={toggleMenu}
          >
            Home
          </Link>

          <div className="py-2">
            <div className="flex items-center justify-between py-2 text-gray-500 text-sm font-medium">SERVICES</div>
            <Link
              href="/shop"
              className={`flex items-center py-3 pl-2 ${isActive("/shop") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
              onClick={toggleMenu}
            >
              <Cube className="w-4 h-4 mr-2" />
              Shop
            </Link>
            <Link
              href="/custom-order"
              className={`flex items-center py-3 pl-2 ${isActive("/custom-order") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
              onClick={toggleMenu}
            >
              <Printer className="w-4 h-4 mr-2" />
              Custom Order
            </Link>
            <Link
              href="/slicer"
              className={`flex items-center py-3 pl-2 ${isActive("/slicer") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
              onClick={toggleMenu}
            >
              <Layers className="w-4 h-4 mr-2" />
              3D Slicer
            </Link>
            <Link
              href="/consultation"
              className={`flex items-center py-3 pl-2 ${isActive("/consultation") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
              onClick={toggleMenu}
            >
              <Users className="w-4 h-4 mr-2" />
              Consultation
            </Link>
          </div>

          <Link
            href="/contacts"
            className={`flex items-center py-3 ${isActive("/contacts") ? "text-[#A200C1] font-semibold" : "text-gray-700"}`}
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/cart"
            className="flex items-center justify-between w-full bg-[#a408c3] text-white p-3 rounded-lg hover:bg-[#8a06a3] transition-colors"
            onClick={toggleMenu}
          >
            <span className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart
            </span>
            {totalItems > 0 && (
              <span className="bg-white text-[#a408c3] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
})

Header.displayName = "Header"

export default Header

