import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NotificationsContent } from "@/components/account/notifications-content"

export const metadata = {
  title: "Notifications | buyhigh",
  description: "Manage your notification preferences",
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <PromoBar />
      <Header />

      <SidebarProvider>
        <div className="flex h-[calc(100vh-140px)]">
          <AccountSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-lg font-semibold">Notifications</h1>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-6 bg-brand-light overflow-auto">
              <NotificationsContent />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </div>
  )
}
