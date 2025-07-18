import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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

    const { email, priceId, boxId, interval, intervalCount } = await request.json()

    // Validate required fields
    if (!email || !priceId || !boxId) {
      return NextResponse.json({ error: { message: "Missing required fields" } }, { status: 400 })
    }

    // Get box details (in a real app, fetch this from your database)
    const boxes = {
      grower_essentials_box: {
        name: "Grower Essentials Box",
        description: "Monthly box with growing supplies, nutrients, and equipment",
        images: ["/images/subscription/grower-essentials-box.png"],
        price: 3499, // €34.99 in cents
      },
      smoking_accessories_box: {
        name: "Smoking Accessories Box",
        description: "Monthly box with papers, tips, bongs, and smoking gear",
        images: ["/images/subscription/smoking-accessories-box.png"],
        price: 2999, // €29.99 in cents
      },
      premium_genetics_box: {
        name: "Premium Genetics Box",
        description: "Monthly box with exclusive strains and rare genetics",
        images: ["/images/subscription/premium-genetics-box.png"],
        price: 3999, // €39.99 in cents
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
      customer_email: email,
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
            recurring: {
              interval: interval as Stripe.PriceRecurringInterval,
              interval_count: intervalCount,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        trial_period_days: 0,
        metadata: {
          boxId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/subscriptions/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/subscriptions`,
      metadata: {
        boxId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Stripe API error:", error)
    return NextResponse.json({ error: { message: "Error creating subscription" } }, { status: 500 })
  }
}
