import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify-server"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UPDATE_CART_LINES_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
    const { cartId, lines } = await request.json()

    const data = await shopifyFetch({
      query: UPDATE_CART_LINES_MUTATION,
      variables: {
        cartId,
        lines: lines.map((line: any) => ({
          id: line.id,
          quantity: line.quantity,
        })),
      },
    })

    if (data.cartLinesUpdate.userErrors.length > 0) {
      return NextResponse.json({ error: data.cartLinesUpdate.userErrors[0].message }, { status: 400 })
    }

    const cart = data.cartLinesUpdate.cart

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
    console.error("API Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
} 