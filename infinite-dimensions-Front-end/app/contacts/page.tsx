"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Contact form field type
type FormField = {
  id: string
  label: string
  type: string
  placeholder: string
  required: boolean
  value: string
  options?: string[]
}

export default function ContactsPage() {
  // Form fields state
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true, value: "" },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com",
      required: true,
      value: "",
    },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+216 XX XXX XXX", required: false, value: "" },
    {
      id: "subject",
      label: "Subject",
      type: "select",
      placeholder: "Select a subject",
      required: true,
      value: "",
      options: ["General Inquiry", "Custom Order", "Technical Support", "Business Proposal", "Feedback"],
    },
    {
      id: "message",
      label: "Message",
      type: "textarea",
      placeholder: "How can we help you?",
      required: true,
      value: "",
    },
  ])

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Update field value
  const updateField = (id: string, value: string) => {
    setFormFields((fields) => fields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const isValid = formFields.every((field) => !field.required || field.value.trim() !== "")

    if (!isValid) {
      setSubmitSuccess(false)
      setErrorMessage("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after successful submission
      setFormFields((fields) => fields.map((field) => ({ ...field, value: "" })))

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(null)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#a408c3] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Have questions about our 3D printing services? We're here to help you bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24">
            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#a408c3]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-500 mb-4">We'll respond within 24 hours</p>
              <a href="mailto:3dprintertunisia@gmail.com" className="text-[#a408c3] font-medium hover:underline">
                3dprintertunisia@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#a408c3]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-500 mb-4">Mon-Fri from 9am to 6pm</p>
              <a href="tel:+21612345678" className="text-[#a408c3] font-medium hover:underline">
                +216 12 345 678
              </a>
            </div>

            {/* Visit Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#a408c3]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-500 mb-4">Our workshop and showroom</p>
              <address className="text-[#a408c3] font-medium not-italic">123 Innovation Street, Tunis, Tunisia</address>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-green-700">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitSuccess === false && errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-red-700">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        required={field.required}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.id}
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        required={field.required}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        required={field.required}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a408c3] focus:border-transparent outline-none"
                      />
                    )}
                  </div>
                ))}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="w-4 h-4 rounded border-gray-300 text-[#a408c3] focus:ring-[#a408c3]"
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#a408c3] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#a408c3] text-white py-3 px-6 rounded-lg hover:bg-[#8a06a3] transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Office Location Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="text-center text-white p-4">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Interactive Map Placeholder</p>
                      <p className="text-sm">Actual map would be integrated here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-[#a408c3] mr-2" />
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>

              {/* What to Expect */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#a408c3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-medium">1</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Quick Response</h4>
                      <p className="text-sm text-gray-600">
                        We'll respond to your inquiry within 24 hours on business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#a408c3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-medium">2</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Personalized Solution</h4>
                      <p className="text-sm text-gray-600">
                        Our experts will analyze your needs and provide tailored recommendations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#a408c3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-medium">3</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Follow-up Support</h4>
                      <p className="text-sm text-gray-600">
                        We'll stay in touch throughout your project to ensure satisfaction
                      </p>
                    </div>
                  </div>
                  <Link href="/consultation" className="block mt-2 text-[#a408c3] hover:underline text-sm font-medium">
                    Book a consultation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What 3D printing technologies do you offer?",
                  answer:
                    "We offer a range of technologies including FDM (Fused Deposition Modeling), SLA (Stereolithography), and SLS (Selective Laser Sintering) to meet different project requirements.",
                },
                {
                  question: "How long does it take to complete a 3D printing order?",
                  answer:
                    "Turnaround time depends on the complexity, size, and quantity of your order. Simple projects can be completed in 1-3 days, while more complex projects may take 5-7 business days.",
                },
                {
                  question: "Do you offer design services?",
                  answer:
                    "Yes, our team of experienced designers can help bring your ideas to life. We offer 3D modeling, design optimization, and consultation services to ensure your project's success.",
                },
                {
                  question: "What file formats do you accept?",
                  answer:
                    "We accept STL, OBJ, 3MF, and STEP files. If you have a different format, please contact us to see if we can accommodate your needs.",
                },
                {
                  question: "Do you ship internationally?",
                  answer:
                    "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
                },
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media and CTA */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="w-12 h-12 bg-[#a408c3] text-white rounded-full flex items-center justify-center hover:bg-[#8a06a3] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-[#a408c3] text-white rounded-full flex items-center justify-center hover:bg-[#8a06a3] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-[#a408c3] text-white rounded-full flex items-center justify-center hover:bg-[#8a06a3] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-[#a408c3] text-white rounded-full flex items-center justify-center hover:bg-[#8a06a3] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-6">
              Ready to start your 3D printing project? Contact us today or visit our workshop to discuss your ideas!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/custom-order"
                className="bg-[#a408c3] text-white py-3 px-8 rounded-lg hover:bg-[#8a06a3] transition-colors"
              >
                Start a Custom Order
              </Link>
              <Link
                href="/shop"
                className="border-2 border-[#a408c3] text-[#a408c3] py-3 px-8 rounded-lg hover:bg-[#a408c3] hover:text-white transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
