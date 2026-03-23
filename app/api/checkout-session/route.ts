import { NextResponse } from "next/server";
import { CartItem } from "@/app/type";
import {
  CheckoutFormValues,
  normalizeCheckoutFormValues,
} from "@/app/lib/checkout";
import { getStripe } from "@/app/lib/stripe";

type CheckoutSessionPayload = {
  cartItems: CartItem[];
  customer: CheckoutFormValues;
};

const isValidCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as CartItem;

  return (
    typeof candidate.slug === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.shortName === "string" &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price) &&
    candidate.price > 0 &&
    typeof candidate.image === "string" &&
    typeof candidate.quantity === "number" &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0
  );
};

// Server-side validation protects Stripe session creation from malformed client payloads.
const validateCustomer = (customer: CheckoutFormValues) => {
  if (!customer.name || customer.name.length < 2) {
    return "Please provide a valid name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return "Please provide a valid email address.";
  }

  if (!/^[0-9+\-\s()]{7,}$/.test(customer.phone)) {
    return "Please provide a valid phone number.";
  }

  if (customer.address.length < 5) {
    return "Please provide a valid street address.";
  }

  if (customer.zipCode.length < 3) {
    return "Please provide a valid ZIP code.";
  }

  if (!customer.city) {
    return "Please provide a city.";
  }

  if (!customer.country) {
    return "Please provide a country.";
  }

  return null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutSessionPayload;
    const cartItems = Array.isArray(body.cartItems) ? body.cartItems : [];

    if (cartItems.length === 0 || !cartItems.every(isValidCartItem)) {
      return NextResponse.json(
        { error: "Your cart is empty or invalid." },
        { status: 400 },
      );
    }

    const customer = normalizeCheckoutFormValues(body.customer);
    const validationError = validateCustomer(customer);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const stripe = getStripe();
    const origin = request.headers.get("origin") ?? request.headers.get("host");
    const baseUrl = origin?.startsWith("http")
      ? origin
      : `http://${origin ?? "localhost:3000"}`;

    // Each cart line is converted into the format Stripe Checkout expects for one-time payments.
    const lineItems = cartItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: item.image.startsWith("http")
            ? [item.image]
            : [`${baseUrl}${item.image}`],
          metadata: {
            slug: item.slug,
            shortName: item.shortName,
          },
        },
      },
    }));

    // Hosted Checkout lets Stripe securely handle payment details while we attach customer and delivery metadata.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 5000,
              currency: "usd",
            },
            display_name: "Standard shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
        shippingAddress: customer.address,
        shippingCity: customer.city,
        shippingZipCode: customer.zipCode,
        shippingCountry: customer.country,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to start Stripe checkout right now.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
