import type React from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import Image from "next/image"

const Home: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-r from-primary-start to-primary-end text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">You ask. We make it.</h1>
          <p className="text-xl mb-8">Custom 3D prints tailored to your imagination.</p>
          <Link href="/custom-order" className="btn-primary">
            Start Your Custom Order
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Best Selling Prints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Replace with actual product data */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={`/placeholder-product-${item}.jpg`}
                  alt={`Product ${item}`}
                  width={300}
                  height={300}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Product Name</h3>
                  <p className="text-gray-600 mb-2">$99.99</p>
                  <Link href="/shop" className="text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-gray-600 mb-4">
            Infinite Dimensions is your go-to destination for custom 3D prints. We bring your ideas to life with
            precision and care.
          </p>
          <Link href="/about" className="text-primary hover:underline">
            Learn More About Us
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/shop?category=figurines" className="btn-primary">
              Figurines
            </Link>
            <Link href="/shop?category=gadgets" className="btn-primary">
              Gadgets
            </Link>
            <Link href="/shop?category=home-decor" className="btn-primary">
              Home Decor
            </Link>
            <Link href="/shop?category=accessories" className="btn-primary">
              Accessories
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home

