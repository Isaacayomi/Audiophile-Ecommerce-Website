import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/lib/products";

const extractProductRecords = (data: unknown): unknown[] => {
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

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { detail: "Unable to load live catalog stock right now." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const stockBySlug = Object.fromEntries(
      extractProductRecords(data)
        .filter((product): product is Record<string, unknown> => {
          return Boolean(product && typeof product === "object");
        })
        .map((product) => {
          const slug = typeof product.slug === "string" ? product.slug : "";
          const stock = Number(product.stock);

          return [slug, Number.isFinite(stock) ? stock : undefined];
        })
        .filter(([slug]) => Boolean(slug)),
    );

    return NextResponse.json({ stockBySlug });
  } catch {
    return NextResponse.json(
      { detail: "Unable to load live catalog stock right now." },
      { status: 502 },
    );
  }
}
