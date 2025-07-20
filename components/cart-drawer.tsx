"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, CreditCard, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalItems, getTotalPrice, checkout } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const shippingThreshold = 50
  const currentTotal = getTotalPrice()
  const freeShippingRemaining = Math.max(0, shippingThreshold - currentTotal)
  const hasFreeShipping = currentTotal >= shippingThreshold

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      await checkout()
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  const CartContent = () => (
    <>
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: '#F4F1E0' }}>
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
            <ShoppingCart className="w-10 h-10 text-black/40" />
          </div>
          <h3 className="font-light text-lg mb-2 text-black tracking-wide">Your cart is empty</h3>
          <p className="text-black/60 mb-6 text-sm font-light tracking-wide">Discover our premium cannabis products</p>
          <DrawerClose asChild>
            <Button className="bg-brand-green hover:bg-brand-green-dark text-white font-light tracking-wide min-h-[44px] touch-manipulation">
              Start Shopping
            </Button>
          </DrawerClose>
        </div>
      ) : (
        <>
          {/* Free Shipping Progress */}
          {!hasFreeShipping && (
            <div className="px-6 py-4 bg-brand-green/5 border-b border-black/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-light text-brand-green tracking-wide">Free Shipping Progress</span>
                <span className="text-sm text-brand-green font-light">€{freeShippingRemaining.toFixed(2)} to go</span>
              </div>
              <div className="w-full bg-brand-green/20 rounded-full h-2">
                <div
                  className="bg-brand-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentTotal / shippingThreshold) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-brand-green/80 mt-1 font-light tracking-wide">
                Add €{freeShippingRemaining.toFixed(2)} more for free shipping!
              </p>
            </div>
          )}

          {hasFreeShipping && (
            <div className="px-6 py-3 bg-brand-green/10 border-b border-black/5">
              <div className="flex items-center text-brand-green">
                <div className="w-2 h-2 bg-brand-green rounded-full mr-2"></div>
                <span className="text-sm font-light tracking-wide">🎉 You qualify for free shipping!</span>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <ScrollArea className="flex-1 bg-white">
            <div className="px-6 py-4 space-y-4">
              {items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white" style={{ backgroundColor: '#F4F1E0' }}>
                      {item.image ? (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-black/40 text-xs font-light">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-light text-black line-clamp-2 leading-tight tracking-wide">{item.title}</h4>
                        <p className="text-sm text-brand-green font-light mt-1 tracking-wide">€{item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-black/20 rounded-md bg-white">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3 h-9 hover:bg-gray-50 min-h-[36px] touch-manipulation font-light"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 text-sm font-light min-w-[2rem] text-center py-2 tracking-wide">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3 h-9 hover:bg-gray-50 min-h-[36px] touch-manipulation font-light"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-light text-black tracking-wide">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-black/40 hover:text-red-500 p-2 min-h-[36px] min-w-[36px] touch-manipulation"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-4 border-black/5" />}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Cart Footer */}
          <div className="border-t border-black/10 bg-white p-6 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/60 font-light tracking-wide">Subtotal</span>
                <span className="font-light tracking-wide">€{currentTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60 font-light tracking-wide">Shipping</span>
                <span className="font-light text-brand-green tracking-wide">{hasFreeShipping ? "Free" : "€4.99"}</span>
              </div>
              <Separator className="border-black/10" />
              <div className="flex justify-between text-base">
                <span className="font-light tracking-wide">Total</span>
                <span className="text-brand-green font-light tracking-wide">€{(currentTotal + (hasFreeShipping ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-light py-3 min-h-[48px] touch-manipulation tracking-wide"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isCheckingOut ? "Creating checkout..." : `Checkout - €${(currentTotal + (hasFreeShipping ? 0 : 4.99)).toFixed(2)}`}
              </Button>

              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full border-black/20 text-black hover:bg-black hover:text-white min-h-[48px] touch-manipulation bg-white font-light tracking-wide"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DrawerClose>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center text-xs text-black/60 pt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-brand-green rounded-full mr-2"></div>
                <span className="font-light tracking-wide">Secure checkout with SSL encryption</span>
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
          className="relative p-2 min-h-[44px] min-w-[44px] touch-manipulation hover:bg-black/5"
          aria-label="Open shopping cart"
        >
          <ShoppingCart className="w-6 h-6 text-black" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-brand-green text-white rounded-full w-5 h-5 text-xs flex items-center justify-center min-w-[20px] h-5 pointer-events-none font-light">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-[85vh] sm:max-h-[85vh]">
        <DrawerHeader className="px-6 py-4 border-b border-black/10 bg-white">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center text-lg font-light tracking-wide">
              <ShoppingCart className="w-5 h-5 mr-3 text-brand-green" />
              Shopping Cart
              {getTotalItems() > 0 && (
                <Badge variant="outline" className="ml-2 border-black/20 text-black/70 font-light">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                </Badge>
              )}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-black/5">
                <X className="h-4 w-4 text-black" />
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
