import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, Sprout, TrendingUp, Package, Clock } from "lucide-react"

export const metadata = {
  title: "My Account | GrowHigh",
  description: "Manage your account, orders, and growing journey",
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <SidebarProvider>
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
            <AccountSidebar />
            <SidebarInset className="flex-1">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
                <SidebarTrigger className="-ml-1 md:hidden" />
                <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
                <h1 className="text-lg font-semibold">Account Dashboard</h1>
              </header>
              <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                  <p className="text-gray-600">Manage your growing journey</p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <p className="text-xs text-gray-600">Lifetime purchases</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">€456</div>
                      <p className="text-xs text-gray-600">On growing supplies</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                      <Heart className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <p className="text-xs text-gray-600">Seeds & equipment</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Order #1234 shipped</p>
                          <p className="text-sm text-gray-600">2 days ago</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Shipped
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Added White Widow seeds to wishlist</p>
                          <p className="text-sm text-gray-600">5 days ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Sprout className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Started new grow journal entry</p>
                          <p className="text-sm text-gray-600">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>

      <Footer />
    </div>
  )
}
