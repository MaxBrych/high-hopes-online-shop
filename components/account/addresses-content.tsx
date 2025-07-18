"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"

const mockAddresses = [
  {
    id: 1,
    type: "shipping",
    isDefault: true,
    name: "John Doe",
    company: "",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "Amsterdam",
    state: "North Holland",
    zipCode: "1012 AB",
    country: "Netherlands",
    phone: "+31 20 123 4567",
  },
  {
    id: 2,
    type: "billing",
    isDefault: false,
    name: "John Doe",
    company: "Grow Solutions BV",
    address1: "456 Business Ave",
    address2: "Suite 200",
    city: "Rotterdam",
    state: "South Holland",
    zipCode: "3011 AD",
    country: "Netherlands",
    phone: "+31 10 987 6543",
  },
]

export function AddressesContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium text-brand-dark mb-2">Addresses</h2>
          <p className="text-brand-dark/70">Manage your shipping and billing addresses</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAddresses.map((address) => (
          <Card key={address.id} className="border border-brand-dark/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {address.type === "shipping" ? <Home className="h-5 w-5" /> : <Building className="h-5 w-5" />}
                  {address.type === "shipping" ? "Shipping Address" : "Billing Address"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {address.isDefault && <Badge className="bg-primary/10 text-primary">Default</Badge>}
                  <Badge
                    className={
                      address.type === "shipping" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-brand-dark/60 mt-0.5" />
                  <div className="text-sm text-brand-dark">
                    <p className="font-medium">{address.name}</p>
                    {address.company && <p className="text-brand-dark/60">{address.company}</p>}
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    <p className="text-brand-dark/60 mt-1">{address.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                {!address.isDefault && (
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
      {mockAddresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-brand-dark/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">No addresses yet</h3>
          <p className="text-brand-dark/60 mb-4">Add your first shipping or billing address</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      )}
    </div>
  )
}
