import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Prevent static generation for this page
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "CBD Monatsbox Abonnement | High Hopes",
  description:
    "Abonniere unsere monatliche CBD Box mit Premium-Produkten und spare bis zu 13%. Jetzt mit flexiblen Laufzeiten verfügbar.",
}

export default function SubscriptionsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const breadcrumbs = [
    { label: "Startseite", href: locale === 'de' ? "/" : "/en" },
    { label: "Abonnements", href: locale === 'de' ? "/subscriptions" : "/en/subscriptions" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="space-y-16">
          <SubscriptionPlans />
        </div>
      </div>

      <Footer />
    </div>
  )
}
