import type React from "react"
import Sidebar from "@/components/sidebar" // Changed from named import to default import

export default function AccountConfirmationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
