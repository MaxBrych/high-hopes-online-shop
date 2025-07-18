"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { loadStripe } from "@stripe/stripe-js"
import { Mail, CreditCard, Shield } from "lucide-react"

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
}

interface SubscriptionBox {
  id: string
  name: string
  description: string
  image: string
  price: number
  oneTimePrice: number
}

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  plan: Plan | null
  selectedBox: SubscriptionBox
}

export function SubscriptionModal({ isOpen, onClose, plan, selectedBox }: SubscriptionModalProps) {
  const [email, setEmail] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = async () => {
    if (!email || !acceptTerms || !plan) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.")
      return
    }

    if (!email.includes("@")) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          priceId: plan.id,
          boxId: selectedBox.id,
          interval: plan.interval,
          intervalCount: plan.intervalCount,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error.message)
        return
      }

      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
        if (error) {
          setError("Fehler beim Weiterleiten zur Zahlung. Bitte versuchen Sie es erneut.")
        }
      }
    } catch (error) {
      console.error("Error creating subscription:", error)
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Abonnement abschließen
          </DialogTitle>
          <DialogDescription>
            Schließen Sie Ihr Abonnement für die {selectedBox.name} ab und erhalten Sie jeden Monat eine kuratierte
            Auswahl an Premium CBD-Produkten.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <p className="text-gray-600">{selectedBox.name}</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">€{plan.price}</span>
              <span className="text-gray-600 ml-1">/Monat</span>
              {plan.savingsPercentage > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Spare {plan.savingsPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-Mail-Adresse *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ihre.email@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Newsletter Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={acceptNewsletter}
              onCheckedChange={(checked) => setAcceptNewsletter(checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Ich möchte den Newsletter erhalten und über neue Produkte und Angebote informiert werden.
            </Label>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              Ich akzeptiere die{" "}
              <a href="/agb" className="text-green-600 hover:underline">
                AGB
              </a>{" "}
              und{" "}
              <a href="/datenschutz" className="text-green-600 hover:underline">
                Datenschutzbestimmungen
              </a>
              . *
            </Label>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Ihre Zahlung wird sicher über Stripe verarbeitet. SSL-verschlüsselt.</span>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Abbrechen
            </Button>
            <Button
              onClick={handleSubscribe}
              disabled={isProcessing || !email || !acceptTerms}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Verarbeitung...
                </span>
              ) : (
                "Jetzt abonnieren"
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-gray-500 text-center">
            Sie können Ihr Abonnement jederzeit in Ihrem Kundenkonto kündigen oder pausieren.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
