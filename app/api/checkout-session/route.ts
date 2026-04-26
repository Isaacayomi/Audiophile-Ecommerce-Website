import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/lib/products";
import { getCartStockViolationMessage } from "@/app/lib/checkout";
import { buildCheckoutSessionPayload } from "./buildCheckoutSessionPayload";

const extractProductRecords = (data: unknown) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    "products" in data &&
    Array.isArray((data as { products?: unknown[] }).products)
  ) {
    return (data as { products: unknown[] }).products;
  }

  return [];
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const cartItems = Array.isArray(payload?.cartItems) ? payload.cartItems : [];

    const catalogResponse = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });

    const catalogData = catalogResponse.ok ? await catalogResponse.json() : null;
    const stockBySlug = Object.fromEntries(
      extractProductRecords(catalogData).map((product: Record<string, unknown>) => [
        typeof product.slug === "string" ? product.slug : "",
        Number.isFinite(Number(product.stock))
          ? Number(product.stock)
          : undefined,
      ]),
    );

    const stockViolationMessage = getCartStockViolationMessage(
      cartItems,
      stockBySlug,
    );

    if (stockViolationMessage) {
      return NextResponse.json({ detail: stockViolationMessage }, { status: 400 });
    }

    const origin =
      request.headers.get("origin") ?? new URL(request.url).origin;
    const checkoutPayload = buildCheckoutSessionPayload(payload, origin);

    const response = await fetch(
      `${API_BASE_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutPayload),
      },
    );

    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : { detail: await response.text() };

    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json(
      { detail: "Unable to reach the checkout service right now." },
      { status: 502 },
    );
  }
}
