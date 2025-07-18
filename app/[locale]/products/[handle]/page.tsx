import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { RelatedProducts } from "@/components/related-products"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { shopifyFetch, getProducts } from "@/lib/shopify-server"
import { notFound } from "next/navigation"

// GraphQL query to get a single product by handle
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

async function getProduct(handle: string) {
  try {
    const data: any = await shopifyFetch({
      query: GET_PRODUCT_QUERY,
      variables: { handle },
    })

    if (!data.product) return null

    const product = data.product

    return {
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
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you're looking for doesn't exist.",
    }
  }

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0].url] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const [product, relatedProducts] = await Promise.all([getProduct(params.handle), getProducts(8)])

  if (!product) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/collections/all" },
    { label: product.productType || "Category", href: `/collections/${product.productType?.toLowerCase()}` },
    { label: product.title, href: `/products/${product.handle}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductGallery images={product.images} productTitle={product.title} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />

        <RelatedProducts products={relatedProducts.filter((p: any) => p.id !== product.id).slice(0, 4)} />
      </div>

      <Footer />
    </div>
  )
}
