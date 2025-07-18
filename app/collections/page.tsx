import type { Metadata } from "next"
import { CollectionGrid } from "@/components/collection-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Collections | Premium Cannabis Seeds & Growing Supplies",
  description:
    "Explore our curated collections of premium cannabis seeds, growing equipment, and cultivation accessories. Everything you need for successful cannabis cultivation.",
}

const collections = [
  {
    id: "feminized-seeds",
    title: "Feminized Seeds",
    description: "Premium feminized cannabis seeds with guaranteed female plants for maximum yield",
    image: "/images/cbd-category.png",
    productCount: 45,
    href: "/collections/feminized-seeds",
    featured: true,
  },
  {
    id: "autoflower-seeds",
    title: "Autoflower Seeds",
    description: "Easy-to-grow autoflowering strains perfect for beginners and quick harvests",
    image: "/images/glass-category.png",
    productCount: 32,
    href: "/collections/autoflower-seeds",
    featured: true,
  },
  {
    id: "growing-equipment",
    title: "Growing Equipment",
    description: "Professional cultivation tools and equipment for indoor and outdoor growing",
    image: "/images/accessories-category.png",
    productCount: 78,
    href: "/collections/growing-equipment",
    featured: true,
  },
  {
    id: "nutrients",
    title: "Nutrients & Fertilizers",
    description: "Premium plant nutrients and organic fertilizers for healthy cannabis growth",
    image: "/placeholder.svg?height=400&width=400",
    productCount: 24,
    href: "/collections/nutrients",
    featured: false,
  },
  {
    id: "grow-lights",
    title: "Grow Lights",
    description: "LED and HPS lighting systems for optimal cannabis cultivation indoors",
    image: "/placeholder.svg?height=400&width=400",
    productCount: 18,
    href: "/collections/grow-lights",
    featured: false,
  },
  {
    id: "grow-tents",
    title: "Grow Tents",
    description: "Complete grow tent setups for controlled indoor cannabis cultivation",
    image: "/placeholder.svg?height=400&width=400",
    productCount: 12,
    href: "/collections/grow-tents",
    featured: false,
  },
  {
    id: "hydroponic-systems",
    title: "Hydroponic Systems",
    description: "Advanced hydroponic setups for soil-less cannabis cultivation",
    image: "/placeholder.svg?height=400&width=400",
    productCount: 15,
    href: "/collections/hydroponic-systems",
    featured: false,
  },
  {
    id: "cultivation-accessories",
    title: "Cultivation Accessories",
    description: "Essential tools and accessories for successful cannabis growing",
    image: "/placeholder.svg?height=400&width=400",
    productCount: 56,
    href: "/collections/cultivation-accessories",
    featured: false,
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
          ]}
        />

        <div className="py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-medium text-brand-dark mb-4">Cannabis Growing Collections</h1>
            <p className="text-lg text-brand-dark/70 font-light max-w-3xl mx-auto">
              Discover our carefully curated collections of premium cannabis seeds, professional growing equipment, and
              cultivation supplies. Everything you need to grow exceptional cannabis from seed to harvest.
            </p>
          </div>

          <CollectionGrid collections={collections} />
        </div>
      </div>
    </div>
  )
}
