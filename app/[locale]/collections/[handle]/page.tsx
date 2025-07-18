import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { CollectionHeader } from "@/components/collection-header"
import { ProductFilters } from "@/components/product-filters"
import { ProductGridCollection } from "@/components/product-grid-collection"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { shopifyFetch } from "@/lib/shopify-server"
import { notFound } from "next/navigation"
import { Suspense } from "react"

// GraphQL query to get a collection by handle
const GET_COLLECTION_QUERY = `
  query getCollection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url
        altText
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            description
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
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  quantityAvailable
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`

async function getCollection(handle: string, searchParams: any = {}) {
  try {
    // Map sort options to Shopify's sort keys
    const sortMapping: Record<string, { sortKey: string; reverse: boolean }> = {
      "best-selling": { sortKey: "BEST_SELLING", reverse: false },
      "title-ascending": { sortKey: "TITLE", reverse: false },
      "title-descending": { sortKey: "TITLE", reverse: true },
      "price-ascending": { sortKey: "PRICE", reverse: false },
      "price-descending": { sortKey: "PRICE", reverse: true },
      "created-descending": { sortKey: "CREATED", reverse: true },
      "created-ascending": { sortKey: "CREATED", reverse: false },
    }

    const sortOption = searchParams.sort || "best-selling"
    const { sortKey, reverse } = sortMapping[sortOption] || sortMapping["best-selling"]
    const first = Number.parseInt(searchParams.limit) || 24

    const data = await shopifyFetch({
      query: GET_COLLECTION_QUERY,
      variables: {
        handle,
        first,
        sortKey,
        reverse,
      },
    })

    if (!data.collection) return null

    const collection = data.collection

    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      descriptionHtml: collection.descriptionHtml,
      image: collection.image,
      products: collection.products.edges.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        vendor: node.vendor || "",
        productType: node.productType || "",
        tags: node.tags || [],
        price: Number.parseFloat(node.priceRange.minVariantPrice.amount),
        maxPrice: Number.parseFloat(node.priceRange.maxVariantPrice.amount),
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
        compareAtPrice: node.compareAtPriceRange.minVariantPrice?.amount
          ? Number.parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
          : null,
        image: node.images.edges[0]?.node.url || null,
        imageAlt: node.images.edges[0]?.node.altText || node.title,
        variantId: node.variants.edges[0]?.node.id || null,
        availableForSale: node.variants.edges[0]?.node.availableForSale || false,
        quantityAvailable: node.variants.edges[0]?.node.quantityAvailable || 0,
      })),
      pageInfo: collection.products.pageInfo,
    }
  } catch (error) {
    console.error("Error fetching collection:", error)

    // Return fallback data for demo purposes
    return {
      id: `fallback-${handle}`,
      title: handle.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      handle,
      description: `Discover our premium ${handle.replace(/-/g, " ")} collection`,
      descriptionHtml: `<p>Discover our premium ${handle.replace(/-/g, " ")} collection with high-quality products.</p>`,
      image: null,
      products: [
        {
          id: "fallback-1",
          title: "Premium Herb Grinder - 4 Piece",
          handle: "premium-herb-grinder-4-piece",
          description: "Professional 4-piece herb grinder with pollen catcher",
          vendor: "GrinderPro",
          productType: "Grinder",
          tags: ["bestseller", "premium"],
          price: 24.95,
          maxPrice: 24.95,
          currencyCode: "EUR",
          compareAtPrice: 34.95,
          image: "/placeholder-afc3k.png",
          imageAlt: "4-Piece Herb Grinder",
          variantId: "fallback-variant-1",
          availableForSale: true,
          quantityAvailable: 10,
        },
        {
          id: "fallback-2",
          title: "Aluminum Grinder - 2 Piece",
          handle: "aluminum-grinder-2-piece",
          description: "Lightweight aluminum grinder for everyday use",
          vendor: "GrinderPro",
          productType: "Grinder",
          tags: ["new"],
          price: 15.99,
          maxPrice: 15.99,
          currencyCode: "EUR",
          compareAtPrice: null,
          image: "/placeholder-afc3k.png",
          imageAlt: "2-Piece Aluminum Grinder",
          variantId: "fallback-variant-2",
          availableForSale: true,
          quantityAvailable: 5,
        },
        {
          id: "fallback-3",
          title: "Electric Grinder - Premium",
          handle: "electric-grinder-premium",
          description: "High-performance electric grinder with multiple settings",
          vendor: "ElectricGrind",
          productType: "Grinder",
          tags: ["premium", "electric"],
          price: 89.99,
          maxPrice: 89.99,
          currencyCode: "EUR",
          compareAtPrice: 119.99,
          image: "/placeholder-afc3k.png",
          imageAlt: "Premium Electric Grinder",
          variantId: "fallback-variant-3",
          availableForSale: true,
          quantityAvailable: 3,
        },
        {
          id: "fallback-4",
          title: "Wooden Grinder - Handcrafted",
          handle: "wooden-grinder-handcrafted",
          description: "Beautiful handcrafted wooden grinder",
          vendor: "WoodCraft",
          productType: "Grinder",
          tags: ["handmade", "eco-friendly"],
          price: 39.99,
          maxPrice: 39.99,
          currencyCode: "EUR",
          compareAtPrice: null,
          image: "/placeholder-afc3k.png",
          imageAlt: "Handcrafted Wooden Grinder",
          variantId: "fallback-variant-4",
          availableForSale: false,
          quantityAvailable: 0,
        },
      ],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }
  }
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const collection = await getCollection(params.handle)

  if (!collection) {
    return {
      title: "Collection not found",
      description: "The collection you're looking for doesn't exist.",
    }
  }

  return {
    title: `${collection.title} | buyhigh`,
    description: collection.description || `Shop our ${collection.title} collection`,
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: { handle: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const collection = await getCollection(params.handle, searchParams)

  if (!collection) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: collection.title, href: `/collections/${collection.handle}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <CollectionHeader collection={collection} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-white rounded-lg animate-pulse" />}>
              <ProductFilters products={collection.products} />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <Suspense fallback={<div className="h-96 bg-white rounded-lg animate-pulse" />}>
              <ProductGridCollection
                products={collection.products}
                totalProducts={collection.products.length}
                hasNextPage={collection.pageInfo.hasNextPage}
              />
            </Suspense>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
