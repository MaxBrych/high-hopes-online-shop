"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star, Minus, Plus, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number
  price: number
  compareAtPrice: number | null
  selectedOptions: { name: string; value: string }[]
}

interface ProductOption {
  name: string
  values: string[]
}

interface Product {
  id: string
  title: string
  description: string
  vendor: string
  productType: string
  tags: string[]
  minPrice: number
  maxPrice: number
  currencyCode: string
  compareAtMinPrice: number | null
  compareAtMaxPrice: number | null
  variants: ProductVariant[]
  options: ProductOption[]
}

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addItem } = useCart()

  const calculateDiscount = (price: number, compareAtPrice: number | null) => {
    if (!compareAtPrice || compareAtPrice <= price) return null
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
  }

  const discount = calculateDiscount(selectedVariant.price, selectedVariant.compareAtPrice)
  const isInStock = selectedVariant.availableForSale && selectedVariant.quantityAvailable > 0
  const stockLevel = selectedVariant.quantityAvailable

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      price: selectedVariant.price,
      image: product.images[0]?.url || null,
    })
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleOptionChange = (optionName: string, value: string) => {
    const newSelectedOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newSelectedOptions)

    // Find variant that matches selected options
    const matchingVariant = product.variants.find((variant) =>
      variant.selectedOptions.every((option) => newSelectedOptions[option.name] === option.value),
    )

    if (matchingVariant) {
      setSelectedVariant(matchingVariant)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Product Title and Rating */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {product.vendor && (
            <Badge variant="outline" className="border-black/20 text-black/70 bg-white font-light text-xs tracking-wide">
              {product.vendor}
            </Badge>
          )}
          {product.productType && (
            <Badge variant="outline" className="border-black/20 text-black/70 bg-white font-light text-xs tracking-wide">
              {product.productType}
            </Badge>
          )}
          {discount && <Badge className="bg-white border border-black/20 text-black font-light text-xs tracking-wide">-{discount}%</Badge>}
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-extralight text-black leading-tight tracking-wide">{product.title}</h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-black/60 font-light tracking-wide">(4.8) • 127 reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl md:text-3xl font-light text-brand-green tracking-tight">€{selectedVariant.price.toFixed(2)}</span>
          {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
            <span className="text-lg md:text-xl text-black/50 line-through font-extralight tracking-wide">
              €{selectedVariant.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-black/60 font-light tracking-wide">Tax included. Shipping calculated at checkout.</p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {isInStock ? (
          <>
            <div className="w-2 h-2 bg-brand-green rounded-full"></div>
            <span className="text-brand-green font-light text-sm tracking-wide">
              In Stock {stockLevel > 0 && stockLevel <= 10 && `(${stockLevel} left)`}
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-light text-sm tracking-wide">Out of Stock</span>
          </>
        )}
      </div>

      {/* Product Options */}
      {product.options.map((option) => (
        <div key={option.name} className="space-y-3">
          <h3 className="font-light text-black text-sm md:text-base tracking-wide">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <Button
                key={value}
                variant={selectedOptions[option.name] === value ? "default" : "outline"}
                size="sm"
                onClick={() => handleOptionChange(option.name, value)}
                className={
                  selectedOptions[option.name] === value
                    ? "bg-brand-green hover:bg-brand-green-dark text-white font-light tracking-wide"
                    : "border-black/20 text-black hover:border-brand-green hover:text-brand-green font-light bg-white tracking-wide"
                }
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-light text-black text-sm md:text-base tracking-wide">Quantity</h3>
        <div className="flex items-center border border-black/20 rounded-lg w-fit bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="px-3 hover:bg-gray-50 text-black font-light"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 py-2 text-center min-w-[50px] font-light tracking-wide">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= stockLevel}
            className="px-3 hover:bg-gray-50 text-black font-light"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Section */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white h-12 text-sm md:text-base font-light transition-all duration-200 tracking-wide"
            disabled={!isInStock}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Added to Cart!</span>
                <span className="sm:hidden">Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">
                  {isInStock ? `Add to Cart - €${(selectedVariant.price * quantity).toFixed(2)}` : "Out of Stock"}
                </span>
                <span className="sm:hidden">
                  {isInStock ? `Add €${(selectedVariant.price * quantity).toFixed(2)}` : "Out of Stock"}
                </span>
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`h-12 px-4 transition-all duration-200 ${
              isWishlisted
                ? "text-brand-green border-brand-green bg-brand-green/10 hover:bg-brand-green/20"
                : "border-black/20 hover:border-brand-green hover:text-brand-green bg-white"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-4 border-black/20 hover:border-brand-green hover:text-brand-green transition-all duration-200 bg-white"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 border-black/20 text-black hover:bg-black hover:text-white transition-all duration-200 font-light tracking-wide"
          disabled={!isInStock}
        >
          Buy it now
        </Button>
      </div>

      {/* Product Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/10">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-5 h-5 text-brand-green flex-shrink-0" />
          <div>
            <div className="font-light text-black tracking-wide">Free Shipping</div>
            <div className="text-black/60 font-extralight tracking-wide">On orders over €50</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-5 h-5 text-brand-green flex-shrink-0" />
          <div>
            <div className="font-light text-black tracking-wide">Secure Payment</div>
            <div className="text-black/60 font-extralight tracking-wide">SSL encrypted</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="w-5 h-5 text-brand-green flex-shrink-0" />
          <div>
            <div className="font-light text-black tracking-wide">Easy Returns</div>
            <div className="text-black/60 font-extralight tracking-wide">30-day policy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
