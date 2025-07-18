"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, Save } from "lucide-react"

const notificationSettings = [
  {
    category: "Order Updates",
    icon: Bell,
    settings: [
      {
        id: "order-confirmation",
        title: "Order Confirmation",
        description: "Get notified when your order is confirmed",
        email: true,
        sms: false,
      },
      {
        id: "shipping-updates",
        title: "Shipping Updates",
        description: "Track your package with shipping notifications",
        email: true,
        sms: true,
      },
      {
        id: "delivery-confirmation",
        title: "Delivery Confirmation",
        description: "Know when your order has been delivered",
        email: true,
        sms: false,
      },
    ],
  },
  {
    category: "Growing Journey",
    icon: MessageSquare,
    settings: [
      {
        id: "grow-reminders",
        title: "Grow Reminders",
        description: "Reminders for watering, feeding, and other grow tasks",
        email: true,
        sms: false,
      },
      {
        id: "harvest-alerts",
        title: "Harvest Alerts",
        description: "Get notified when it's time to harvest",
        email: true,
        sms: true,
      },
      {
        id: "grow-tips",
        title: "Growing Tips",
        description: "Weekly tips and advice for better grows",
        email: false,
        sms: false,
      },
    ],
  },
  {
    category: "Marketing",
    icon: Mail,
    settings: [
      {
        id: "promotions",
        title: "Promotions & Deals",
        description: "Special offers and discounts on seeds and equipment",
        email: true,
        sms: false,
      },
      {
        id: "new-products",
        title: "New Products",
        description: "Be the first to know about new strains and equipment",
        email: false,
        sms: false,
      },
      {
        id: "newsletter",
        title: "Newsletter",
        description: "Monthly newsletter with growing guides and updates",
        email: true,
        sms: false,
      },
    ],
  },
]

export function NotificationsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-brand-dark mb-2">Notification Preferences</h2>
        <p className="text-brand-dark/70">Choose how you want to receive notifications</p>
      </div>

      <div className="space-y-6">
        {notificationSettings.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.category} className="border border-brand-dark/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.settings.map((setting) => (
                  <div key={setting.id} className="space-y-3">
                    <div>
                      <h4 className="font-medium text-brand-dark">{setting.title}</h4>
                      <p className="text-sm text-brand-dark/60">{setting.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch id={`${setting.id}-email`} defaultChecked={setting.email} />
                        <Label htmlFor={`${setting.id}-email`} className="text-sm">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id={`${setting.id}-sms`} defaultChecked={setting.sms} />
                        <Label htmlFor={`${setting.id}-sms`} className="text-sm">
                          SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
