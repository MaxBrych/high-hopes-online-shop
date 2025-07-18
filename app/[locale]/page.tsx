import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { CategoryNav } from "@/components/category-nav"
import { HeroBanners } from "@/components/hero-banners"
import { DealsSection } from "@/components/deals-section"
import { CollectionsShowcase } from "@/components/collections-showcase"
import { CollectionLanes } from "@/components/collection-lanes"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { getProducts, getCollections, getAllCollectionsWithProducts } from "@/lib/shopify-server"
import { Suspense } from "react"

// Force dynamic rendering for this page since it fetches data
export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Fetch collections from Shopify (with fallback data)
  const [collections, collectionsWithProducts] = await Promise.all([
    getCollections(8).catch(() => []),
    getAllCollectionsWithProducts(6, 12).catch(() => []), // Get up to 6 collections with 12 products each
  ])

  return (
    <div className="min-h-screen bg-brand-light">
      <PromoBar />
      <Header />
      <HeroBanners />
      <Suspense fallback={<div className="h-20 flex items-center justify-center">Loading categories...</div>}>
        <CategoryNav collections={collections} />
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
