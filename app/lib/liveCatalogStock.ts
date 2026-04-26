export type LiveStockBySlug = Record<string, number | undefined>;

type CatalogStockResponse = {
  stockBySlug?: Record<string, unknown>;
  detail?: string;
};

export const fetchLiveStockBySlug = async (): Promise<LiveStockBySlug> => {
  const response = await fetch("/api/catalog-stock", {
    cache: "no-store",
  });

  const payload = (await response.json()) as CatalogStockResponse;

  if (!response.ok) {
    throw new Error(payload.detail ?? "Unable to load live catalog stock right now.");
  }

  const stockBySlug: LiveStockBySlug = {};

  for (const [slug, stock] of Object.entries(payload.stockBySlug ?? {})) {
    const numericStock = Number(stock);
    stockBySlug[slug] = Number.isFinite(numericStock) ? numericStock : undefined;
  }

  return stockBySlug;
};
