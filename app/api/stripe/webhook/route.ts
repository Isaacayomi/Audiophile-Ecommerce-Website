import crypto from "node:crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type StripeCheckoutSession = {
  id: string;
  amount_total?: number | null;
  currency?: string | null;
  customer_email?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      postal_code?: string | null;
      state?: string | null;
      country?: string | null;
    } | null;
  } | null;
  metadata?: Record<string, string> | null;
};

type StripeWebhookEvent = {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession;
  };
};

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
const notificationEmail =
  process.env.ORDER_NOTIFICATION_EMAIL ??
  process.env.SUPPORT_EMAIL ??
  process.env.ADMIN_EMAIL ??
  "";

const formatCurrency = (amount: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(amount);

const parseStripeSignature = (header: string) =>
  header.split(",").reduce<Record<string, string[]>>((accumulator, pair) => {
    const [key, value] = pair.split("=");
    if (!key || !value) return accumulator;
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(value);
    return accumulator;
  }, {});

const verifyStripeWebhook = (
  payload: string,
  signatureHeader: string,
  secret: string,
) => {
  const parts = parseStripeSignature(signatureHeader);
  const timestamp = parts.t?.[0];
  const signatures = parts.v1 ?? [];

  if (!timestamp || signatures.length === 0) {
    throw new Error("Missing Stripe signature data.");
  }

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber)) {
    throw new Error("Invalid Stripe timestamp.");
  }

  const toleranceInSeconds = 60 * 5;
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - timestampNumber) > toleranceInSeconds) {
    throw new Error("Stripe webhook timestamp is outside the allowed window.");
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const matches = signatures.some((signature) => {
    const providedBuffer = Buffer.from(signature, "hex");
    if (providedBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
  });

  if (!matches) {
    throw new Error("Stripe webhook signature does not match.");
  }
};

const buildNotificationSubject = (session: StripeCheckoutSession) => {
  const customerName =
    session.customer_details?.name ??
    session.metadata?.customerName ??
    "New order";
  return `New Audiophile order from ${customerName}`;
};

const buildNotificationText = (session: StripeCheckoutSession) => {
  const customerName =
    session.customer_details?.name ??
    session.metadata?.customerName ??
    "Customer";
  const customerEmail =
    session.customer_email ??
    session.customer_details?.email ??
    session.metadata?.customerEmail ??
    "Not provided";
  const customerPhone =
    session.customer_details?.phone ??
    session.metadata?.customerPhone ??
    "Not provided";
  const shippingAddress = [
    session.metadata?.shippingAddress,
    session.metadata?.shippingCity,
    session.metadata?.shippingZipCode,
    session.metadata?.shippingCountry,
  ]
    .filter((value): value is string => Boolean(value))
    .join(", ");
  const amount =
    typeof session.amount_total === "number"
      ? formatCurrency(session.amount_total / 100, session.currency ?? "usd")
      : "Unavailable";

  return [
    "A new order has been paid successfully.",
    "",
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    `Phone: ${customerPhone}`,
    `Shipping: ${shippingAddress || "Not provided"}`,
    `Amount paid: ${amount}`,
    `Payment reference: ${session.id}`,
  ].join("\n");
};

const sendOrderEmail = async (session: StripeCheckoutSession) => {
  if (!notificationEmail) {
    throw new Error(
      "Missing ORDER_NOTIFICATION_EMAIL, SUPPORT_EMAIL, or ADMIN_EMAIL.",
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY ?? "";
  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const fromAddress =
    process.env.MAIL_FROM ?? "Audiophile <onboarding@resend.dev>";

  const resend = new Resend(resendApiKey);

  await resend.emails.send({
    from: fromAddress,
    to: notificationEmail,
    subject: buildNotificationSubject(session),
    text: buildNotificationText(session),
  });
};

export async function POST(request: Request) {
  try {
    if (!stripeWebhookSecret) {
      return NextResponse.json(
        { detail: "Missing STRIPE_WEBHOOK_SECRET." },
        { status: 500 },
      );
    }

    const signatureHeader = request.headers.get("stripe-signature");
    if (!signatureHeader) {
      return NextResponse.json(
        { detail: "Missing Stripe signature header." },
        { status: 400 },
      );
    }

    const payload = await request.text();
    verifyStripeWebhook(payload, signatureHeader, stripeWebhookSecret);

    const event = JSON.parse(payload) as StripeWebhookEvent;
    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const session = event.data.object;
    await sendOrderEmail(session);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process webhook.";
    console.error("Stripe webhook failed:", message);
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}