"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = "BH-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Bestellung erfolgreich!</h1>

            <p className="text-gray-600 mb-6">
              Vielen Dank für Ihre Bestellung. Wir haben Ihre Bestellbestätigung an Ihre E-Mail-Adresse gesendet.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Bestellnummer:</span>
                <span className="font-mono font-medium">{orderNumber}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-green-600" />
                Bestellbestätigung per E-Mail versendet
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Package className="w-4 h-4 mr-3 text-green-600" />
                Versand in 1-2 Werktagen
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/">
                  Weiter Einkaufen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/account/orders">Bestellungen Anzeigen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
