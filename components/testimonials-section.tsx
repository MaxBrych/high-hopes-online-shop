"use client"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Berlin, Germany",
    rating: 5,
    text: "Amazing quality CBD products! The oil has really helped with my sleep and anxiety. Fast shipping and discreet packaging.",
    product: "CBD Oil 15%",
  },
  {
    id: 2,
    name: "Marcus K.",
    location: "Amsterdam, Netherlands",
    rating: 5,
    text: "Best seed bank I've found. Excellent germination rates and the customer service is top-notch. Highly recommended!",
    product: "Premium Seeds",
  },
  {
    id: 3,
    name: "Elena R.",
    location: "Barcelona, Spain",
    rating: 5,
    text: "The glass pieces are beautiful and functional. Great quality at fair prices. Will definitely order again.",
    product: "Glass Collection",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-6">What Our Customers Say</h2>
          <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their cannabis wellness needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-dark/80 font-light leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="border-t border-brand-dark/10 pt-4">
                  <div className="font-medium text-brand-dark">{testimonial.name}</div>
                  <div className="text-sm text-brand-dark/60 font-light">{testimonial.location}</div>
                  <div className="text-xs text-brand-green font-medium mt-1">
                    Verified Purchase • {testimonial.product}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
