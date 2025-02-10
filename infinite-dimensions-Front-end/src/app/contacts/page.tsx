import type React from "react"
import Layout from "../../components/Layout"
import { Mail, Phone } from "lucide-react"

const Contacts: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">Have questions about our products or services? We're here to help!</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-6 h-6 mr-2 text-purple-600" />
                <a href="mailto:3dprintertunisia@gmail.com" className="text-purple-600 hover:underline">
                  3dprintertunisia@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 h-6 mr-2 text-purple-600" />
                <a href="tel:+216xxxxxxxx" className="text-purple-600 hover:underline">
                  +216 xx xx xx xx
                </a>
              </li>
            </ul>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contacts

