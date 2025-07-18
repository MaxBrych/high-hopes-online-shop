import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Search } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>

            <Link href="/collections/all">
              <Button variant="outline" className="w-full">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
