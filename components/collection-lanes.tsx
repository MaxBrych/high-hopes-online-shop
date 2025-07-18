"use client"

import { ProductCardLane } from "@/components/product-card-lane"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

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
  description?: string
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
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4">Trending Collections</h2>
          <p className="text-lg text-black/70 font-light max-w-2xl mx-auto">
            Discover our most popular product collections curated for cannabis enthusiasts
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {collections.map((collection, index) => {
            if (!collection.products || collection.products.length === 0) {
              return null
            }

            return (
              <CollectionLane 
                key={collection.id} 
                collection={collection} 
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CollectionLane({ collection }: { collection: Collection }) {
  return (
    <div className="space-y-6">
      {/* Collection Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl md:text-3xl font-light text-black">
              {collection.title}
            </h3>
            <Badge 
              variant="outline" 
              className="bg-white text-black/70 border-black/20 font-normal"
            >
              {collection.products.length} products
            </Badge>
          </div>
          {collection.description && (
            <p className="text-black/70 font-light max-w-lg">
              {collection.description}
            </p>
          )}
        </div>
        
        <Link href={`/collections/${collection.handle}`}>
          <Button 
            className="bg-brand-green hover:bg-brand-green-dark text-white border-0 px-6 py-2 h-auto rounded-full font-normal group transition-all duration-300"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {collection.products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px] lg:basis-[350px]">
                <div className="h-full">
                  <ProductCardLane product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons */}
          <CarouselPrevious 
            className="hidden md:flex -left-4 lg:-left-6 bg-white border border-black/10 hover:bg-gray-50 transition-all duration-300" 
          />
          <CarouselNext 
            className="hidden md:flex -right-4 lg:-right-6 bg-white border border-black/10 hover:bg-gray-50 transition-all duration-300" 
          />
        </Carousel>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-1">
            {Array.from({ length: Math.ceil(collection.products.length / 1) }).map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-black/20" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
