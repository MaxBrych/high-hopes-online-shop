"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

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

interface CollectionsShowcaseProps {
  collections: Collection[]
}

export function CollectionsShowcase({ collections = [] }: CollectionsShowcaseProps) {
  // Filter for specific collections: 'local-tegridy' and 'recovery'
  const targetHandles = ['local-tegridy', 'recovery']
  const showcaseCollections = collections.filter(collection => 
    targetHandles.includes(collection.handle)
  )

  // If we don't have the specific collections, don't show anything
  if (showcaseCollections.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Curated Collections</h2>
          <p className="text-sm md:text-base text-black/70 font-light">
            Thoughtfully selected products for every lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {showcaseCollections.map((collection) => (
            <Card
              key={collection.id}
              className="group border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: '#F4F1E0' }}>
                  {collection.image?.url ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-black/40 text-sm font-light">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-light text-white mb-2">{collection.title}</h3>
                    {collection.description && (
                      <p className="text-sm text-white/90 font-light mb-4 line-clamp-2">{collection.description}</p>
                    )}
                    <Link href={`/collections/${collection.handle}`}>
                      <Button
                        className="bg-white text-black hover:bg-gray-100 transition-all duration-300 font-normal"
                        size="sm"
                      >
                        Explore Collection
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
