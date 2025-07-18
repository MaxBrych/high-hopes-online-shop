"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

interface Product {
  id: string
  title: string
  price: number
  vendor?: string
  productType?: string
  tags?: string[]
  availableForSale: boolean
}

interface ProductFiltersProps {
  products: Product[]
  onFiltersChange?: (filters: any) => void
}

export function ProductFilters({ products, onFiltersChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showOutOfStock, setShowOutOfStock] = useState(true)

  // Extract unique values from products
  const vendors = Array.from(new Set(products.map((p) => p.vendor).filter(Boolean))) as string[]
  const productTypes = Array.from(new Set(products.map((p) => p.productType).filter(Boolean))) as string[]
  const allTags = Array.from(new Set(products.flatMap((p) => p.tags || [])))
  const maxPrice = Math.max(...products.map((p) => p.price))

  const handleVendorChange = (vendor: string, checked: boolean) => {
    const newVendors = checked ? [...selectedVendors, vendor] : selectedVendors.filter((v) => v !== vendor)
    setSelectedVendors(newVendors)
    onFiltersChange?.({ vendors: newVendors, types: selectedTypes, tags: selectedTags, priceRange, showOutOfStock })
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked ? [...selectedTypes, type] : selectedTypes.filter((t) => t !== type)
    setSelectedTypes(newTypes)
    onFiltersChange?.({ vendors: selectedVendors, types: newTypes, tags: selectedTags, priceRange, showOutOfStock })
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
    setSelectedTags(newTags)
    onFiltersChange?.({ vendors: selectedVendors, types: selectedTypes, tags: newTags, priceRange, showOutOfStock })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange?.({
      vendors: selectedVendors,
      types: selectedTypes,
      tags: selectedTags,
      priceRange: value,
      showOutOfStock,
    })
  }

  const clearAllFilters = () => {
    setPriceRange([0, maxPrice])
    setSelectedVendors([])
    setSelectedTypes([])
    setSelectedTags([])
    setShowOutOfStock(true)
    onFiltersChange?.({ vendors: [], types: [], tags: [], priceRange: [0, maxPrice], showOutOfStock: true })
  }

  const activeFiltersCount =
    selectedVendors.length + selectedTypes.length + selectedTags.length + (!showOutOfStock ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium text-brand-dark">Filters</h2>
          {activeFiltersCount > 0 && <Badge className="bg-primary text-white">{activeFiltersCount}</Badge>}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-brand-dark/60 hover:text-primary">
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Card className="border-brand-dark/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-brand-dark">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={handlePriceChange} max={maxPrice} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-brand-dark/60">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="border-brand-dark/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-brand-dark">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={showOutOfStock}
              onCheckedChange={(checked) => {
                setShowOutOfStock(checked as boolean)
                onFiltersChange?.({
                  vendors: selectedVendors,
                  types: selectedTypes,
                  tags: selectedTags,
                  priceRange,
                  showOutOfStock: checked,
                })
              }}
            />
            <label htmlFor="in-stock" className="text-sm text-brand-dark cursor-pointer">
              Include out of stock
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Vendors */}
      {vendors.length > 0 && (
        <Card className="border-brand-dark/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-brand-dark">Brand</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendors.slice(0, 8).map((vendor) => (
              <div key={vendor} className="flex items-center space-x-2">
                <Checkbox
                  id={`vendor-${vendor}`}
                  checked={selectedVendors.includes(vendor)}
                  onCheckedChange={(checked) => handleVendorChange(vendor, checked as boolean)}
                />
                <label htmlFor={`vendor-${vendor}`} className="text-sm text-brand-dark cursor-pointer">
                  {vendor}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Product Types */}
      {productTypes.length > 0 && (
        <Card className="border-brand-dark/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-brand-dark">Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {productTypes.slice(0, 6).map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                />
                <label htmlFor={`type-${type}`} className="text-sm text-brand-dark cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <Card className="border-brand-dark/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-brand-dark">Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {allTags.slice(0, 10).map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                />
                <label htmlFor={`tag-${tag}`} className="text-sm text-brand-dark cursor-pointer">
                  {tag}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
