import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrowHigh - Your Trusted Partner in Cannabis Growing",
  description: "Premium cannabis genetics, professional growing equipment, and expert cultivation support. Join 25,000+ successful growers with 98% success rate. Quality seeds, nutrients, lighting & more.",
  keywords: "cannabis seeds, growing equipment, cultivation supplies, cannabis genetics, grow lights, nutrients, hydroponic systems, organic fertilizers, cultivation guides",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

