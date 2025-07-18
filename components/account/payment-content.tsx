"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Plus, Edit, Trash2, Shield } from "lucide-react"

const mockPaymentMethods = [
  {
    id: 1,
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    name: "John Doe",
  },
  {
    id: 2,
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
    name: "John Doe",
  },
]

const getBrandColor = (brand: string) => {
  switch (brand) {
    case "visa":
      return "bg-blue-100 text-blue-800"
    case "mastercard":
      return "bg-red-100 text-red-800"
    case "amex":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function PaymentContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-2">Payment Methods</h2>
          <p className="text-brand-dark/70">Manage your saved payment methods</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Secure Payment Processing</h3>
              <p className="text-sm text-blue-800">
                All payment information is encrypted and securely processed. We never store your full card details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPaymentMethods.map((method) => (
          <Card key={method.id} className="border border-brand-dark/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} Card
                </CardTitle>
                <div className="flex items-center gap-2">
                  {method.isDefault && <Badge className="bg-primary/10 text-primary">Default</Badge>}
                  <Badge className={getBrandColor(method.brand)}>{method.brand.toUpperCase()}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark/60">Card Number</span>
                  <span className="font-mono">•••• •••• •••• {method.last4}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark/60">Cardholder</span>
                  <span>{method.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-dark/60">Expires</span>
                  <span>
                    {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                {!method.isDefault && (
                  <Button size="sm" className="flex-1">
                    Set Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockPaymentMethods.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">No payment methods</h3>
          <p className="text-brand-dark/60 mb-4">Add a payment method for faster checkout</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  )
}
