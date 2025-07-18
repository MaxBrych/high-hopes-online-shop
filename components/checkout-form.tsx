"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Truck, Mail } from "lucide-react"

interface CheckoutFormProps {
  onOrderComplete: () => void
  isProcessing: boolean
}

export function CheckoutForm({ onOrderComplete, isProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "DE",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddressSame: true,
    newsletter: false,
    terms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "E-Mail ist erforderlich"
    if (!formData.firstName) newErrors.firstName = "Vorname ist erforderlich"
    if (!formData.lastName) newErrors.lastName = "Nachname ist erforderlich"
    if (!formData.address) newErrors.address = "Adresse ist erforderlich"
    if (!formData.city) newErrors.city = "Stadt ist erforderlich"
    if (!formData.postalCode) newErrors.postalCode = "Postleitzahl ist erforderlich"
    if (!formData.phone) newErrors.phone = "Telefonnummer ist erforderlich"
    if (!formData.cardNumber) newErrors.cardNumber = "Kartennummer ist erforderlich"
    if (!formData.expiryDate) newErrors.expiryDate = "Ablaufdatum ist erforderlich"
    if (!formData.cvv) newErrors.cvv = "CVV ist erforderlich"
    if (!formData.nameOnCard) newErrors.nameOnCard = "Name auf Karte ist erforderlich"
    if (!formData.terms) newErrors.terms = "Sie müssen den AGB zustimmen"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onOrderComplete()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Mail className="w-5 h-5 mr-2 text-green-600" />
            Kontaktinformationen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">E-Mail-Adresse *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              placeholder="ihre.email@beispiel.de"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Newsletter abonnieren für exklusive Angebote
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Truck className="w-5 h-5 mr-2 text-green-600" />
            Lieferadresse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Vorname *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
                placeholder="Max"
              />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Nachname *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
                placeholder="Mustermann"
              />
              {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Straße und Hausnummer *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
              placeholder="Musterstraße 123"
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="postalCode">Postleitzahl *</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className={errors.postalCode ? "border-red-500" : ""}
                placeholder="12345"
              />
              {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="city">Stadt *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-red-500" : ""}
                placeholder="Berlin"
              />
              {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="country">Land</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DE">Deutschland</SelectItem>
                <SelectItem value="AT">Österreich</SelectItem>
                <SelectItem value="CH">Schweiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone">Telefonnummer *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
              placeholder="+49 123 456789"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Versandart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={formData.shippingMethod === "standard"}
                  onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                  className="text-green-600"
                />
                <div>
                  <p className="font-medium">Standard Versand</p>
                  <p className="text-sm text-gray-500">3-5 Werktage</p>
                </div>
              </div>
              <span className="font-medium text-green-600">Kostenlos</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={formData.shippingMethod === "express"}
                  onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                  className="text-green-600"
                />
                <div>
                  <p className="font-medium">Express Versand</p>
                  <p className="text-sm text-gray-500">1-2 Werktage</p>
                </div>
              </div>
              <span className="font-medium">€9.99</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Zahlungsmethode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                  className="text-green-600"
                />
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Kreditkarte</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                  className="text-green-600"
                />
                <span>PayPal</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="klarna"
                  checked={formData.paymentMethod === "klarna"}
                  onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                  className="text-green-600"
                />
                <span>Klarna</span>
              </div>
            </div>
          </div>

          {formData.paymentMethod === "card" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="nameOnCard">Name auf Karte *</Label>
                <Input
                  id="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                  className={errors.nameOnCard ? "border-red-500" : ""}
                  placeholder="Max Mustermann"
                />
                {errors.nameOnCard && <p className="text-sm text-red-500 mt-1">{errors.nameOnCard}</p>}
              </div>
              <div>
                <Label htmlFor="cardNumber">Kartennummer *</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className={errors.cardNumber ? "border-red-500" : ""}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Ablaufdatum *</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className={errors.expiryDate ? "border-red-500" : ""}
                    placeholder="MM/JJ"
                  />
                  {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className={errors.cvv ? "border-red-500" : ""}
                    placeholder="123"
                  />
                  {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                className={errors.terms ? "border-red-500" : ""}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                Ich stimme den{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Allgemeinen Geschäftsbedingungen
                </Link>{" "}
                und der{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Datenschutzerklärung
                </Link>{" "}
                zu. *
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Bestellung wird verarbeitet...
          </div>
        ) : (
          "Jetzt Bestellen"
        )}
      </Button>

      <div className="flex items-center justify-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <CreditCard className="w-4 h-4 mr-1" />
          SSL-verschlüsselt
        </div>
        <div className="flex items-center">
          <Truck className="w-4 h-4 mr-1" />
          Schneller Versand
        </div>
      </div>
    </form>
  )
}
