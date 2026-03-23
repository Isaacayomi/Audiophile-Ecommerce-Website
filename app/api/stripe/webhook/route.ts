import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { saveOrder } from "@/app/lib/orders";

export const runtime = "nodejs";

const getWebhookSecret = () => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable.");
  }

  return webhookSecret;
};

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature header." },
        { status: 400 },
      );
    }

    // Webhook verification must use the raw request body exactly as Stripe sent it.
    const payload = await request.text();
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getWebhookSecret(),
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Expanded line items let us persist a full order summary for post-payment UI and future admin flows.
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items.data.price.product", "shipping_cost.shipping_rate"],
      });

      const lineItems = fullSession.line_items?.data ?? [];

      await saveOrder({
        id: crypto.randomUUID(),
        sessionId: fullSession.id,
        paymentStatus: fullSession.payment_status ?? "unpaid",
        customerName: fullSession.metadata?.customerName ?? "",
        customerEmail: fullSession.customer_email ?? "",
        customerPhone:
          fullSession.customer_details?.phone ??
          fullSession.metadata?.customerPhone ??
          "",
        shippingAddress: fullSession.metadata?.shippingAddress ?? "",
        shippingCity: fullSession.metadata?.shippingCity ?? "",
        shippingZipCode: fullSession.metadata?.shippingZipCode ?? "",
        shippingCountry: fullSession.metadata?.shippingCountry ?? "",
        subtotal: (fullSession.amount_subtotal ?? 0) / 100,
        shippingAmount: (fullSession.shipping_cost?.amount_total ?? 0) / 100,
        amountTotal: (fullSession.amount_total ?? 0) / 100,
        currency: (fullSession.currency ?? "usd").toUpperCase(),
        items: lineItems.map((item) => {
          const product = item.price?.product;
          const hasImages =
            product &&
            typeof product !== "string" &&
            "images" in product &&
            Array.isArray(product.images);
          const productImage =
            hasImages && product.images[0]
              ? product.images[0]
              : undefined;

          return {
            name: item.description ?? item.price?.nickname ?? "Product",
            quantity: item.quantity ?? 0,
            unitAmount: (item.price?.unit_amount ?? 0) / 100,
            image: productImage,
          };
        }),
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed", error);

    return NextResponse.json(
      { error: "Unable to process Stripe webhook." },
      { status: 400 },
    );
  }
}
