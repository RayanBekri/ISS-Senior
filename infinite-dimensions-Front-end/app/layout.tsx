import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import ChatBot from "./components/ChatBot"
import LoadingScreen from "./components/LoadingScreen"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Infinite Dimensions",
  description: "You ask. We make it.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <LoadingScreen />
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatBot />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

