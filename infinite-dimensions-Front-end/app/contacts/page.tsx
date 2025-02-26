import { Mail, Phone } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-400 mb-8">Have questions about our products or services? We're here to help!</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail className="w-6 h-6 mr-3 text-gray-400" />
              <a href="mailto:3dprintertunisia@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                3dprintertunisia@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="w-6 h-6 mr-3 text-gray-400" />
              <a href="tel:+216xxxxxxxx" className="text-white hover:text-gray-300 transition-colors">
                +216 xx xx xx xx
              </a>
            </li>
          </ul>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full p-3 bg-transparent border border-gray-800 rounded text-white focus:border-gray-600 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

