"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, ShoppingCart, X, Star } from "lucide-react"
import Image from "next/image"

const mockWishlistItems = [
  {
    id: 1,
    name: "White Widow Feminized Seeds",
    price: 45.0,
    originalPrice: 55.0,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=200&text=White+Widow",
    category: "Seeds",
    inStock: true,
    description: "Classic strain with high THC content and easy growing characteristics",
  },
  {
    id: 2,
    name: "LED Grow Light 600W Full Spectrum",
    price: 189.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=200&text=LED+Light",
    category: "Lighting",
    inStock: true,
    description: "Professional full spectrum LED for all growth stages",
  },
  {
    id: 3,
    name: "Northern Lights Auto Seeds",
    price: 78.0,
    originalPrice: 89.0,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200&text=Northern+Lights",
    category: "Seeds",
    inStock: false,
    description: "Autoflowering strain perfect for beginners",
  },
  {
    id: 4,
    name: "Complete Hydroponic System",
    price: 234.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=200&text=Hydroponic",
    category: "Equipment",
    inStock: true,
    description: "All-in-one hydroponic growing system for maximum yields",
  },
  {
    id: 5,
    name: "Gorilla Glue #4 Seeds",
    price: 67.5,
    originalPrice: 75.0,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=200&text=Gorilla+Glue",
    category: "Seeds",
    inStock: true,
    description: "High potency strain with sticky resinous buds",
  },
]

export function WishlistContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-brand-dark mb-2">My Wishlist</h2>
        <p className="text-brand-dark/70">Your saved seeds and growing equipment ({mockWishlistItems.length} items)</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search wishlist..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="seeds">Seeds</SelectItem>
            <SelectItem value="lighting">Lighting</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="nutrients">Nutrients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWishlistItems.map((item) => (
          <Card key={item.id} className="border border-brand-dark/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Badge className="absolute top-2 left-2 bg-primary/10 text-primary">{item.category}</Badge>
                {!item.inStock && (
                  <Badge className="absolute bottom-2 left-2 bg-red-100 text-red-800">Out of Stock</Badge>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-brand-dark line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-brand-dark/60 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-brand-dark/60">({item.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-brand-dark">€{item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-brand-dark/60 line-through">€{item.originalPrice.toFixed(2)}</span>
                  )}
                  {item.originalPrice && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Save €{(item.originalPrice - item.price).toFixed(2)}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" disabled={!item.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockWishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">Your wishlist is empty</h3>
          <p className="text-brand-dark/60 mb-4">Start adding seeds and equipment you love!</p>
          <Button>Browse Products</Button>
        </div>
      )}
    </div>
  )
}
