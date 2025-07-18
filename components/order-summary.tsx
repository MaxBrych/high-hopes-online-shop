"use client"

import { useCart } from "@/hooks/use-cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShoppingBag, Truck, Shield } from "lucide-react"

export function OrderSummary() {
  const { items, getTotalItems, getTotalPrice } = useCart()

  const subtotal = getTotalPrice()
  const shippingThreshold = 39
  const hasFreeShipping = subtotal >= shippingThreshold
  const shippingCost = hasFreeShipping ? 0 : 4.99
  const tax = subtotal * 0.19 // 19% German VAT
  const total = subtotal + shippingCost + tax

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
            Ihre Bestellung ({getTotalItems()} {getTotalItems() === 1 ? "Artikel" : "Artikel"})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                  {item.image ? (
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                  <Badge className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                    {item.quantity}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                  <p className="text-sm text-gray-500">Menge: {item.quantity}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Total */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Zwischensumme</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Versand</span>
            <span className={hasFreeShipping ? "text-green-600 font-medium" : ""}>
              {hasFreeShipping ? "Kostenlos" : `€${shippingCost.toFixed(2)}`}
            </span>
          </div>

          {!hasFreeShipping && (
            <div className="text-xs text-gray-500 bg-green-50 p-2 rounded">
              Noch €{(shippingThreshold - subtotal).toFixed(2)} für kostenlosen Versand hinzufügen
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">MwSt. (19%)</span>
            <span>€{tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-semibold">
            <span>Gesamt</span>
            <span className="text-green-600">€{total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              SSL-verschlüsselte sichere Zahlung
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="w-4 h-4 mr-2 text-green-600" />
              Kostenloser Versand ab €39
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ShoppingBag className="w-4 h-4 mr-2 text-green-600" />
              30 Tage Rückgaberecht
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promo Code */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-medium">Rabattcode</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Code eingeben"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                Anwenden
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
