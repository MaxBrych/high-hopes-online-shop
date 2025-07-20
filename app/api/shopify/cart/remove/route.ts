import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify-server"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const REMOVE_CART_LINES_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const { cartId, lineIds } = await request.json()

    const data = await shopifyFetch({
      query: REMOVE_CART_LINES_MUTATION,
      variables: {
        cartId,
        lineIds,
      },
    })

    if (data.cartLinesRemove.userErrors.length > 0) {
      return NextResponse.json({ error: data.cartLinesRemove.userErrors[0].message }, { status: 400 })
    }

    const cart = data.cartLinesRemove.cart

    const formattedCart = {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      totalAmount: Number.parseFloat(cart.cost.totalAmount.amount),
      currencyCode: cart.cost.totalAmount.currencyCode,
      lines: cart.lines.edges.map(({ node }: any) => ({
        id: node.id,
        variantId: node.merchandise.id,
        title: node.merchandise.product.title,
        price: Number.parseFloat(node.merchandise.price.amount),
        quantity: node.quantity,
      })),
    }

    return NextResponse.json({ cart: formattedCart })
  } catch (error) {
    console.error("API Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
} 