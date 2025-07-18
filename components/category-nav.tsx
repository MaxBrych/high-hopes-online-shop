"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Leaf, Droplets, Glasses, Wrench, Sprout, Package, Zap, Beaker } from "lucide-react"

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

// Map collection handles to appropriate icons
const categoryIcons: Record<string, any> = {
  seeds: Leaf,
  'cannabis-seeds': Leaf,
  'feminized-seeds': Leaf,
  'autoflower-seeds': Sprout,
  cbd: Droplets,
  'cbd-products': Droplets,
  glass: Glasses,
  'glass-bongs': Glasses,
  accessories: Wrench,
  'smoking-accessories': Wrench,
  equipment: Package,
  'growing-equipment': Package,
  'grow-equipment': Package,
  nutrients: Beaker,
  'nutrients-fertilizers': Beaker,
  lights: Zap,
  'grow-lights': Zap,
  'led-lights': Zap,
  // Add more mappings as needed
}

// Default icon if no match found
const defaultIcon = Package

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
          {categoriesToShow.map((collection) => {
            // Get the appropriate icon for this collection
            const IconComponent = categoryIcons[collection.handle] || defaultIcon
            
            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-brand-green/20"
              >
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
                  </div>
                  <h3 className="font-medium text-sm md:text-base text-black mb-2 group-hover:text-brand-green transition-colors">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-xs md:text-sm text-black/60 font-light line-clamp-2 mb-3">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-center text-brand-green group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-xs font-normal">Shop Now</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            )
          })}
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
