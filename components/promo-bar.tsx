"use client"

import { useState, useEffect } from "react"
import { X, Truck, Leaf, Award } from "lucide-react"

const promos = [
  {
    icon: Truck,
    text: "Free shipping on growing supplies over €50 • Expert cultivation support included",
  },
  {
    icon: Leaf,
    text: "New genetics weekly • Premium strains from top breeders • 98% germination guarantee",
  },
  {
    icon: Award,
    text: "Join 25,000+ successful growers • Expert guides & community support • Proven results",
  },
]

export function PromoBar() {
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  const PromoIcon = promos[currentPromo].icon
  const PromoText = promos[currentPromo].text

  return (
    <div className="bg-primary text-white py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-center">
          <PromoIcon className="w-4 h-4 flex-shrink-0" />
          <span className="animate-fade-in">{PromoText}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
