import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/lib/products";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(
      `${API_BASE_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
