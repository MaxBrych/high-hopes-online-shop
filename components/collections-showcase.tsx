"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface Collection {
  id: string
  title: string
  handle: string
  image: string | null
  imageAlt: string
}

interface CollectionsShowcaseProps {
  collections: Collection[]
}

export function CollectionsShowcase({ collections = [] }: CollectionsShowcaseProps) {
  const defaultCollections = [
    {
      id: "wellness",
      title: "Wellness Collection",
      handle: "wellness",
      description: "Premium CBD products for your daily wellness routine",
      image: "/images/wellness-lifestyle.png",
      imageAlt: "Wellness Collection",
    },
    {
      id: "natural",
      title: "Natural Living",
      handle: "natural",
      description: "Organic and natural products for a healthier lifestyle",
      image: "/images/natural-growing.png",
      imageAlt: "Natural Living",
    },
  ]

  const showcaseCollections = collections.length > 0 ? collections.slice(0, 2) : defaultCollections

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-brand-dark mb-2">Curated Collections</h2>
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            Thoughtfully selected products for every lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {showcaseCollections.map((collection, index) => (
            <Card
              key={collection.id}
              className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg?height=400&width=600"}
                    alt={collection.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-light text-white mb-2">{collection.title}</h3>
                    {index < defaultCollections.length && (
                      <p className="text-sm text-white/90 font-light mb-4">{defaultCollections[index].description}</p>
                    )}
                    <Link href={`/collections/${collection.handle}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/90 hover:bg-white text-brand-dark font-normal"
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
