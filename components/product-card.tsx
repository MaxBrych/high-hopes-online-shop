"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
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

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()

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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
      <CardContent className="p-0">
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-light/30 to-brand-light/10">
          <Link href={`/products/${product.handle}`} className="block w-full h-full">
            {product.image ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.imageAlt}
                fill
                className={`object-contain p-6 transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-light/50">
                <span className="text-brand-dark/40 text-sm font-light">No image</span>
              </div>
            )}
          </Link>

          {/* Product Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1 font-normal shadow-sm">
                NEW GENETICS
              </Badge>
            )}
            {isBestseller && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1 font-normal shadow-sm">
                TOP STRAIN
              </Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 font-normal shadow-sm">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className={`w-10 h-10 p-0 rounded-full shadow-lg bg-white/95 hover:bg-white backdrop-blur-sm ${
                isWishlisted ? "text-red-500" : "text-brand-dark hover:text-primary"
              }`}
              onClick={handleWishlist}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            {onQuickView && (
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 rounded-full shadow-lg bg-white/95 hover:bg-white text-brand-dark hover:text-primary backdrop-blur-sm"
                onClick={handleQuickView}
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Quick Add to Cart - Mobile */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 md:hidden">
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg font-normal"
              disabled={!product.availableForSale || safePrice <= 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-5 space-y-3">
          {/* Vendor & Rating */}
          {product.vendor && (
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-xs text-brand-dark/60 border-brand-dark/20 font-light bg-brand-light/50"
              >
                {product.vendor}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-brand-dark/60 font-light">4.8</span>
              </div>
            </div>
          )}

          {/* Product Title */}
          <Link href={`/products/${product.handle}`} className="block">
            <h3 className="font-normal text-brand-dark leading-tight line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {safePrice > 0 ? (
                <>
                  <span className="text-xl font-medium text-primary">€{safePrice.toFixed(2)}</span>
                  {safeCompareAtPrice && safeCompareAtPrice > safePrice && (
                    <span className="text-sm text-brand-dark/50 line-through font-light">
                      €{safeCompareAtPrice.toFixed(2)}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xl font-medium text-brand-dark/60">Price on request</span>
              )}
            </div>
            {!product.availableForSale && (
              <Badge variant="destructive" className="text-xs font-normal">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Add to Cart Button - Desktop */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white hidden md:flex items-center justify-center font-normal transition-all duration-200"
            size="sm"
            disabled={!product.availableForSale || safePrice <= 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {!product.availableForSale ? "Out of Stock" : safePrice <= 0 ? "Contact for Price" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
