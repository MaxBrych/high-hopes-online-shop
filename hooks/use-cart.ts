"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  variantId: string
  title: string
  price: number
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  shopifyCartId: string | null
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  checkout: () => Promise<void>
  createShopifyCart: () => Promise<string>
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      shopifyCartId: null,

      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find((item) => item.variantId === newItem.variantId)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.variantId === newItem.variantId ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [], shopifyCartId: null })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      createShopifyCart: async () => {
        const items = get().items
        
        if (items.length === 0) {
          throw new Error('Cart is empty')
        }

        try {
          const response = await fetch('/api/shopify/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lines: items.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
              })),
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to create cart')
          }

          const data = await response.json()
          set({ shopifyCartId: data.cart.id })
          
          return data.cart.checkoutUrl
        } catch (error) {
          console.error('Error creating Shopify cart:', error)
          throw error
        }
      },

      checkout: async () => {
        try {
          const checkoutUrl = await get().createShopifyCart()
          
          // Redirect to Shopify checkout
          window.location.href = checkoutUrl
        } catch (error) {
          console.error('Checkout error:', error)
          throw error
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
