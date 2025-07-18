"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Leaf, Shield, Truck } from "lucide-react"
import { useTranslations } from 'next-intl'

export function HeroBanners() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations('hero')

  const banners = [
    {
      id: 1,
      title: t('premium_experience.title'),
      subtitle: t('premium_experience.subtitle'),
      description: t('premium_experience.description'),
      image: "/images/hero-banner.png",
      cta: t('premium_experience.cta'),
      ctaLink: "/collections/all",
      theme: "wellness",
    },
    {
      id: 2,
      title: t('natural_growing.title'),
      subtitle: t('natural_growing.subtitle'),
      description: t('natural_growing.description'),
      image: "/images/natural-growing.png",
      cta: t('natural_growing.cta'),
      ctaLink: "/collections/seeds",
      theme: "growing",
    },
    {
      id: 3,
      title: t('lifestyle_wellness.title'),
      subtitle: t('lifestyle_wellness.subtitle'),
      description: t('lifestyle_wellness.description'),
      image: "/images/wellness-lifestyle.png",
      cta: t('lifestyle_wellness.cta'),
      ctaLink: "/collections/accessories",
      theme: "lifestyle",
    },
  ]

  const features = [
    {
      icon: Leaf,
      title: t('features.premium_quality.title'),
      description: t('features.premium_quality.description'),
    },
    {
      icon: Shield,
      title: t('features.lab_tested.title'),
      description: t('features.lab_tested.description'),
    },
    {
      icon: Truck,
      title: t('features.discreet_shipping.title'),
      description: t('features.discreet_shipping.description'),
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-brand-light">
      {/* Banner Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-brand-dark/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <p className="text-brand-light/90 text-sm font-normal mb-2 tracking-wide uppercase">
                    {banner.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-normal text-white mb-6 leading-tight">{banner.title}</h1>
                  <p className="text-brand-light/90 text-lg mb-8 font-light leading-relaxed">{banner.description}</p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-normal px-8 py-3 rounded-full"
                  >
                    <Link href={banner.ctaLink}>{banner.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-brand-dark/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center md:justify-between items-center">
            <div className="hidden md:flex items-center space-x-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark text-sm">{feature.title}</p>
                    <p className="text-brand-dark/70 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:hidden grid grid-cols-3 gap-4 w-full">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <feature.icon className="w-4 h-4 text-brand-green" />
                  </div>
                  <p className="font-medium text-brand-dark text-xs">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
