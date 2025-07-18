"use client"

// Client-side Shopify API utilities - now using API routes instead of direct calls

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  price: number
  currencyCode: string
  compareAtPrice: number | null
  image: string | null
  imageAlt: string
  variantId: string
  availableForSale: boolean
}

export interface CartItem {
  id: string
  variantId: string
  title: string
  price: number
  quantity: number
  image?: string
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  totalAmount: number
  currencyCode: string
  lines: CartItem[]
}

// Client-side API calls using Next.js API routes
export async function getProducts(first = 20): Promise<Product[]> {
  try {
    const response = await fetch(`/api/shopify/products?first=${first}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/shopify/products/${handle}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.product || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function createCart(lines: { variantId: string; quantity: number }[]): Promise<Cart | null> {
  try {
    const response = await fetch("/api/shopify/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lines }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.cart || null
  } catch (error) {
    console.error("Error creating cart:", error)
    return null
  }
}

export async function addToCart(
  cartId: string,
  lines: { variantId: string; quantity: number }[],
): Promise<Cart | null> {
  try {
    const response = await fetch("/api/shopify/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId, lines }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.cart || null
  } catch (error) {
    console.error("Error adding to cart:", error)
    return null
  }
}
