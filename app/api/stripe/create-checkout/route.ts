import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: Request) {
  try {
    // Check if Stripe secret key is available
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json({ error: { message: "Stripe configuration missing" } }, { status: 500 })
    }

    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    })

    const { boxId, mode } = await request.json()

    // Validate required fields
    if (!boxId) {
      return NextResponse.json({ error: { message: "Missing required fields" } }, { status: 400 })
    }

    // Get box details (in a real app, fetch this from your database)
    const boxes = {
      grower_essentials_box: {
        name: "Grower Essentials Box",
        description: "One-time box with growing supplies, nutrients, and equipment",
        price: 5999, // €59.99 in cents
        images: ["/images/subscription/grower-essentials-box.png"],
      },
      smoking_accessories_box: {
        name: "Smoking Accessories Box",
        description: "One-time box with papers, tips, bongs, and smoking gear",
        price: 4999, // €49.99 in cents
        images: ["/images/subscription/smoking-accessories-box.png"],
      },
      premium_genetics_box: {
        name: "Premium Genetics Box",
        description: "One-time box with exclusive strains and rare genetics",
        price: 6999, // €69.99 in cents
        images: ["/images/subscription/premium-genetics-box.png"],
      },
    }

    const selectedBox = boxes[boxId as keyof typeof boxes]
    if (!selectedBox) {
      return NextResponse.json({ error: { message: "Invalid box selection" } }, { status: 400 })
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selectedBox.name,
              description: selectedBox.description,
              images: selectedBox.images,
              metadata: {
                boxId,
              },
            },
            unit_amount: selectedBox.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/subscriptions`,
      metadata: {
        boxId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Stripe API error:", error)
    return NextResponse.json({ error: { message: "Error creating checkout session" } }, { status: 500 })
  }
}
