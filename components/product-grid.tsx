"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Product {
  id: string
  title: string
  handle: string
  price: number
  compareAtPrice: number | null
  image: string | null
  imageAlt: string
  variantId: string
  availableForSale: boolean
  vendor?: string
  tags?: string[]
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  if (!products || products.length === 0) {
    return null
  }

  const featuredProducts = products.slice(0, 8)

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-brand-dark mb-2">Featured Products</h2>
          <p className="text-sm md:text-base text-brand-dark/70 font-light">Discover our most popular items</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link href="/collections/all">
            <Button
              variant="outline"
              size="lg"
              className="border-brand-dark/20 text-brand-dark hover:bg-brand-green hover:text-white hover:border-brand-green bg-transparent font-normal"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
