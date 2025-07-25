import { GraphQLClient } from "graphql-request"

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2023-10/graphql.json`

const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
    "Content-Type": "application/json",
  },
})

// Generic fetch function for Shopify GraphQL
export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  try {
    const data = await client.request(query, variables)
    return data
  } catch (error) {
    console.error("Shopify fetch error:", error)
    throw error
  }
}

// Fallback data for when Shopify is unavailable
const fallbackProducts = [
  {
    id: "1",
    title: "White Widow Feminized Seeds",
    handle: "white-widow-feminized",
    description: "Classic strain with balanced effects and high yields",
    images: [{ url: "/placeholder-1gyhc.png", altText: "White Widow Seeds" }],
    priceRange: { minVariantPrice: { amount: "29.99", currencyCode: "EUR" } },
    compareAtPriceRange: { minVariantPrice: { amount: "39.99", currencyCode: "EUR" } },
    availableForSale: true,
    tags: ["feminized", "indoor", "outdoor"],
    vendor: "Premium Genetics",
  },
  {
    id: "2",
    title: "LED Grow Light 600W",
    handle: "led-grow-light-600w",
    description: "Full spectrum LED for all growth stages",
    images: [{ url: "/placeholder-afc3k.png", altText: "LED Grow Light" }],
    priceRange: { minVariantPrice: { amount: "199.99", currencyCode: "EUR" } },
    compareAtPriceRange: { minVariantPrice: { amount: "249.99", currencyCode: "EUR" } },
    availableForSale: true,
    tags: ["lighting", "led", "indoor"],
    vendor: "GrowTech",
  },
  {
    id: "3",
    title: "Premium Growing Kit",
    handle: "premium-growing-kit",
    description: "Complete starter kit for indoor growing",
    images: [{ url: "/placeholder-7m2op.png", altText: "Growing Kit" }],
    priceRange: { minVariantPrice: { amount: "149.99", currencyCode: "EUR" } },
    compareAtPriceRange: { minVariantPrice: { amount: "199.99", currencyCode: "EUR" } },
    availableForSale: true,
    tags: ["kit", "beginner", "indoor"],
    vendor: "GrowHigh",
  },
]

const fallbackCollections = [
  {
    id: "1",
    title: "Cannabis Seeds",
    handle: "seeds",
    description: "Premium genetics from trusted breeders",
    image: { url: "/images/seeds-category.png", altText: "Cannabis Seeds" },
  },
  {
    id: "2",
    title: "Growing Equipment",
    handle: "equipment",
    description: "Professional growing tools and systems",
    image: { url: "/images/equipment-category.png", altText: "Growing Equipment" },
  },
  {
    id: "3",
    title: "Nutrients & Soil",
    handle: "nutrients",
    description: "Premium nutrients and growing mediums",
    image: { url: "/images/nutrients-category.png", altText: "Nutrients" },
  },
]

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
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
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
          availableForSale
          tags
          vendor
        }
      }
    }
  }
`

const COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`

const COLLECTION_PRODUCTS_QUERY = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                }
              }
            }
            availableForSale
            tags
            vendor
          }
        }
      }
    }
  }
`

export async function getProducts(first = 20) {
  try {
    console.log("Fetching from Shopify:", endpoint)
    console.log("Using domain:", process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN)
    console.log("Token length:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length)

    const data: any = await client.request(PRODUCTS_QUERY, { first })

    return data.products.edges.map((edge: any) => {
      const product = edge.node
      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        price: product.priceRange.minVariantPrice.amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
        compareAtPrice: product.compareAtPriceRange?.minVariantPrice?.amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : null,
        image: product.images.edges[0]?.node.url || null,
        imageAlt: product.images.edges[0]?.node.altText || product.title,
        variantId: product.variants.edges[0]?.node.id || '',
        availableForSale: product.availableForSale,
        vendor: product.vendor || '',
        tags: product.tags || []
      }
    })
  } catch (error) {
    console.error("Error fetching products, using fallback data:", error)
    // Transform fallback data to match expected format
    return fallbackProducts.map(product => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      compareAtPrice: product.compareAtPriceRange?.minVariantPrice?.amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : null,
      image: product.images[0]?.url || null,
      imageAlt: product.images[0]?.altText || product.title,
      variantId: `variant-${product.id}`,
      availableForSale: product.availableForSale,
      vendor: product.vendor || '',
      tags: product.tags || []
    }))
  }
}

export async function getCollections(first = 10) {
  try {
    const data: any = await client.request(COLLECTIONS_QUERY, { first })

    return data.collections.edges.map((edge: any) => edge.node)
  } catch (error) {
    console.error("Error fetching collections, using fallback data:", error)
    return fallbackCollections
  }
}

export async function getCollectionsWithProducts(handles: string[], first = 10) {
  try {
    const collections = await Promise.all(
      handles.map(async (handle) => {
        try {
          const data: any = await client.request(COLLECTION_PRODUCTS_QUERY, { handle, first })

          if (data.collection) {
            return {
              ...data.collection,
              products: data.collection.products.edges.map((edge: any) => ({
                id: edge.node.id,
                title: edge.node.title,
                handle: edge.node.handle,
                description: edge.node.description,
                price: edge.node.priceRange.minVariantPrice.amount ? parseFloat(edge.node.priceRange.minVariantPrice.amount) : 0,
                compareAtPrice: edge.node.compareAtPriceRange?.minVariantPrice?.amount ? parseFloat(edge.node.compareAtPriceRange.minVariantPrice.amount) : null,
                image: edge.node.images.edges[0]?.node.url || null,
                imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
                variantId: edge.node.variants.edges[0]?.node.id || '',
                availableForSale: edge.node.availableForSale,
                vendor: edge.node.vendor || '',
                tags: edge.node.tags || []
              })),
            }
          }
          return null
        } catch (error) {
          console.error(`Error fetching products for collection ${handle}:`, error)
          return null
        }
      }),
    )

    return collections.filter(Boolean)
  } catch (error) {
    console.error("Error fetching collections with products:", error)
    return []
  }
}

export async function getAllCollectionsWithProducts(first = 10, productsPerCollection = 8) {
  try {
    // First, get all available collections
    const collectionsData: any = await client.request(COLLECTIONS_QUERY, { first })
    const collections = collectionsData.collections.edges.map((edge: any) => edge.node)

    // Then, get products for each collection
    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection: any) => {
        try {
          const data: any = await client.request(COLLECTION_PRODUCTS_QUERY, { 
            handle: collection.handle, 
            first: productsPerCollection 
          })

          if (data.collection && data.collection.products.edges.length > 0) {
            return {
              ...data.collection,
              products: data.collection.products.edges.map((edge: any) => ({
                id: edge.node.id,
                title: edge.node.title,
                handle: edge.node.handle,
                description: edge.node.description,
                price: edge.node.priceRange.minVariantPrice.amount ? parseFloat(edge.node.priceRange.minVariantPrice.amount) : 0,
                compareAtPrice: edge.node.compareAtPriceRange?.minVariantPrice?.amount ? parseFloat(edge.node.compareAtPriceRange.minVariantPrice.amount) : null,
                image: edge.node.images.edges[0]?.node.url || null,
                imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
                variantId: edge.node.variants.edges[0]?.node.id || '',
                availableForSale: edge.node.availableForSale,
                vendor: edge.node.vendor || '',
                tags: edge.node.tags || []
              })),
            }
          }
          return null
        } catch (error) {
          console.error(`Error fetching products for collection ${collection.handle}:`, error)
          return null
        }
      }),
    )

    // Filter out null collections and return only collections with products
    return collectionsWithProducts.filter(collection => collection && collection.products.length > 0)
  } catch (error) {
    console.error("Error fetching all collections with products:", error)
    
    // Return fallback collections with sample products
    return [
      {
        id: "1",
        title: "Cannabis Seeds",
        handle: "seeds",
        description: "Premium genetics from trusted breeders",
        products: [
          {
            id: "seed-1",
            title: "White Widow Feminized Seeds",
            handle: "white-widow-feminized",
            description: "Classic strain with balanced effects",
            price: 24.99,
            compareAtPrice: 29.99,
            image: "/placeholder-afc3k.png",
            imageAlt: "White Widow Seeds",
            variantId: "variant-seed-1",
            availableForSale: true,
            vendor: "SeedBank Pro",
            tags: ["feminized", "bestseller"]
          },
          {
            id: "seed-2", 
            title: "Northern Lights Auto Seeds",
            handle: "northern-lights-auto",
            description: "Easy autoflowering variety",
            price: 19.99,
            compareAtPrice: null,
            image: "/placeholder-afc3k.png",
            imageAlt: "Northern Lights Auto Seeds",
            variantId: "variant-seed-2",
            availableForSale: true,
            vendor: "SeedBank Pro",
            tags: ["autoflower", "beginner"]
          }
        ]
      },
      {
        id: "2",
        title: "Growing Equipment",
        handle: "equipment",
        description: "Professional growing tools and systems",
        products: [
          {
            id: "equip-1",
            title: "LED Grow Light 600W",
            handle: "led-grow-light-600w",
            description: "Full spectrum LED for indoor growing",
            price: 149.99,
            compareAtPrice: 199.99,
            image: "/placeholder-afc3k.png",
            imageAlt: "LED Grow Light",
            variantId: "variant-equip-1",
            availableForSale: true,
            vendor: "GrowTech",
            tags: ["led", "600w", "sale"]
          },
          {
            id: "equip-2",
            title: "Grow Tent 4x4",
            handle: "grow-tent-4x4",
            description: "Complete growing environment",
            price: 89.99,
            compareAtPrice: null,
            image: "/placeholder-afc3k.png",
            imageAlt: "Grow Tent",
            variantId: "variant-equip-2",
            availableForSale: true,
            vendor: "GrowTech",
            tags: ["tent", "4x4"]
          }
        ]
      },
      {
        id: "3",
        title: "Accessories",
        handle: "accessories",
        description: "Essential tools and smoking accessories",
        products: [
          {
            id: "acc-1",
            title: "Premium Herb Grinder",
            handle: "premium-herb-grinder",
            description: "4-piece aluminum grinder with pollen catcher",
            price: 24.95,
            compareAtPrice: 34.95,
            image: "/placeholder-afc3k.png",
            imageAlt: "Herb Grinder",
            variantId: "variant-acc-1",
            availableForSale: true,
            vendor: "GrinderPro",
            tags: ["grinder", "4-piece", "premium"]
          },
          {
            id: "acc-2",
            title: "Rolling Papers Variety Pack",
            handle: "rolling-papers-variety",
            description: "Premium papers in different sizes",
            price: 12.99,
            compareAtPrice: null,
            image: "/placeholder-afc3k.png",
            imageAlt: "Rolling Papers",
            variantId: "variant-acc-2",
            availableForSale: true,
            vendor: "PaperCraft",
            tags: ["papers", "variety", "premium"]
          }
        ]
      }
    ]
  }
}

export async function getProduct(handle: string) {
  const PRODUCT_QUERY = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
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
        availableForSale
        tags
        vendor
        productType
      }
    }
  `

  try {
    const data: any = await client.request(PRODUCT_QUERY, { handle })

    if (data.product) {
      return {
        ...data.product,
        images: data.product.images.edges.map((edge: any) => edge.node),
        variants: data.product.variants.edges.map((edge: any) => edge.node),
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getCollection(handle: string) {
  try {
    const data: any = await client.request(COLLECTION_PRODUCTS_QUERY, { handle, first: 50 })

    if (data.collection) {
      return {
        ...data.collection,
        products: data.collection.products.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          handle: edge.node.handle,
          description: edge.node.description,
          price: edge.node.priceRange.minVariantPrice.amount ? parseFloat(edge.node.priceRange.minVariantPrice.amount) : 0,
          compareAtPrice: edge.node.compareAtPriceRange?.minVariantPrice?.amount ? parseFloat(edge.node.compareAtPriceRange.minVariantPrice.amount) : null,
          image: edge.node.images.edges[0]?.node.url || null,
          imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
          variantId: edge.node.variants.edges[0]?.node.id || '',
          availableForSale: edge.node.availableForSale,
          vendor: edge.node.vendor || '',
          tags: edge.node.tags || []
        })),
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching collection:", error)
    return null
  }
}
