import { categories as storefrontCategories, getCategoryProducts } from "../../lib/products";
import type { Category, Product } from "../../type";

export type AdminStatus = "Live" | "Draft" | "Hidden";

export type AdminProduct = {
  slug: string;
  name: string;
  shortName: string;
  category: Category;
  price: number;
  stock: number;
  status: AdminStatus;
  featured: boolean;
  image: string;
  description: string;
  storefrontPath: string;
  updatedAt: string;
};

export type AdminOrder = {
  id: string;
  customer: string;
  product: string;
  status: "Delivered" | "In Transit" | "Pending";
  amount: string;
  time: string;
};

export type AdminSettings = {
  storeName: string;
  adminName: string;
  supportEmail: string;
  catalogSyncEnabled: boolean;
  emailAlertsEnabled: boolean;
  storefrontNotes: string;
};

export const ADMIN_CATALOG_STORAGE_KEY = "audiophile-admin-catalog-v1";
export const ADMIN_SETTINGS_STORAGE_KEY = "audiophile-admin-settings-v1";

const nowIso = () => new Date().toISOString();

export const fallbackOrders: AdminOrder[] = [
  { id: "ORD-7721", customer: "Alex Rivera", product: "XX99 Mark II", status: "Delivered", amount: "$2,999", time: "2m ago" },
  { id: "ORD-7720", customer: "Sarah Chen", product: "ZX7 Speaker", status: "In Transit", amount: "$3,500", time: "15m ago" },
  { id: "ORD-7719", customer: "James Wilson", product: "YX1 Earphones", status: "Pending", amount: "$599", time: "1h ago" },
  { id: "ORD-7718", customer: "Elena Gomez", product: "XX59 Headphones", status: "Delivered", amount: "$899", time: "3h ago" },
];

export const fallbackProducts: AdminProduct[] = [
  {
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    shortName: "XX99 MK II",
    category: "headphones",
    price: 2999,
    stock: 45,
    status: "Live",
    featured: true,
    image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
    description: "A flagship headphone built for detailed sound, premium comfort, and everyday Audiophile listening.",
    storefrontPath: "/headphones/xx99-mark-two-headphones",
    updatedAt: nowIso(),
  },
  {
    slug: "zx9-speaker",
    name: "ZX9 Speaker",
    shortName: "ZX9",
    category: "speakers",
    price: 4500,
    stock: 12,
    status: "Live",
    featured: false,
    image: "/assets/product-zx9-speaker/desktop/image-product.jpg",
    description: "A high-impact wireless speaker for bold room-filling sound.",
    storefrontPath: "/speakers/zx9-speaker",
    updatedAt: nowIso(),
  },
  {
    slug: "yx1-earphones",
    name: "YX1 Earphones",
    shortName: "YX1",
    category: "earphones",
    price: 599,
    stock: 89,
    status: "Live",
    featured: false,
    image: "/assets/product-yx1-earphones/desktop/image-product.jpg",
    description: "Compact earphones tuned for balanced daily listening.",
    storefrontPath: "/earphones/yx1-earphones",
    updatedAt: nowIso(),
  },
];

export const defaultSettings: AdminSettings = {
  storeName: "Audiophile",
  adminName: "John Doe",
  supportEmail: "admin@audiophile.com",
  catalogSyncEnabled: true,
  emailAlertsEnabled: true,
  storefrontNotes: "Keep product copy aligned with the Audiophile catalog tone and pricing.",
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const categorizeStatus = (stock: number, status: AdminStatus) => {
  if (status !== "Live") return status;
  if (stock <= 15) return "Hidden";
  if (stock <= 30) return "Draft";
  return "Live";
};

const imageForProduct = (product: Product) =>
  product.productImage.desktop || product.categoryImage.desktop || "";

const stockForCategory = (category: Category) => {
  if (category === "speakers") return 12;
  if (category === "earphones") return 89;
  return 45;
};

export const mapStorefrontProductToAdmin = (product: Product): AdminProduct => ({
  slug: product.slug,
  name: product.name,
  shortName: product.shortName || product.name,
  category: product.category,
  price: product.price,
  stock: stockForCategory(product.category),
  status: categorizeStatus(stockForCategory(product.category), "Live"),
  featured: Boolean(product.isNew),
  image: imageForProduct(product),
  description: product.description,
  storefrontPath: `/${product.category}/${product.slug}`,
  updatedAt: nowIso(),
});

export const loadStorefrontCatalog = async (): Promise<AdminProduct[]> => {
  // The storefront already owns the product catalog API.
  // We reuse that same source here so the dashboard reflects the live catalog
  // without having to duplicate product content by hand.
  const results = await Promise.all(
    storefrontCategories.map(({ slug }) => getCategoryProducts(slug)),
  );

  const merged = results
    .flat()
    .filter((product) => Boolean(product.slug))
    .map(mapStorefrontProductToAdmin);

  const seen = new Set<string>();

  return merged.filter((product) => {
    if (seen.has(product.slug)) return false;
    seen.add(product.slug);
    return true;
  });
};

export const normalizeAdminProducts = (products: AdminProduct[]) =>
  products
    .slice()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((product, index) => ({
      ...product,
      featured: index === 0 ? true : product.featured,
    }));

export const upsertAdminProduct = (
  current: AdminProduct[],
  draft: Omit<AdminProduct, "updatedAt">,
): AdminProduct[] => {
  const updated: AdminProduct = {
    ...draft,
    updatedAt: nowIso(),
    storefrontPath: draft.storefrontPath || `/${draft.category}/${draft.slug}`,
  };

  const existingIndex = current.findIndex((product) => product.slug === draft.slug);

  if (existingIndex === -1) {
    return normalizeAdminProducts([updated, ...current]);
  }

  const next = current.slice();
  next[existingIndex] = updated;
  return normalizeAdminProducts(next);
};

