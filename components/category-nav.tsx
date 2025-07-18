import Link from "next/link"
import { Leaf, Droplets, Glasses, Wrench } from "lucide-react"

interface Collection {
  id: string
  title: string
  handle: string
  description?: string
  image?: string
}

interface CategoryNavProps {
  collections: Collection[]
}

const categoryIcons = {
  cbd: Droplets,
  seeds: Leaf,
  glass: Glasses,
  accessories: Wrench,
}

export function CategoryNav({ collections = [] }: CategoryNavProps) {
  const defaultCategories = [
    {
      id: "cbd",
      title: "CBD Products",
      handle: "cbd",
      description: "Premium CBD oils, gummies & wellness",
      image: "/images/cbd-category.png",
    },
    {
      id: "seeds",
      title: "Cannabis Seeds",
      handle: "seeds",
      description: "Premium genetics & strains",
      image: "/images/seeds-category.png",
    },
    {
      id: "glass",
      title: "Glass & Bongs",
      handle: "glass",
      description: "High-quality glass pieces",
      image: "/images/glass-category.png",
    },
    {
      id: "accessories",
      title: "Accessories",
      handle: "accessories",
      description: "Grinders, papers & tools",
      image: "/images/accessories-category.png",
    },
  ]

  const categoriesToShow = collections.length > 0 ? collections.slice(0, 4) : defaultCategories

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-brand-dark mb-4">Shop by Category</h2>
          <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
            Discover our carefully curated selection of premium cannabis products and accessories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categoriesToShow.map((category) => {
            const IconComponent = categoryIcons[category.handle as keyof typeof categoryIcons] || Leaf
            return (
              <Link
                key={category.id}
                href={`/collections/${category.handle}`}
                className="group bg-brand-light/50 rounded-2xl p-6 hover:bg-brand-light transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
                  </div>
                  <h3 className="font-medium text-brand-dark mb-2 text-sm md:text-base">{category.title}</h3>
                  <p className="text-xs md:text-sm text-brand-dark/70 font-light">
                    {category.description || "Premium quality products"}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
