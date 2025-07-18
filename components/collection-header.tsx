import Image from "next/image"

interface Collection {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  image: {
    url: string
    altText: string
  } | null
}

interface CollectionHeaderProps {
  collection: Collection
}

export function CollectionHeader({ collection }: CollectionHeaderProps) {
  return (
    <div className="relative mb-8 md:mb-12">
      {/* Background Image */}
      {collection.image && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={collection.image.url || "/placeholder.svg"}
            alt={collection.image.altText}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/50 to-primary/30" />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 ${collection.image ? "text-white" : "text-brand-dark"} p-8 md:p-12 rounded-2xl ${!collection.image ? "bg-gradient-to-br from-white to-brand-light/50 border border-brand-dark/10" : ""}`}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight">{collection.title}</h1>

          {collection.description && (
            <p
              className={`text-lg md:text-xl font-light leading-relaxed ${collection.image ? "text-white/90" : "text-brand-dark/70"}`}
            >
              {collection.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
