"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
            alt="Infinite Dimensions Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-gray-700 hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/custom-order" className="text-gray-700 hover:text-primary transition-colors">
            Custom Order
          </Link>
          <Link href="/contacts" className="text-gray-700 hover:text-primary transition-colors">
            Contacts
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-primary transition-colors">
            Login
          </Link>
        </nav>
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
            Home
          </Link>
          <Link href="/shop" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
            Shop
          </Link>
          <Link href="/custom-order" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
            Custom Order
          </Link>
          <Link href="/contacts" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
            Contacts
          </Link>
          <Link href="/login" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
            Login
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header

