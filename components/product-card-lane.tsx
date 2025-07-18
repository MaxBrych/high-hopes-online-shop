"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: string
  title: string
  handle: string
  price: number | null | undefined
  compareAtPrice: number | null | undefined
  image: string | null
  imageAlt: string
  variantId: string
  availableForSale: boolean
  vendor?: string
  tags?: string[]
}

interface ProductCardLaneProps {
  product: Product
}

export function ProductCardLane({ product }: ProductCardLaneProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return null
  }

  // Safe price handling with fallbacks
  const safePrice = product?.price ?? 0
  const safeCompareAtPrice = product?.compareAtPrice ?? null

  const calculateDiscount = (price: number, compareAtPrice: number | null) => {
    if (!compareAtPrice || compareAtPrice <= price) return null
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
  }

  const discount = calculateDiscount(safePrice, safeCompareAtPrice)
  const isNew = product?.tags?.includes("new")
  const isBestseller = product?.tags?.includes("bestseller")
  const isOnSale = discount && discount > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (safePrice > 0) {
      addItem({
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        price: safePrice,
        image: product.image || undefined,
      })
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link href={`/products/${product.handle}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-brand-dark/5 group">
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-light/30">
          {product.image ? (
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.imageAlt}
              fill
              className={`object-contain p-3 transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-light/50">
              <span className="text-brand-dark/40 text-xs font-light">No image</span>
            </div>
          )}

          {/* Product Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 font-normal">
                NEW GENETICS
              </Badge>
            )}
            {isBestseller && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-0.5 font-normal">
                TOP STRAIN
              </Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-0.5 font-normal">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="secondary"
            className={`absolute top-2 right-2 w-7 h-7 p-0 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isWishlisted ? "text-red-500 bg-red-50" : "text-brand-dark bg-white/90"
            }`}
            onClick={handleWishlist}
          >
            <Heart className={`w-3 h-3 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Product Information */}
        <div className="p-3">
          {/* Vendor and Rating */}
          <div className="flex items-center justify-between mb-2">
            {product.vendor && (
              <Badge variant="outline" className="text-xs text-brand-dark/60 border-brand-dark/20 font-light">
                {product.vendor}
              </Badge>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-brand-dark/60 font-normal">4.8</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-normal text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-brand-dark mb-2 group-hover:text-brand-green transition-colors">
            {product.title}
          </h3>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {safePrice > 0 ? (
                <>
                  <span className="text-base font-medium text-brand-green">€{safePrice.toFixed(2)}</span>
                  {safeCompareAtPrice && safeCompareAtPrice > safePrice && (
                    <span className="text-xs text-brand-dark/50 line-through font-light">
                      €{safeCompareAtPrice.toFixed(2)}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-medium text-brand-dark/60">Contact</span>
              )}
            </div>

            <Button
              size="sm"
              className="bg-brand-green hover:bg-brand-green-dark text-white px-2 py-1 h-auto text-xs font-normal"
              disabled={!product.availableForSale || safePrice <= 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              {safePrice > 0 ? "Add" : "Info"}
            </Button>
          </div>

          {/* Stock Status */}
          {!product.availableForSale && (
            <div className="mt-2">
              <Badge variant="destructive" className="text-xs font-normal">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
