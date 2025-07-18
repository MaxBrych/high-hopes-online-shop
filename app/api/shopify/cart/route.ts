import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify-server"

const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
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
    const { lines } = await request.json()

    const data = await shopifyFetch({
      query: CREATE_CART_MUTATION,
      variables: {
        input: {
          lines: lines.map((line: any) => ({
            merchandiseId: line.variantId,
            quantity: line.quantity,
          })),
        },
      },
    })

    if (data.cartCreate.userErrors.length > 0) {
      return NextResponse.json({ error: data.cartCreate.userErrors[0].message }, { status: 400 })
    }

    const cart = data.cartCreate.cart

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
    console.error("API Error creating cart:", error)
    return NextResponse.json({ error: "Failed to create cart" }, { status: 500 })
  }
}
