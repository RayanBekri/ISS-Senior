"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
              alt="Infinite Dimensions Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300 transition-colors">
              Shop
            </Link>
            <Link href="/custom-order" className="text-white hover:text-gray-300 transition-colors">
              Custom Order
            </Link>
            <Link href="/contacts" className="text-white hover:text-gray-300 transition-colors">
              Contacts
            </Link>
            <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
              Login
            </Link>
          </nav>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 mt-4">
            <Link href="/" className="block py-3 text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/shop" className="block py-3 text-white hover:text-gray-300">
              Shop
            </Link>
            <Link href="/custom-order" className="block py-3 text-white hover:text-gray-300">
              Custom Order
            </Link>
            <Link href="/contacts" className="block py-3 text-white hover:text-gray-300">
              Contacts
            </Link>
            <Link href="/login" className="block py-3 text-white hover:text-gray-300">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

