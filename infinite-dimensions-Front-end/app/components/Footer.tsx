"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#a408c3] to-[#8a06a3] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ID%204-iq4Z8ZcABNOdnm7oTtQkwfSOSdGM4T.png"
                alt="Infinite Dimensions Logo"
                width={180}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <p className="text-white/80 mb-4">
                We bring your ideas to life with cutting-edge 3D printing technology. Quality, precision, and
                innovation.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Shop</span>
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Custom Order</span>
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Consultation</span>
                </Link>
              </li>
              <li>
                <Link href="/slicer" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>3D Slicer</span>
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Our Services</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>3D Printed Products</span>
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Custom Prototyping</span>
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Expert Consultation</span>
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Small Batch Production</span>
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>3D Design Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-white/80 hover:text-white flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Consultation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-white/80 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">123 Innovation Street, Tunis, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-white/80 flex-shrink-0" />
                <a href="tel:+21612345678" className="text-white/80 hover:text-white">
                  +216 12 345 678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-white/80 flex-shrink-0" />
                <a href="mailto:3dprintertunisia@gmail.com" className="text-white/80 hover:text-white">
                  3dprintertunisia@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-white/80 mt-0.5 flex-shrink-0" />
                <div className="text-white/80">
                  <p>Monday - Friday: 9am - 6pm</p>
                  <p>Saturday: 10am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Infinite Dimensions. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping-policy" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

