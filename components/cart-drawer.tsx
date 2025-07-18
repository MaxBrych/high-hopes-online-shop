"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, CreditCard, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart()

  const shippingThreshold = 39
  const currentTotal = getTotalPrice()
  const freeShippingRemaining = Math.max(0, shippingThreshold - currentTotal)
  const hasFreeShipping = currentTotal >= shippingThreshold

  const CartContent = () => (
    <>
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900">Your cart is empty</h3>
          <p className="text-gray-500 mb-6 text-sm">Discover our premium growing supplies and genetics</p>
          <DrawerClose asChild>
            <Button className="bg-primary hover:bg-primary/90 min-h-[44px] touch-manipulation">Start Shopping</Button>
          </DrawerClose>
        </div>
      ) : (
        <>
          {/* Free Shipping Progress */}
          {!hasFreeShipping && (
            <div className="px-6 py-4 bg-primary/5 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">Free Shipping Progress</span>
                <span className="text-sm text-primary">€{freeShippingRemaining.toFixed(2)} to go</span>
              </div>
              <div className="w-full bg-primary/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentTotal / shippingThreshold) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-primary/80 mt-1">
                Add €{freeShippingRemaining.toFixed(2)} more for free shipping!
              </p>
            </div>
          )}

          {hasFreeShipping && (
            <div className="px-6 py-3 bg-primary/10 border-b">
              <div className="flex items-center text-primary">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-sm font-medium">🎉 You qualify for free shipping!</span>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <ScrollArea className="flex-1 bg-white">
            <div className="px-6 py-4 space-y-4">
              {items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                      {item.image ? (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{item.title}</h4>
                        <p className="text-sm text-primary font-semibold mt-1">€{item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3 h-9 hover:bg-gray-100 min-h-[36px] touch-manipulation"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 text-sm font-medium min-w-[2rem] text-center py-2">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3 h-9 hover:bg-gray-100 min-h-[36px] touch-manipulation"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-500 p-2 min-h-[36px] min-w-[36px] touch-manipulation"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Cart Footer */}
          <div className="border-t bg-white p-6 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">€{currentTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-primary">{hasFreeShipping ? "Free" : "€4.99"}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">€{(currentTotal + (hasFreeShipping ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/checkout" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 min-h-[48px] touch-manipulation">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Checkout - €{(currentTotal + (hasFreeShipping ? 0 : 4.99)).toFixed(2)}
                </Button>
              </Link>

              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 min-h-[48px] touch-manipulation bg-transparent"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DrawerClose>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center text-xs text-gray-500 pt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )

  return (
    <Drawer open={isOpen} onOpenChange={toggleCart}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative p-2 min-h-[44px] min-w-[44px] touch-manipulation"
          aria-label="Open shopping cart"
        >
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center min-w-[20px] h-5 pointer-events-none">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-[85vh] sm:max-h-[85vh]">
        <DrawerHeader className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center text-lg">
              <ShoppingCart className="w-5 h-5 mr-3 text-primary" />
              Shopping Cart
              {getTotalItems() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                </Badge>
              )}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col h-full">
          <CartContent />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
