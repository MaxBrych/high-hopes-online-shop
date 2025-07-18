"use client"

import { ProductCardLane } from "@/components/product-card-lane"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-brand-light/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-green" />
            <h2 className="text-3xl md:text-4xl font-light text-brand-dark">Trending Collections</h2>
            <Sparkles className="w-5 h-5 text-brand-green" />
          </div>
          <p className="text-lg text-brand-dark/70 font-light max-w-2xl mx-auto">
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
                index={index}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CollectionLane({ collection, index }: { collection: Collection; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className={`relative ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
      {/* Background decoration */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/3 h-full bg-gradient-to-l ${isEven ? 'from-brand-green/5' : 'from-brand-purple/5'} to-transparent rounded-3xl -z-10 hidden lg:block`} />
      
      <div className="space-y-6">
        {/* Collection Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isEven ? '' : 'lg:flex-row-reverse lg:text-right'}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl md:text-3xl font-light text-brand-dark">
                {collection.title}
              </h3>
              <Badge 
                variant="secondary" 
                className={`${isEven ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-purple/10 text-brand-purple'} border-0 font-normal`}
              >
                {collection.products.length} products
              </Badge>
            </div>
            {collection.description && (
              <p className="text-brand-dark/70 font-light max-w-lg">
                {collection.description}
              </p>
            )}
          </div>
          
          <Link href={`/collections/${collection.handle}`}>
            <Button 
              className={`${isEven ? 'bg-brand-green hover:bg-brand-green-dark' : 'bg-brand-purple hover:bg-brand-purple-dark'} text-white border-0 px-6 py-2 h-auto rounded-full font-normal group transition-all duration-300`}
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
              className={`hidden md:flex -left-4 lg:-left-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg ${isEven ? 'hover:bg-brand-green/10' : 'hover:bg-brand-purple/10'} transition-all duration-300`} 
            />
            <CarouselNext 
              className={`hidden md:flex -right-4 lg:-right-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg ${isEven ? 'hover:bg-brand-green/10' : 'hover:bg-brand-purple/10'} transition-all duration-300`} 
            />
          </Carousel>

          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(collection.products.length / 1) }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${isEven ? 'bg-brand-green/30' : 'bg-brand-purple/30'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
