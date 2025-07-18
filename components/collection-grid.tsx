import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Collection {
  id: string
  title: string
  description: string
  image: string
  productCount: number
  href: string
  featured: boolean
}

interface CollectionGridProps {
  collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  const featuredCollections = collections.filter((c) => c.featured)
  const regularCollections = collections.filter((c) => !c.featured)

  return (
    <div className="space-y-12">
      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections.map((collection) => (
              <Link key={collection.id} href={collection.href} className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brand-green text-white">Featured</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-medium mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                      <p className="text-xs opacity-75">{collection.productCount} products</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Regular Collections */}
      {regularCollections.length > 0 && (
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-6">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularCollections.map((collection) => (
              <Link key={collection.id} href={collection.href} className="group">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-medium mb-1">{collection.title}</h3>
                      <p className="text-xs opacity-75">{collection.productCount} products</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-brand-dark/70 font-light">{collection.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
