"use client"

import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer, Zap } from "lucide-react"
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

interface DealsSectionProps {
  products?: Product[]
}

export function DealsSection({ products = [] }: DealsSectionProps) {
  // Filter products with discounts or use fallback
  const dealsProducts = products.filter((product) => product.compareAtPrice && product.compareAtPrice > product.price)

  if (dealsProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-brand-green/5 to-brand-light/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
            <Badge className="bg-brand-green text-white px-3 py-1 font-normal">
              <Timer className="w-3 h-3 mr-1" />
              Limited Time
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-brand-dark mb-2">Special Deals</h2>
          <p className="text-sm md:text-base text-brand-dark/70 font-light">Don't miss out on these amazing offers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {dealsProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link href="/collections/sale">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green-dark text-white px-6 md:px-8 py-3 md:py-4 font-normal rounded-xl"
            >
              View All Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
