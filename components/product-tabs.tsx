"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp } from "lucide-react"

interface Product {
  id: string
  title: string
  description: string
  descriptionHtml: string
  vendor: string
  productType: string
  tags: string[]
}

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews (127)" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping & Returns" },
  ]

  const mockReviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality product! Fast shipping and great customer service.",
      verified: true,
    },
    {
      id: 2,
      name: "Mike K.",
      rating: 4,
      date: "2024-01-10",
      comment: "Good product, exactly as described. Would recommend.",
      verified: true,
    },
    {
      id: 3,
      name: "Anna L.",
      rating: 5,
      date: "2024-01-08",
      comment: "Amazing quality and fast delivery. Will definitely order again!",
      verified: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              {!product.descriptionHtml && (
                <p className="text-gray-600">{product.description || "No description available for this product."}</p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Review Summary */}
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="flex items-center justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">127 reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? "89" : rating === 4 ? "25" : rating === 3 ? "8" : rating === 2 ? "3" : "2"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium text-sm">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Verified</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                Load More Reviews
              </Button>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Product Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand:</dt>
                      <dd className="font-medium">{product.vendor || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="font-medium">{product.productType || "N/A"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">SKU:</dt>
                      <dd className="font-medium">{product.id.split("/").pop()}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Premium quality materials</li>
                    <li>• Tested for purity and potency</li>
                    <li>• Third-party lab verified</li>
                    <li>• Sustainable packaging</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Shipping Information</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Free shipping on orders over €39</li>
                  <li>• Standard delivery: 2-3 business days</li>
                  <li>• Express delivery: 1-2 business days (€4.99)</li>
                  <li>• Orders placed before 2 PM ship same day</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Returns & Exchanges</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 30-day return policy</li>
                  <li>• Items must be unused and in original packaging</li>
                  <li>• Free returns for defective items</li>
                  <li>• Return shipping: €2.99 (deducted from refund)</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
