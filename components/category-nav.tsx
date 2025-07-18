"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Collection {
  id: string
  title: string
  handle: string
  description?: string
  image?: {
    url: string
    altText?: string
  }
}

interface CategoryNavProps {
  collections: Collection[]
}

export function CategoryNav({ collections = [] }: CategoryNavProps) {
  // Use first 4 collections from Shopify, or show fallback message
  const categoriesToShow = collections.slice(0, 4)

  if (categoriesToShow.length === 0) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Shop by Category</h2>
            <p className="text-black/70 font-light">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Shop by Category</h2>
          <p className="text-black/70 font-light">
            Discover our carefully curated selection of premium cannabis products and accessories
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categoriesToShow.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: '#F4F1E0' }}>
                {collection.image?.url ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-black/40 text-sm font-light">No image</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-sm md:text-base text-black mb-1 group-hover:text-brand-green transition-colors">
                  {collection.title}
                </h3>
                {collection.description && (
                  <p className="text-xs md:text-sm text-black/60 font-light line-clamp-2">
                    {collection.description}
                  </p>
                )}
                <div className="flex items-center mt-2 text-brand-green group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-xs font-normal">Shop Now</span>
                  <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {collections.length > 4 && (
          <div className="text-center mt-8">
            <Link href="/collections">
              <Button 
                variant="outline" 
                className="border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                View All Categories
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
