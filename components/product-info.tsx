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
      quantity,
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
    <div className="space-y-8">
      {/* Product Title and Rating */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          {product.vendor && (
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-normal">
              {product.vendor}
            </Badge>
          )}
          {product.productType && (
            <Badge variant="outline" className="border-brand-dark/20 text-brand-dark/70 bg-brand-light/50 font-normal">
              {product.productType}
            </Badge>
          )}
          {discount && <Badge className="bg-red-500 text-white font-normal">-{discount}%</Badge>}
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-brand-dark leading-tight">{product.title}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-brand-dark/60 font-light">(4.8) • 127 reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-medium text-primary">€{selectedVariant.price.toFixed(2)}</span>
          {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
            <span className="text-xl text-brand-dark/50 line-through font-light">
              €{selectedVariant.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-brand-dark/60 font-light">Tax included. Shipping calculated at checkout.</p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {isInStock ? (
          <>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary font-medium text-sm">
              In Stock {stockLevel > 0 && stockLevel <= 10 && `(${stockLevel} left)`}
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium text-sm">Out of Stock</span>
          </>
        )}
      </div>

      {/* Product Options */}
      {product.options.map((option) => (
        <div key={option.name} className="space-y-3">
          <h3 className="font-medium text-brand-dark">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <Button
                key={value}
                variant={selectedOptions[option.name] === value ? "default" : "outline"}
                size="sm"
                onClick={() => handleOptionChange(option.name, value)}
                className={
                  selectedOptions[option.name] === value
                    ? "bg-primary hover:bg-primary/90 text-white font-normal"
                    : "border-brand-dark/20 text-brand-dark hover:border-primary hover:text-primary font-normal"
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
        <h3 className="font-medium text-brand-dark">Quantity</h3>
        <div className="flex items-center border border-brand-dark/20 rounded-lg w-fit bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="px-3 hover:bg-brand-light text-brand-dark"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 py-2 text-center min-w-[50px] font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= stockLevel}
            className="px-3 hover:bg-brand-light text-brand-dark"
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
            className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 text-base font-medium transition-all duration-200"
            disabled={!isInStock}
            onClick={handleAddToCart}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isInStock ? `Add to Cart - €${(selectedVariant.price * quantity).toFixed(2)}` : "Out of Stock"}
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`h-12 px-4 transition-all duration-200 ${
              isWishlisted
                ? "text-red-500 border-red-500 bg-red-50 hover:bg-red-100"
                : "border-brand-dark/20 hover:border-primary hover:text-primary"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-4 border-brand-dark/20 hover:border-primary hover:text-primary transition-all duration-200 bg-transparent"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium bg-transparent"
        >
          Buy Now - Express Checkout
        </Button>
      </div>

      {/* Product Features */}
      <Card className="border-brand-dark/10 bg-gradient-to-br from-white to-brand-light/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-brand-dark">Free Shipping</p>
                <p className="text-sm text-brand-dark/60 font-light">Orders over €50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-brand-dark">Lab Tested</p>
                <p className="text-sm text-brand-dark/60 font-light">Quality guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-brand-dark">Easy Returns</p>
                <p className="text-sm text-brand-dark/60 font-light">30-day policy</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Tags */}
      {product.tags.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-brand-dark">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 8).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-brand-light text-brand-dark/70 hover:bg-primary/10 hover:text-primary transition-colors font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
