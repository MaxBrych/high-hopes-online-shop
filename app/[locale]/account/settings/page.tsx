import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SettingsContent } from "@/components/account/settings-content"

export const metadata = {
  title: "Settings | buyhigh",
  description: "General account settings and preferences",
}

export default function SettingsPage() {
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
              <h1 className="text-lg font-semibold">Settings</h1>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-6 bg-brand-light overflow-auto">
              <SettingsContent />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </div>
  )
}
