import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { CollectionHeader } from "@/components/collection-header"
import { ProductFilters } from "@/components/product-filters"
import { ProductGridCollection } from "@/components/product-grid-collection"
import { getProducts } from "@/lib/shopify-server"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default async function AllCollectionsPage() {
  // Fetch all products with proper error handling - increased to 100 for "all" page
  let products = []
  try {
    products = await getProducts(100)
  } catch (error) {
    console.error("Error fetching products:", error)
    products = []
  }

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : []

  // Create a collection object for the header
  const allProductsCollection = {
    id: "all",
    title: "All Products",
    handle: "all",
    description: "Complete selection of premium cannabis products, growing equipment, and cultivation supplies",
    descriptionHtml: "<p>Complete selection of premium cannabis products, growing equipment, and cultivation supplies</p>",
    image: null
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <PromoBar />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <CollectionHeader collection={allProductsCollection} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Suspense fallback={<div className="h-96 bg-white rounded-lg animate-pulse" />}>
              <ProductFilters products={safeProducts} />
            </Suspense>
          </aside>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg h-80 animate-pulse" />
                  ))}
                </div>
              }
            >
              <ProductGridCollection 
                products={safeProducts} 
                totalProducts={safeProducts.length}
                hasNextPage={false}
              />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
