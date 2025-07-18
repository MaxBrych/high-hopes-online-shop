"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-brand-dark to-brand-dark/90">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {!isSubscribed ? (
            <>
              <div className="mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-2">Stay Updated</h2>
                <p className="text-sm md:text-base text-white/80 font-light">
                  Get the latest news about new products, exclusive deals, and wellness tips
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brand-green hover:bg-brand-green-dark text-white font-normal px-6 py-2.5"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-white/60 mt-4 font-light">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </>
          ) : (
            <div className="py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">Thank You!</h2>
              <p className="text-sm md:text-base text-white/80 font-light">
                You've successfully subscribed to our newsletter. Welcome to the community!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
