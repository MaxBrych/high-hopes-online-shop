import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata = {
  title: "CBD Monatsbox Abonnement | High Hopes",
  description:
    "Abonniere unsere monatliche CBD Box mit Premium-Produkten und spare bis zu 13%. Jetzt mit flexiblen Laufzeiten verfügbar.",
}

export default function SubscriptionsPage() {
  const breadcrumbs = [
    { label: "Startseite", href: "/" },
    { label: "Abonnements", href: "/subscriptions" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">CBD Monatsbox Abonnement</h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Erhalte jeden Monat eine kuratierte Auswahl unserer besten CBD-Produkte und Zubehör direkt zu dir nach
            Hause. Spare mit längeren Laufzeiten und genieße exklusive Vorteile für Abonnenten.
          </p>

          <SubscriptionPlans />
        </div>
      </div>

      <Footer />
    </div>
  )
}
