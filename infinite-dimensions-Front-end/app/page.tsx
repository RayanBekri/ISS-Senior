import Image from "next/image"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section with purple gradient background */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                You ask. <br />
                We make it.
              </h1>
              <div className="flex space-x-12 mb-8">
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm opacity-80">Print Species</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-sm opacity-80">Customers</p>
                </div>
              </div>
              <div className="relative">
                <input type="text" placeholder="What are you looking for?" className="search-input pr-12" />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64">
                <Image src="/placeholder.svg" alt="3D Printer" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Section with white background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Best Selling Plants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "All Car Brands",
                price: "₨ 1,400.00",
                image: "/placeholder.svg",
              },
              {
                name: "2025 Formula 1 calendar",
                price: "₨ 900.00",
                image: "/placeholder.svg",
              },
              {
                name: "Honeycomb shoetrack stack",
                price: "₨ 3,500.00",
                image: "/placeholder.svg",
              },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-lg text-gray-700">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with light gray background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">About us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Large Assortment</h3>
              <p className="text-sm text-gray-600">
                We offer many different types of products with fewer variations in each category
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast & Free Shipping</h3>
              <p className="text-sm text-gray-600">
                4-day or less delivery time, free shipping and an expedited delivery option
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">Answers to any business related inquiry 24/7 and in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with white background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Education", image: "/placeholder.svg" },
              { name: "Hobby & DIY", image: "/placeholder.svg" },
              { name: "Tools", image: "/placeholder.svg" },
            ].map((category, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

