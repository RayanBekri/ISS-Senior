import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          You ask. <br />
          We make it.
        </h1>
        <p className="text-xl md:text-2xl mb-8">Custom 3D prints tailored to your imagination.</p>
        <Link
          href="/custom-order"
          className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Start Your Custom Order
        </Link>
      </section>

      {/* Best Selling Prints Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Best Selling Prints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={`/placeholder.svg?height=400&width=400`}
                    alt={`Product ${item}`}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Product Name</h3>
                  <p className="text-gray-400 mb-4">$99.99</p>
                  <Link href="/shop" className="text-white hover:text-gray-300 underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Figurines", href: "/shop?category=figurines" },
              { name: "Gadgets", href: "/shop?category=gadgets" },
              { name: "Home Decor", href: "/shop?category=home-decor" },
              { name: "Accessories", href: "/shop?category=accessories" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="bg-white/10 hover:bg-white/20 text-white text-center py-4 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

