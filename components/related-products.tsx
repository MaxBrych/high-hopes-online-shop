import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  title: string
  handle: string
  price: number
  compareAtPrice: number | null
  image: string | null
  imageAlt: string
  availableForSale: boolean
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">You Might Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const discount =
            product.compareAtPrice && product.compareAtPrice > product.price
              ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
              : null

          return (
            <Card key={product.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <Link href={`/products/${product.handle}`} className="block">
                  <div className="aspect-square bg-white overflow-hidden rounded-t-lg relative">
                    {product.image ? (
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.imageAlt}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.handle}`}>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">€{product.price.toFixed(2)}</span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">€{product.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!product.availableForSale}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
