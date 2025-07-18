"use client"

import { ProductCardLane } from "@/components/product-card-lane"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
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

interface Collection {
  id: string
  title: string
  handle: string
  products: Product[]
}

interface CollectionLanesProps {
  collections: Collection[]
}

export function CollectionLanes({ collections = [] }: CollectionLanesProps) {
  if (!collections || collections.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-12 bg-brand-light/30">
      <div className="container mx-auto px-4">
        {collections.map((collection) => {
          if (!collection.products || collection.products.length === 0) {
            return null
          }

          return <CollectionLane key={collection.id} collection={collection} />
        })}
      </div>
    </section>
  )
}

function CollectionLane({ collection }: { collection: Collection }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-light text-brand-dark mb-1">{collection.title}</h2>
          <p className="text-sm text-brand-dark/70 font-light">Discover our premium selection</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll("left")}
            className="hidden md:flex w-8 h-8 rounded-full bg-white hover:bg-brand-light text-brand-dark"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll("right")}
            className="hidden md:flex w-8 h-8 rounded-full bg-white hover:bg-brand-light text-brand-dark"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Link href={`/collections/${collection.handle}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-green hover:text-brand-green-dark font-normal text-sm"
            >
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {collection.products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-48 md:w-64">
            <ProductCardLane product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
