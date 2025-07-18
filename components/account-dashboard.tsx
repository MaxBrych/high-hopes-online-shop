"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Edit,
  Save,
  X,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock user data
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+49 123 456 789",
  dateJoined: "2023-01-15",
  totalOrders: 12,
  totalSpent: 456.78,
}

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 89.99,
    items: [
      {
        id: "1",
        title: "Premium CBD Oil 10ml",
        image: "/placeholder-1gyhc.png",
        quantity: 2,
        price: 29.99,
      },
      {
        id: "2",
        title: "Herb Grinder - 4 Piece",
        image: "/placeholder-afc3k.png",
        quantity: 1,
        price: 29.99,
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 45.99,
    items: [
      {
        id: "3",
        title: "Rolling Papers - King Size",
        image: "/placeholder-7m2op.png",
        quantity: 3,
        price: 15.33,
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 129.99,
    items: [
      {
        id: "4",
        title: "Glass Water Pipe",
        image: "/glass-bong-water-pipe.png",
        quantity: 1,
        price: 129.99,
      },
    ],
  },
]

// Mock wishlist data
const mockWishlist = [
  {
    id: "1",
    title: "Premium CBD Oil 15ml",
    image: "/placeholder-1gyhc.png",
    price: 39.99,
    compareAtPrice: 49.99,
    availableForSale: true,
    handle: "premium-cbd-oil-15ml",
  },
  {
    id: "2",
    title: "Electric Grinder - Premium",
    image: "/placeholder-afc3k.png",
    price: 89.99,
    compareAtPrice: null,
    availableForSale: false,
    handle: "electric-grinder-premium",
  },
]

// Mock addresses data
const mockAddresses = [
  {
    id: "1",
    type: "shipping",
    firstName: "John",
    lastName: "Doe",
    company: "",
    address1: "Musterstraße 123",
    address2: "",
    city: "Berlin",
    province: "Berlin",
    zip: "10115",
    country: "Germany",
    phone: "+49 123 456 789",
    isDefault: true,
  },
  {
    id: "2",
    type: "billing",
    firstName: "John",
    lastName: "Doe",
    company: "Example GmbH",
    address1: "Geschäftsstraße 456",
    address2: "Suite 789",
    city: "Munich",
    province: "Bavaria",
    zip: "80331",
    country: "Germany",
    phone: "+49 987 654 321",
    isDefault: false,
  },
]

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editingAddress, setEditingAddress] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-primary text-white"
      case "shipped":
        return "bg-blue-500 text-white"
      case "processing":
        return "bg-amber-500 text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-brand-dark mb-2">My Account</h1>
        <p className="text-brand-dark/70 font-light">Manage your account and view your order history</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-white border border-brand-dark/10">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Wishlist</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-brand-dark/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-brand-dark">Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark">
                      {mockUser.firstName} {mockUser.lastName}
                    </p>
                    <p className="text-sm text-brand-dark/60">{mockUser.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-dark/60">Member since</span>
                    <span className="font-medium">Jan 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-dark/60">Total orders</span>
                    <span className="font-medium">{mockUser.totalOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-dark/60">Total spent</span>
                    <span className="font-medium text-primary">€{mockUser.totalSpent.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-brand-dark/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-brand-dark">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-brand-dark/60">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(order.status)} text-xs`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <p className="text-sm font-medium mt-1">€{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-primary text-primary hover:bg-primary/5 bg-transparent"
                  onClick={() => setActiveTab("orders")}
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            <Card className="border-brand-dark/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-brand-dark">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-brand-dark/20 hover:border-primary hover:text-primary bg-transparent"
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Track an Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-brand-dark/20 hover:border-primary hover:text-primary bg-transparent"
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  View Wishlist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-brand-dark/20 hover:border-primary hover:text-primary bg-transparent"
                  onClick={() => setActiveTab("addresses")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Manage Addresses
                </Button>
                <Link href="/collections/all">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card className="border-brand-dark/10">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-brand-dark">Order History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-brand-dark/10 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <div>
                        <p className="font-medium text-brand-dark">{order.id}</p>
                        <p className="text-sm text-brand-dark/60">Placed on {order.date}</p>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} text-xs`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg text-primary">€{order.total.toFixed(2)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-light rounded-lg overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-brand-dark truncate">{item.title}</p>
                          <p className="text-xs text-brand-dark/60">
                            Qty: {item.quantity} × €{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          <Card className="border-brand-dark/10">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-brand-dark">My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {mockWishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="border border-brand-dark/10 rounded-lg p-4">
                      <div className="aspect-square bg-brand-light rounded-lg overflow-hidden mb-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <h3 className="font-medium text-brand-dark mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-medium text-primary">€{item.price.toFixed(2)}</span>
                        {item.compareAtPrice && (
                          <span className="text-sm text-brand-dark/50 line-through">
                            €{item.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/products/${item.handle}`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                            disabled={!item.availableForSale}
                          >
                            {item.availableForSale ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-brand-dark/40 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-brand-dark mb-2">Your wishlist is empty</h3>
                  <p className="text-brand-dark/60 mb-6">Save items you love for later</p>
                  <Link href="/collections/all">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <Card className="border-brand-dark/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium text-brand-dark">Saved Addresses</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Add New Address
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAddresses.map((address) => (
                <div key={address.id} className="border border-brand-dark/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={address.type === "shipping" ? "default" : "secondary"} className="text-xs">
                        {address.type === "shipping" ? "Shipping" : "Billing"}
                      </Badge>
                      {address.isDefault && <Badge className="bg-primary text-white text-xs">Default</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingAddress(address.id)}
                        className="text-brand-dark hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-brand-dark space-y-1">
                    <p className="font-medium">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.company && <p>{address.company}</p>}
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.zip} {address.city}, {address.province}
                    </p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="border-brand-dark/10">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-brand-dark">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-brand-dark/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-brand-dark mb-2">No payment methods saved</h3>
                <p className="text-brand-dark/60 mb-6">Add a payment method for faster checkout</p>
                <Button className="bg-primary hover:bg-primary/90 text-white">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-brand-dark/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium text-brand-dark">Account Settings</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="border-primary text-primary hover:bg-primary/5"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={mockUser.firstName}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={mockUser.lastName}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={mockUser.email}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={mockUser.phone}
                    disabled={!isEditing}
                    className="disabled:opacity-60"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="font-medium text-brand-dark">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-brand-dark">Delete Account</h3>
                  <p className="text-sm text-brand-dark/60">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>

              <Separator />

              <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50 bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
