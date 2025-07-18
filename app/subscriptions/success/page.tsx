import { Suspense } from "react"
import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Abonnement erfolgreich!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Vielen Dank für Ihr Vertrauen! Ihr CBD Box Abonnement wurde erfolgreich eingerichtet.
          </p>

          {/* What's Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Was passiert als nächstes?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-green-600 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold">Bestätigungs-E-Mail</h3>
                    <p className="text-gray-600 text-sm">
                      Sie erhalten in wenigen Minuten eine Bestätigung mit allen Details zu Ihrem Abonnement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-green-600 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold">Erste Lieferung</h3>
                    <p className="text-gray-600 text-sm">
                      Ihre erste CBD Box wird innerhalb der nächsten 3-5 Werktage versandt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold">Monatliche Lieferungen</h3>
                    <p className="text-gray-600 text-sm">
                      Danach erhalten Sie jeden Monat am gleichen Tag Ihre kuratierte CBD Box.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Benefits */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Ihre Abonnement-Vorteile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Kostenloser Versand</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Exklusive Produkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Jederzeit kündbar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Flexible Pausierung</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/">
                <ArrowRight className="mr-2 h-4 w-4" />
                Weiter einkaufen
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account">Mein Konto verwalten</Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Haben Sie Fragen zu Ihrem Abonnement?{" "}
              <Link href="/kontakt" className="text-green-600 hover:underline">
                Kontaktieren Sie unseren Kundenservice
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
