"use client"

import { ProductCardLane } from "@/components/product-card-lane"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-white rounded-t-3xl -mx-4 px-4 md:mx-0 md:px-0">
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extralight text-black tracking-wide">You Might Also Like</h2>
          <p className="text-black/70 font-light tracking-wide mt-2">Discover more premium products</p>
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
              {products.map((product) => (
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
              {Array.from({ length: Math.ceil(products.length / 1) }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-black/20" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
