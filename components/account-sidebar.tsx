"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Sprout,
  Calendar,
  BookOpen,
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Settings,
  LogOut,
} from "lucide-react"

const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/account",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Orders & Shopping",
    items: [
      {
        title: "My Orders",
        url: "/account/orders",
        icon: ShoppingBag,
      },
      {
        title: "Wishlist",
        url: "/account/wishlist",
        icon: Heart,
      },
    ],
  },
  {
    title: "Growing Journey",
    items: [
      {
        title: "Grow Journal",
        url: "/account/grow-journal",
        icon: Sprout,
      },
      {
        title: "Growing Calendar",
        url: "/account/calendar",
        icon: Calendar,
      },
      {
        title: "Growing Guides",
        url: "/account/guides",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Account Settings",
    items: [
      {
        title: "Profile",
        url: "/account/profile",
        icon: User,
      },
      {
        title: "Addresses",
        url: "/account/addresses",
        icon: MapPin,
      },
      {
        title: "Payment Methods",
        url: "/account/payment",
        icon: CreditCard,
      },
      {
        title: "Notifications",
        url: "/account/notifications",
        icon: Bell,
      },
      {
        title: "Security",
        url: "/account/security",
        icon: Shield,
      },
      {
        title: "Settings",
        url: "/account/settings",
        icon: Settings,
      },
    ],
  },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" className="border-r bg-white" collapsible="offcanvas">
      <SidebarHeader className="p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-green-100 text-green-700">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">john.doe@example.com</span>
            <span className="text-xs text-gray-500">Premium Member</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={`w-full justify-start px-3 py-2 text-sm font-normal hover:bg-gray-50 ${
                        pathname === item.url
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 bg-gray-50 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start px-3 py-2 text-sm font-normal text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-3" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
