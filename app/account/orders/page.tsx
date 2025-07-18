import { AccountSidebar } from "@/components/account-sidebar"
import { OrdersContent } from "@/components/account/orders-content"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AccountSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">My Orders</h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            <OrdersContent />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
