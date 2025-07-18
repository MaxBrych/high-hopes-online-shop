"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Award, Users, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "10K+",
    label: "Happy Customers",
  },
  {
    icon: Award,
    number: "5+",
    label: "Years Experience",
  },
  {
    icon: Leaf,
    number: "500+",
    label: "Premium Products",
  },
  {
    icon: Globe,
    number: "25+",
    label: "Countries Served",
  },
]

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-6 leading-tight">
                Your Trusted Partner in
                <br />
                <span className="text-brand-green">Cannabis Wellness</span>
              </h2>
              <p className="text-brand-dark/70 font-light leading-relaxed mb-6">
                We're passionate about providing premium cannabis products that enhance your wellness journey. Our
                carefully curated selection includes the finest CBD products, premium seeds, and high-quality
                accessories.
              </p>
              <p className="text-brand-dark/70 font-light leading-relaxed mb-8">
                Every product is lab-tested for quality and potency, ensuring you receive only the best. We believe in
                transparency, education, and supporting our community's wellness goals.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div className="text-2xl font-medium text-brand-dark mb-1">{stat.number}</div>
                  <div className="text-sm text-brand-dark/70 font-light">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green-dark text-white">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-dark/20 text-brand-dark bg-transparent"
              >
                <Link href="/collections/all">Shop Products</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-brand-light/50">
              <Image
                src="/images/natural-growing.png"
                alt="Natural cannabis growing environment"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-green/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
