import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/shopify-server"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const first = Number.parseInt(searchParams.get("first") || "20")

    const products = await getProducts(first)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("API Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
