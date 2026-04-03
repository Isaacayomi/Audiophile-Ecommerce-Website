import type {
  AdminOrder,
  AdminProduct,
  AdminSettings,
  CatalogInput,
  Category,
  Product,
} from "../../type";

export const ADMIN_CATALOG_STORAGE_KEY = "audiophile-admin-catalog-v1";
export const ADMIN_SETTINGS_STORAGE_KEY = "audiophile-admin-settings-v1";

export const fallbackOrders: AdminOrder[] = [
  {
    id: "ORD-7721",
    customer: "Alex Rivera",
    product: "XX99 Mark II",
    status: "Delivered",
    amount: "$2,999",
    time: "2m ago",
  },
  {
    id: "ORD-7720",
    customer: "Sarah Chen",
    product: "ZX7 Speaker",
    status: "In Transit",
    amount: "$3,500",
    time: "15m ago",
  },
  {
    id: "ORD-7719",
    customer: "James Wilson",
    product: "YX1 Earphones",
    status: "Pending",
    amount: "$599",
    time: "1h ago",
  },
  {
    id: "ORD-7718",
    customer: "Elena Gomez",
    product: "XX59 Headphones",
    status: "Delivered",
    amount: "$899",
    time: "3h ago",
  },
];

const seedTime = "2026-03-28T00:00:00.000Z";

const imageSet = (slug: string, fileName: string) => ({
  mobile: `/assets/${slug}/mobile/${fileName}`,
  tablet: `/assets/${slug}/tablet/${fileName}`,
  desktop: `/assets/${slug}/desktop/${fileName}`,
});

export const fallbackProducts: AdminProduct[] = [
  {
    slug: "xx99-mark-two-headphones",
    category: "headphones",
    categoryLabel: "Headphones",
    shortName: "XX99 MK II",
    name: "XX99 Mark II Headphones",
    isNew: true,
    price: 2999,
    description: "A flagship Audiophile headphone built for detailed sound and comfort.",
    features: [],
    includes: [],
    categoryImage: imageSet("product-xx99-mark-two-headphones", "image-category-page-preview.jpg"),
    productImage: imageSet("product-xx99-mark-two-headphones", "image-product.jpg"),
    gallery: {
      first: imageSet("product-xx99-mark-two-headphones", "image-gallery-1.jpg"),
      second: imageSet("product-xx99-mark-two-headphones", "image-gallery-2.jpg"),
      third: imageSet("product-xx99-mark-two-headphones", "image-gallery-3.jpg"),
    },
    others: [],
    categoryOrder: 1,
    stock: 45,
    status: "Live",
    featured: true,
    image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
    storefrontPath: "/headphones/xx99-mark-two-headphones",
    updatedAt: seedTime,
  },
  {
    slug: "zx9-speaker",
    category: "speakers",
    categoryLabel: "Speakers",
    shortName: "ZX9",
    name: "ZX9 Speaker",
    isNew: true,
    price: 4500,
    description: "A powerful wireless speaker built for room-filling sound.",
    features: [],
    includes: [],
    categoryImage: imageSet("product-zx9-speaker", "image-category-page-preview.jpg"),
    productImage: imageSet("product-zx9-speaker", "image-product.jpg"),
    gallery: {
      first: imageSet("product-zx9-speaker", "image-gallery-1.jpg"),
      second: imageSet("product-zx9-speaker", "image-gallery-2.jpg"),
      third: imageSet("product-zx9-speaker", "image-gallery-3.jpg"),
    },
    others: [],
    categoryOrder: 1,
    stock: 12,
    status: "Live",
    featured: false,
    image: "/assets/product-zx9-speaker/desktop/image-product.jpg",
    storefrontPath: "/speakers/zx9-speaker",
    updatedAt: seedTime,
  },
  {
    slug: "yx1-earphones",
    category: "earphones",
    categoryLabel: "Earphones",
    shortName: "YX1",
    name: "YX1 Earphones",
    isNew: true,
    price: 599,
    description: "Compact earphones tuned for everyday listening.",
    features: [],
    includes: [],
    categoryImage: imageSet("product-yx1-earphones", "image-category-page-preview.jpg"),
    productImage: imageSet("product-yx1-earphones", "image-product.jpg"),
    gallery: {
      first: imageSet("product-yx1-earphones", "image-gallery-1.jpg"),
      second: imageSet("product-yx1-earphones", "image-gallery-2.jpg"),
      third: imageSet("product-yx1-earphones", "image-gallery-3.jpg"),
    },
    others: [],
    categoryOrder: 1,
    stock: 89,
    status: "Live",
    featured: false,
    image: "/assets/product-yx1-earphones/desktop/image-product.jpg",
    storefrontPath: "/earphones/yx1-earphones",
    updatedAt: seedTime,
  },
];

export const defaultSettings: AdminSettings = {
  storeName: "Audiophile",
  adminName: "John Doe",
  supportEmail: "admin@audiophile.com",
  catalogSyncEnabled: true,
  emailAlertsEnabled: true,
  storefrontNotes:
    "Keep product copy aligned with the Audiophile catalog tone and pricing.",
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

export const normalizeAdminProducts = (products: AdminProduct[]) =>
  products
    .slice()
    .sort((a, b) =>
      (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
    )
    .map((product, index) => ({
      ...product,
      updatedAt: product.updatedAt ?? seedTime,
      featured: index === 0 ? true : product.featured,
      storefrontPath: `/${product.category}/${product.slug}`,
    }));

export const toCatalogInput = (product: AdminProduct): CatalogInput => ({
  slug: product.slug,
  shortName: product.shortName,
  category: product.category,
  name: product.name,
  price: product.price,
  description: product.description,
  stock: product.stock,
  status: product.status,
  featured: product.featured,
  image: product.image,
  storefrontPath: product.storefrontPath,
});

export const makeStorefrontPath = (
  category: Category,
  slug: string,
  storefrontPath?: string,
) => storefrontPath && storefrontPath === `/${category}/${slug}`
  ? storefrontPath
  : `/${category}/${slug}`;

const stockForCategory = (category: Category) => {
  if (category === "speakers") return 12;
  if (category === "earphones") return 89;
  return 45;
};

const imageForProduct = (product: Product) =>
  product.productImage.desktop || product.categoryImage.desktop || "";

export const getAdminImageSource = (
  product: Pick<AdminProduct, "image" | "productImage" | "categoryImage">,
) => product.image || product.productImage.desktop || product.categoryImage.desktop || "";

export const mapStorefrontProductToAdmin = (product: Product): AdminProduct => ({
  slug: product.slug,
  name: product.name,
  shortName: product.shortName || product.name,
  category: product.category,
  categoryLabel: product.categoryLabel,
  price: product.price,
  description: product.description,
  features: product.features,
  includes: product.includes,
  categoryImage: product.categoryImage,
  productImage: product.productImage,
  gallery: product.gallery,
  others: product.others,
  categoryOrder: product.categoryOrder,
  stock: stockForCategory(product.category),
  status: "Live",
  featured: Boolean(product.isNew),
  image: imageForProduct(product),
  storefrontPath: `/${product.category}/${product.slug}`,
  isNew: product.isNew,
  updatedAt: new Date().toISOString(),
});

export const stampAdminProduct = (product: AdminProduct): AdminProduct => ({
  ...product,
  updatedAt: product.updatedAt ?? new Date().toISOString(),
});
