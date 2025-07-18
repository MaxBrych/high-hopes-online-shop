"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ChevronDown } from "lucide-react"

interface Product {
  id: string
  title: string
  handle: string
  price: number
  compareAtPrice: number | null
  image: string | null
  imageAlt: string
  variantId: string
  availableForSale: boolean
  vendor?: string
  tags?: string[]
}

interface ProductGridCollectionProps {
  products: Product[]
  totalProducts: number
  hasNextPage: boolean
}

export function ProductGridCollection({ products, totalProducts, hasNextPage }: ProductGridCollectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("best-selling")

  const sortOptions = [
    { value: "best-selling", label: "Best Selling" },
    { value: "title-ascending", label: "Alphabetically, A-Z" },
    { value: "title-descending", label: "Alphabetically, Z-A" },
    { value: "price-ascending", label: "Price, low to high" },
    { value: "price-descending", label: "Price, high to low" },
    { value: "created-descending", label: "Date, new to old" },
    { value: "created-ascending", label: "Date, old to new" },
  ]

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg border border-brand-dark/10">
        <div className="flex items-center gap-4">
          <span className="text-sm text-brand-dark/60 font-light">
            {totalProducts} product{totalProducts !== 1 ? "s" : ""}
          </span>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-brand-dark/20 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 ${viewMode === "grid" ? "bg-primary text-white" : "text-brand-dark hover:text-primary"}`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 ${viewMode === "list" ? "bg-primary text-white" : "text-brand-dark hover:text-primary"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-brand-dark/60 font-light">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 border-brand-dark/20 text-brand-dark">
              <SelectValue />
              <ChevronDown className="w-4 h-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-brand-dark">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-brand-light rounded-full flex items-center justify-center">
            <Grid className="w-8 h-8 text-brand-dark/40" />
          </div>
          <h3 className="text-lg font-medium text-brand-dark mb-2">No products found</h3>
          <p className="text-brand-dark/60 font-light">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Load More */}
      {hasNextPage && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium bg-transparent"
          >
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}
