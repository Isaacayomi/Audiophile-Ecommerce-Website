import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import {
  removeStorefrontCatalogProduct,
  replaceStorefrontCatalogCache,
  upsertStorefrontCatalogProduct,
} from "@/app/lib/storefrontCatalogCache";
import type { Product } from "@/app/type";

type StorefrontCatalogCacheRequest =
  | { action: "upsert"; product: Product }
  | { action: "remove"; slug: string }
  | { action: "replace"; products: Product[] };

export async function POST(request: Request) {
  let payload: StorefrontCatalogCacheRequest;

  try {
    payload = (await request.json()) as StorefrontCatalogCacheRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid storefront cache payload" },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || !("action" in payload)) {
    return NextResponse.json(
      { error: "Invalid storefront cache payload" },
      { status: 400 },
    );
  }

  if (payload.action === "upsert") {
    upsertStorefrontCatalogProduct(payload.product);
  } else if (payload.action === "remove") {
    removeStorefrontCatalogProduct(payload.slug);
  } else {
    replaceStorefrontCatalogCache(payload.products);
  }

  revalidateTag("products");

  return NextResponse.json({
    ok: true,
  });
}
