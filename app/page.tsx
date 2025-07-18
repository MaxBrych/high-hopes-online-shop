import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { CategoryNav } from "@/components/category-nav"
import { HeroBanners } from "@/components/hero-banners"
import { DealsSection } from "@/components/deals-section"
import { ProductGrid } from "@/components/product-grid"
import { CollectionsShowcase } from "@/components/collections-showcase"
import { CollectionLanes } from "@/components/collection-lanes"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { getProducts, getCollections, getCollectionsWithProducts } from "@/lib/shopify-server"
import { Suspense } from "react"

// Force dynamic rendering for this page since it fetches data
export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Fetch products and collections from Shopify (with fallback data)
  const [products, collections, collectionsWithProducts] = await Promise.all([
    getProducts(20).catch(() => []),
    getCollections(8).catch(() => []),
    getCollectionsWithProducts(["cbd", "accessories", "glass"], 10).catch(() => []),
  ])

  return (
    <div className="min-h-screen bg-brand-light">
      <PromoBar />
      <Header />
      <HeroBanners />
      <Suspense fallback={<div className="h-20 flex items-center justify-center">Loading categories...</div>}>
        <CategoryNav collections={collections} />
      </Suspense>
      <Suspense fallback={<div className="h-60 flex items-center justify-center">Loading products...</div>}>
        <ProductGrid products={products} />
      </Suspense>
      <CollectionLanes collections={collectionsWithProducts} />
      <AboutSection />
      <CollectionsShowcase collections={collections} />
      <TestimonialsSection />
      <DealsSection />
      <SubscriptionPlans />
      <Newsletter />
      <Footer />
    </div>
  )
}
