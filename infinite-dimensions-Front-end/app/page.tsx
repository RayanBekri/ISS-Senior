import Image from "next/image"
import Link from "next/link"
import { Search, PrinterIcon as Printer3d, Layers, CuboidIcon as Cube, Zap, Award, Users } from "lucide-react"

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
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-80">Printer Models</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1000+</p>
                  <p className="text-sm opacity-80">Projects Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">Production</p>
                </div>
              </div>
              <div className="relative">
                <input type="text" placeholder="What would you like to create?" className="search-input pr-12" />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="3D Printer in Action"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From concept to creation, we bring your ideas to life with cutting-edge 3D printing technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mb-6 flex items-center justify-center">
                <Printer3d className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Prototyping</h3>
              <p className="text-gray-600">
                Rapid prototyping services to bring your concepts to life quickly and accurately.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mb-6 flex items-center justify-center">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Small Batch Production</h3>
              <p className="text-gray-600">
                Cost-effective small batch manufacturing with consistent quality and quick turnaround.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mb-6 flex items-center justify-center">
                <Cube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3D Design Services</h3>
              <p className="text-gray-600">Professional 3D modeling and design services to help realize your vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Featured Creations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore some of our most popular and innovative 3D printed products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Custom Mechanical Keyboard",
                price: "₨ 2,400.00",
                image: "/placeholder.svg",
                description: "Fully customizable mechanical keyboard with ergonomic design",
              },
              {
                name: "Architectural Model Set",
                price: "₨ 3,500.00",
                image: "/placeholder.svg",
                description: "Detailed architectural models for presentations and displays",
              },
              {
                name: "Personalized Desk Organizer",
                price: "₨ 1,200.00",
                image: "/placeholder.svg",
                description: "Modular desk organization system tailored to your workspace",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-gray-700">{product.price}</p>
                    <Link href="/shop" className="text-[#A200C1] hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-[#A200C1] text-white py-3 px-8 rounded-lg hover:bg-[#8a06a3] transition-colors inline-block"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Why Choose Infinite Dimensions</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We combine cutting-edge technology with exceptional service to deliver outstanding results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">
                Most projects completed within 48-72 hours with expedited options available
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Premium Materials</h3>
              <p className="text-sm text-gray-600">
                Wide selection of high-quality filaments and resins for any application
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A200C1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Support</h3>
              <p className="text-sm text-gray-600">
                Our team of 3D printing specialists is available to help with any project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#A200C1] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to bring your ideas to life?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Whether you have a detailed 3D model or just a concept, we can help you create something amazing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/custom-order"
              className="bg-white text-[#A200C1] py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start a Custom Order
            </Link>
            <Link
              href="/slicer"
              className="border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

