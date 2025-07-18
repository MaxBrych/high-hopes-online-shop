"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ShoppingCart, Package, Shield, Truck, Gift, Users, Star, Leaf, Calendar } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { SubscriptionModal } from "@/components/subscription-modal"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  intervalCount: number
  originalPrice: number
  savings: number
  savingsPercentage: number
  features: string[]
  popular: boolean
  billingAmount: number
}

const plans: Plan[] = [
  {
    id: "price_monthly",
    name: "Monthly",
    price: 34.99,
    interval: "month",
    intervalCount: 1,
    originalPrice: 34.99,
    savings: 0,
    savingsPercentage: 0,
    billingAmount: 34.99,
    features: ["Premium monthly box", "Free shipping", "Cancel anytime"],
    popular: false,
  },
  {
    id: "price_quarterly",
    name: "3 Months",
    price: 31.99,
    interval: "month",
    intervalCount: 3,
    originalPrice: 34.99,
    savings: 9,
    savingsPercentage: 9,
    billingAmount: 95.97,
    features: ["Save 9% vs monthly", "Premium monthly box", "Free shipping", "Priority support"],
    popular: true,
  },
  {
    id: "price_annual",
    name: "12 Months",
    price: 28.99,
    interval: "month",
    intervalCount: 12,
    originalPrice: 34.99,
    savings: 72,
    savingsPercentage: 17,
    billingAmount: 347.88,
    features: ["Save 17% vs monthly", "Premium monthly box", "Free shipping", "Exclusive products", "Birthday surprise"],
    popular: false,
  },
]

const premiumBox = {
  id: "premium_growing_box",
  name: "Premium Growing Box",
  description: "Everything you need for successful cannabis cultivation - from premium genetics to professional equipment and expert guidance",
  image: "/images/subscription/cbd-premium-box.png",
  value: "€60-80",
  items: "6-8 premium items"
}

const benefits = [
  {
    icon: Package,
    title: "Curated Premium Products",
    description: "Hand-selected items worth €60-80 for just €34.99. Each box contains 6-8 premium growing essentials."
  },
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "Fast, discreet delivery straight to your door. No shipping costs, ever."
  },
  {
    icon: Gift,
    title: "Exclusive Access",
    description: "Get first access to new genetics, limited edition products, and subscriber-only items."
  },
  {
    icon: Leaf,
    title: "Expert Curation",
    description: "Every product is tested and approved by our growing experts to ensure premium quality."
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join 10,000+ growers in our private community with tips, guides, and support."
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Not satisfied? We'll make it right with our 100% satisfaction guarantee."
  }
]

const whatYouGet = [
  "Premium cannabis genetics & seeds",
  "Professional growing equipment",
  "Nutrient samples & boosters", 
  "Growing guides & tutorials",
  "Exclusive strain information",
  "Monthly growing tips"
]

const faqItems = [
  {
    question: "What's included in each monthly box?",
    answer: "Each Premium Growing Box contains 6-8 carefully curated items worth €60-80, including premium genetics, growing equipment, nutrients, tools, and exclusive products. Every box is different to keep your growing journey exciting and educational."
  },
  {
    question: "When will I be charged and receive my box?",
    answer: "You'll be charged immediately upon signup, and your first box ships within 2-3 business days. Subsequent boxes ship around the same date each month. You'll receive tracking information via email."
  },
  {
    question: "Can I pause or cancel my subscription?",
    answer: "Absolutely! You can pause or cancel your subscription anytime from your account dashboard or by contacting our support team. No cancellation fees or hidden charges."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we ship to all EU countries with free express shipping. We're working on expanding to more regions. Check our shipping page for the most up-to-date information."
  },
  {
    question: "What if I don't like something in my box?",
    answer: "We stand behind our curation with a 100% satisfaction guarantee. If you're not happy with any item, contact us within 30 days and we'll make it right with a replacement or credit."
  },
  {
    question: "Are the genetics legal?",
    answer: "All products in our boxes comply with EU regulations. We only include legal genetics and growing supplies. Always check your local laws before germinating any seeds."
  }
]

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(plans[1]) // Default to quarterly
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async (plan: Plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleOneTimePurchase = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boxId: premiumBox.id,
          mode: "payment",
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error("Error redirecting to checkout:", error)
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light/30 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-brand-green/10 text-brand-green border-brand-green/20">
            <Leaf className="w-4 h-4 mr-2" />
            Premium Subscription
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium text-brand-dark mb-6">
            Get Everything You Need to <span className="text-brand-green">Grow Successfully</span>
          </h2>
          <p className="text-xl text-brand-dark/70 max-w-3xl mx-auto font-light">
            Join 10,000+ growers getting premium genetics, professional equipment, and expert guidance delivered monthly
          </p>
        </div>

        {/* Premium Box Showcase */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-white">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-square lg:aspect-auto">
                  <Image
                    src={premiumBox.image}
                    alt={premiumBox.name}
                    fill
                    className="object-cover rounded-l-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-green text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-medium text-brand-dark mb-4">
                    {premiumBox.name}
                  </h3>
                  <p className="text-brand-dark/70 font-light leading-relaxed mb-6">
                    {premiumBox.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-brand-light/50 rounded-lg">
                      <div className="font-medium text-brand-dark">{premiumBox.value}</div>
                      <div className="text-sm text-brand-dark/60">Box Value</div>
                    </div>
                    <div className="text-center p-4 bg-brand-light/50 rounded-lg">
                      <div className="font-medium text-brand-dark">{premiumBox.items}</div>
                      <div className="text-sm text-brand-dark/60">Premium Items</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-brand-dark mb-3">What's Inside:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {whatYouGet.map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                          <span className="text-brand-dark/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
      </div>

      {/* Subscription Plans */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-medium text-brand-dark mb-4">Choose Your Plan</h3>
            <p className="text-brand-dark/70 font-light">Save more with longer commitments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative cursor-pointer transition-all hover:shadow-lg ${
                  plan.popular ? "border-brand-green shadow-lg scale-105" : "border-brand-dark/10"
                } ${selectedPlan?.id === plan.id ? "ring-2 ring-brand-green" : ""}`}
                onClick={() => setSelectedPlan(plan)}
              >
              {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-green text-white">
                  Most Popular
                </Badge>
              )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-brand-dark">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-brand-dark">€{plan.price}</span>
                      <span className="text-brand-dark/60 ml-1">/month</span>
                </div>
                {plan.savingsPercentage > 0 && (
                      <div className="text-sm text-brand-green font-medium">
                        Save €{plan.savings} ({plan.savingsPercentage}%)
                      </div>
                    )}
                    {plan.intervalCount > 1 && (
                      <div className="text-xs text-brand-dark/60">
                        Billed €{plan.billingAmount} every {plan.intervalCount} months
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-brand-dark/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                  <Button 
                    className={`w-full font-normal ${
                      plan.popular 
                        ? "bg-brand-green hover:bg-brand-green-dark text-white" 
                        : "bg-brand-dark hover:bg-brand-dark/90 text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubscribe(plan)
                    }}
                  >
                    {selectedPlan?.id === plan.id ? "Selected Plan" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* One-time purchase option */}
          <div className="mt-8 max-w-2xl mx-auto">
            <Card className="border-brand-dark/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
                    <h4 className="font-medium text-brand-dark mb-2">Try Before You Subscribe</h4>
                    <p className="text-brand-dark/70 text-sm">
                      Want to experience our Premium Growing Box first? Order a single box without commitment.
            </p>
          </div>
          <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-dark">€49.99</div>
                      <div className="text-xs text-brand-dark/60">One-time</div>
                    </div>
            <Button
              variant="outline"
                      className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              onClick={handleOneTimePurchase}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                          <span className="animate-spin h-4 w-4 mr-2 border-2 border-brand-green border-t-transparent rounded-full"></span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                          Try Once
                </span>
              )}
            </Button>
          </div>
        </div>
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-medium text-brand-dark mb-4">Why Subscribe?</h3>
            <p className="text-brand-dark/70 font-light max-w-2xl mx-auto">
              Join thousands of successful growers who trust our curated selection and expert guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <h4 className="font-medium text-brand-dark mb-3">{benefit.title}</h4>
                  <p className="text-brand-dark/70 text-sm font-light leading-relaxed">{benefit.description}</p>
            </CardContent>
          </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-medium text-brand-dark mb-4">Frequently Asked Questions</h3>
            <p className="text-brand-dark/70 font-light">
              Everything you need to know about our Premium Growing Box subscription
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-brand-dark/10 rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium text-brand-dark hover:text-brand-green py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-dark/70 font-light leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
          selectedBox={premiumBox}
      />
    </div>
    </section>
  )
}
