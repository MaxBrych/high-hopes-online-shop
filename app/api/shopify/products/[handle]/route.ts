import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify-server"

const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      descriptionHtml
      vendor
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
      seo {
        title
        description
      }
    }
  }
`

export async function GET(request: NextRequest, { params }: { params: { handle: string } }) {
  try {
    const data = await shopifyFetch({
      query: GET_PRODUCT_QUERY,
      variables: { handle: params.handle },
    })

    if (!data.product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const product = data.product

    const formattedProduct = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      minPrice: Number.parseFloat(product.priceRange.minVariantPrice.amount),
      maxPrice: Number.parseFloat(product.priceRange.maxVariantPrice.amount),
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      compareAtMinPrice: product.compareAtPriceRange.minVariantPrice.amount
        ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
        : null,
      compareAtMaxPrice: product.compareAtPriceRange.maxVariantPrice.amount
        ? Number.parseFloat(product.compareAtPriceRange.maxVariantPrice.amount)
        : null,
      images: product.images.edges.map(({ node }: any) => ({
        url: node.url,
        altText: node.altText || product.title,
        width: node.width,
        height: node.height,
      })),
      variants: product.variants.edges.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        availableForSale: node.availableForSale,
        quantityAvailable: node.quantityAvailable,
        price: Number.parseFloat(node.price.amount),
        compareAtPrice: node.compareAtPrice ? Number.parseFloat(node.compareAtPrice.amount) : null,
        selectedOptions: node.selectedOptions,
      })),
      options: product.options,
      seo: product.seo,
    }

    return NextResponse.json({ product: formattedProduct })
  } catch (error) {
    console.error("API Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
