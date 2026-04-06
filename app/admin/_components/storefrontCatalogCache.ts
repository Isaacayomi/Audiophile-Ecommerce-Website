"use client";

import { toStorefrontProduct } from "../_lib/catalog";
import type { AdminProduct } from "../../type";

type StorefrontCatalogCacheAction =
  | { action: "upsert"; product: AdminProduct }
  | { action: "remove"; slug: string }
  | { action: "replace"; products: AdminProduct[] };

const toRequestBody = (payload: StorefrontCatalogCacheAction) => {
  if (payload.action === "upsert") {
    return {
      action: payload.action,
      product: toStorefrontProduct(payload.product),
    };
  }

  if (payload.action === "remove") {
    return payload;
  }

  return {
    action: payload.action,
    products: payload.products.map(toStorefrontProduct),
  };
};

export const mutateStorefrontCatalogCache = async (
  payload: StorefrontCatalogCacheAction,
) => {
  const res = await fetch("/api/storefront-cache", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toRequestBody(payload)),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
};
