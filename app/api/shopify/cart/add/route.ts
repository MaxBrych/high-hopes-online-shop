import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify-server"

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
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
      query: ADD_TO_CART_MUTATION,
      variables: {
        cartId,
        lines: lines.map((line: any) => ({
          merchandiseId: line.variantId,
          quantity: line.quantity,
        })),
      },
    })

    if (data.cartLinesAdd.userErrors.length > 0) {
      return NextResponse.json({ error: data.cartLinesAdd.userErrors[0].message }, { status: 400 })
    }

    const cart = data.cartLinesAdd.cart

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
    console.error("API Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
