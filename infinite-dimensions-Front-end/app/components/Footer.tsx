import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#a408c3] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
              alt="Infinite Dimensions Logo"
              width={180}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm opacity-80">We help you find your dream print.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm opacity-80 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm opacity-80 hover:opacity-100">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-sm opacity-80 hover:opacity-100">
                  Custom Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contacts" className="text-sm opacity-80 hover:opacity-100">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm opacity-80 hover:opacity-100">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm opacity-80 hover:opacity-100">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm opacity-80 hover:opacity-100">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-sm opacity-80">
          <p>© 2024 All Rights Reserved Terms of use Infinite Dimensions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

