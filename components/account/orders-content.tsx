"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Download, RotateCcw } from "lucide-react"
import Image from "next/image"

const orders = [
  {
    id: "ORD-001234",
    date: "2024-01-15",
    status: "delivered",
    total: 89.99,
    items: [
      {
        id: "1",
        name: "White Widow Feminized Seeds",
        image: "/placeholder.svg?height=80&width=80",
        price: 59.99,
        quantity: 1,
      },
      {
        id: "2",
        name: "LED Grow Light 300W",
        image: "/placeholder.svg?height=80&width=80",
        price: 30.0,
        quantity: 1,
      },
    ],
    tracking: "DHL123456789",
  },
  {
    id: "ORD-001235",
    date: "2024-01-20",
    status: "shipped",
    total: 156.5,
    items: [
      {
        id: "3",
        name: "Complete Grow Kit",
        image: "/placeholder.svg?height=80&width=80",
        price: 156.5,
        quantity: 1,
      },
    ],
    tracking: "UPS987654321",
  },
  {
    id: "ORD-001236",
    date: "2024-01-25",
    status: "processing",
    total: 45.99,
    items: [
      {
        id: "4",
        name: "Organic Nutrients Set",
        image: "/placeholder.svg?height=80&width=80",
        price: 45.99,
        quantity: 1,
      },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "processing":
      return <Package className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-50 text-green-700 border-green-200"
    case "shipped":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "processing":
      return "bg-yellow-50 text-yellow-700 border-yellow-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export function OrdersContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order History</h2>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-sm text-gray-600">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </Badge>
                  <p className="text-lg font-semibold mt-1">€{order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.tracking && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Tracking Number</p>
                  <p className="text-blue-700">{order.tracking}</p>
                </div>
              )}

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
