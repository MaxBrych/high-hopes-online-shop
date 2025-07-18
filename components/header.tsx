"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart-drawer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Search, Menu, User, Heart, Phone, Mail, MapPin, Clock, X } from "lucide-react"

const navigation = [
  { name: "Seeds & Genetics", href: "/collections/seeds" },
  { name: "Growing Equipment", href: "/collections/equipment" },
  { name: "Nutrients & Soil", href: "/collections/nutrients" },
  { name: "Accessories", href: "/collections/accessories" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Growing Guides", href: "/guides" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+31 20 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@growhigh.nl</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Mon-Fri 9AM-6PM CET</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-xs">Free shipping €39+ | EU Wide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder-logo.png" alt="GrowHigh" width={40} height={40} className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">GrowHigh</span>
              <span className="text-xs text-gray-500 -mt-1">Trusted Growing Partner</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search seeds, equipment, nutrients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary/90"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Search className="w-5 h-5" />
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="sm" className="p-2 hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Wishlist */}
            <Link href="/account/wishlist">
              <Button variant="ghost" size="sm" className="p-2 relative hidden sm:flex">
                <Heart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </Link>

            {/* Cart */}
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)} className="p-2">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-12 py-2"
                    />
                    <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 p-0">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </form>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4 space-y-4">
                    <Link
                      href="/account"
                      className="flex items-center py-2 text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Account
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="flex items-center py-2 text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4 mr-3" />
                      Wishlist
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-4 border-t border-gray-100">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
