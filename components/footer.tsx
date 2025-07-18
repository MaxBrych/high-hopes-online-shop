"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Shield, Truck, Award, Users } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: "Cannabis Seeds", href: "/collections/seeds" },
    { name: "Growing Equipment", href: "/collections/equipment" },
    { name: "Nutrients & Soil", href: "/collections/nutrients" },
    { name: "Smoking Accessories", href: "/collections/accessories" },
    { name: "Subscription Boxes", href: "/subscriptions" },
    { name: "All Products", href: "/collections/all" }
  ],
  support: [
    { name: "Growing Guides", href: "/guides" },
    { name: "Strain Information", href: "/strains" },
    { name: "Germination Guide", href: "/guides/germination" },
    { name: "Troubleshooting", href: "/support/troubleshooting" },
    { name: "Contact Support", href: "/support" },
    { name: "FAQ", href: "/faq" }
  ],
  company: [
    { name: "About GrowHigh", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Grower Community", href: "/community" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Return Policy", href: "/returns" },
    { name: "Age Verification", href: "/age-verification" },
    { name: "Legal Notice", href: "/legal" }
  ]
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/growhigh" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/growhigh" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/growhigh" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/growhigh" }
]

const trustBadges = [
  { icon: Shield, text: "Secure Checkout" },
  { icon: Truck, text: "Discreet Shipping" },
  { icon: Award, text: "Premium Quality" },
  { icon: Users, text: "Expert Support" }
]

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">GrowHigh</div>
                <div className="text-sm text-white/70">Your Growing Partner</div>
              </div>
            </div>
            
            <p className="text-white/80 leading-relaxed max-w-md">
              Your trusted partner in cannabis growing. Premium genetics, professional equipment, and expert support for cultivation success since 2016.
            </p>

            <div className="space-y-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                Premium genetics • Expert support • Grower tested
              </Badge>
              <div className="text-sm text-white/60">
                Serving 25,000+ successful growers worldwide
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@growhigh.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+49 (0) 30 12345678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Berlin, Germany</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8 lg:col-span-3">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Growing Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.slice(0, 3).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-white/60 text-center md:text-left">
              © 2024 GrowHigh. All rights reserved. • Premium genetics for successful cultivation.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
