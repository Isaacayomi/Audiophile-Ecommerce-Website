// Tests for the admin catalog utility functions in app/admin/_lib/catalog.ts.
//
// These helpers run on both client and server and contain non-trivial logic
// (slug generation, sort order, featured pinning, base64 stripping) that is
// easy to accidentally break during refactors — exactly the kind of thing
// that benefits most from automated tests.

import {
  slugify,
  normalizeAdminProducts,
  sanitizeAdminProductForStorage,
  mapStorefrontProductToAdmin,
  formatCurrency,
} from "@/app/admin/_lib/catalog";
import type { AdminProduct, Product } from "@/app/type";

// ─── shared factory ───────────────────────────────────────────────────────────

// Rather than copying the full AdminProduct shape into every test, this helper
// creates a valid product and lets each test override only the fields it cares
// about. The Partial<AdminProduct> spread means you can pass any subset.
const makeProduct = (overrides: Partial<AdminProduct> = {}): AdminProduct => ({
  slug: "test-product",
  name: "Test Product",
  shortName: "Test",
  category: "headphones",
  categoryLabel: "Headphones",
  price: 100,
  description: "",
  features: [],
  includes: [],
  categoryImage: { mobile: "", tablet: "", desktop: "" },
  productImage: { mobile: "", tablet: "", desktop: "" },
  image: "",
  gallery: {
    first: { mobile: "", tablet: "", desktop: "" },
    second: { mobile: "", tablet: "", desktop: "" },
    third: { mobile: "", tablet: "", desktop: "" },
  },
  others: [],
  categoryOrder: 1,
  stock: 10,
  status: "Live",
  featured: false,
  storefrontPath: "/headphones/test-product",
  isNew: false,
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

// ─── slugify ──────────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("lowercases the entire string", () => {
    expect(slugify("XX99 Mark II")).toBe("xx99-mark-ii");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("ZX9 Speaker")).toBe("zx9-speaker");
  });

  it("collapses multiple consecutive spaces into a single hyphen", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("strips leading and trailing whitespace before slugifying", () => {
    expect(slugify("  audiophile  ")).toBe("audiophile");
  });

  it("removes single and double quotes", () => {
    // Quotes in product names would produce invalid URL characters.
    expect(slugify("it's great")).toBe("its-great");
  });

  it("replaces non-alphanumeric characters with hyphens", () => {
    expect(slugify("product!@#")).toBe("product");
  });

  it("returns an empty string when given an empty string", () => {
    expect(slugify("")).toBe("");
  });
});

// ─── formatCurrency ───────────────────────────────────────────────────────────

describe("formatCurrency", () => {
  it("formats a price with a dollar sign and no decimals", () => {
    expect(formatCurrency(2999)).toBe("$2,999");
  });

  it("formats zero as $0", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});

// ─── normalizeAdminProducts ───────────────────────────────────────────────────

describe("normalizeAdminProducts", () => {
  it("sorts products newest-first by updatedAt", () => {
    const products = [
      makeProduct({ slug: "old-product", updatedAt: "2026-01-01T00:00:00.000Z" }),
      makeProduct({ slug: "new-product", updatedAt: "2026-06-01T00:00:00.000Z" }),
    ];
    const result = normalizeAdminProducts(products);

    // The most-recently-updated product should appear at index 0.
    expect(result[0].slug).toBe("new-product");
    expect(result[1].slug).toBe("old-product");
  });

  it("always marks the first (newest) product as featured", () => {
    // Guarantees at least one featured product on the storefront at all times,
    // even if the admin deselected featured on every product.
    const products = [
      makeProduct({
        slug: "newest",
        featured: false,
        updatedAt: "2026-06-01T00:00:00.000Z",
      }),
      makeProduct({
        slug: "oldest",
        featured: true,
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    ];
    const result = normalizeAdminProducts(products);

    expect(result[0].featured).toBe(true);
  });

  it("does not force featured=true on any product beyond the first", () => {
    const products = [
      makeProduct({ slug: "a", featured: false, updatedAt: "2026-06-01T00:00:00.000Z" }),
      makeProduct({ slug: "b", featured: false, updatedAt: "2026-01-01T00:00:00.000Z" }),
    ];
    const result = normalizeAdminProducts(products);

    // Only the first item is promoted; the second stays false.
    expect(result[1].featured).toBe(false);
  });

  it("rebuilds storefrontPath from category and slug", () => {
    // The path is derived, not stored — normalisation keeps it in sync.
    const products = [
      makeProduct({ slug: "zx9-speaker", category: "speakers" }),
    ];
    const result = normalizeAdminProducts(products);
    expect(result[0].storefrontPath).toBe("/speakers/zx9-speaker");
  });

  it("does not mutate the original array", () => {
    // normalizeAdminProducts calls .slice() internally; the original should
    // be untouched so the caller doesn't see surprise reordering.
    const original = [
      makeProduct({ slug: "a", updatedAt: "2026-01-01T00:00:00.000Z" }),
      makeProduct({ slug: "b", updatedAt: "2026-06-01T00:00:00.000Z" }),
    ];
    normalizeAdminProducts(original);
    expect(original[0].slug).toBe("a");
  });

  it("returns an empty array when given an empty array", () => {
    expect(normalizeAdminProducts([])).toEqual([]);
  });
});

// ─── sanitizeAdminProductForStorage ──────────────────────────────────────────

describe("sanitizeAdminProductForStorage", () => {
  it("strips a base64 data URI from the top-level image field", () => {
    // Base64 strings are large and must not be written to the remote API.
    const product = makeProduct({ image: "data:image/png;base64,abc123==" });
    const result = sanitizeAdminProductForStorage(product);
    expect(result.image).toBe("");
  });

  it("keeps a regular URL path in the image field untouched", () => {
    const product = makeProduct({ image: "/assets/product.jpg" });
    const result = sanitizeAdminProductForStorage(product);
    expect(result.image).toBe("/assets/product.jpg");
  });

  it("keeps an empty image string untouched", () => {
    const product = makeProduct({ image: "" });
    const result = sanitizeAdminProductForStorage(product);
    expect(result.image).toBe("");
  });

  it("strips base64 from all three sizes in categoryImage", () => {
    const base64 = "data:image/jpeg;base64,/9j/FAKE";
    const product = makeProduct({
      categoryImage: { mobile: base64, tablet: base64, desktop: base64 },
    });
    const result = sanitizeAdminProductForStorage(product);

    expect(result.categoryImage.mobile).toBe("");
    expect(result.categoryImage.tablet).toBe("");
    expect(result.categoryImage.desktop).toBe("");
  });

  it("strips base64 from gallery images too", () => {
    const base64 = "data:image/jpeg;base64,/9j/FAKE";
    const product = makeProduct({
      gallery: {
        first: { mobile: base64, tablet: "", desktop: "" },
        second: { mobile: "", tablet: "", desktop: "" },
        third: { mobile: "", tablet: "", desktop: "" },
      },
    });
    const result = sanitizeAdminProductForStorage(product);
    expect(result.gallery.first.mobile).toBe("");
  });

  it("does not mutate the original product object", () => {
    const product = makeProduct({ image: "data:image/png;base64,abc" });
    sanitizeAdminProductForStorage(product);
    // The original should still have the base64 string — the function returns
    // a new object rather than editing in place.
    expect(product.image).toBe("data:image/png;base64,abc");
  });
});

// ─── mapStorefrontProductToAdmin ──────────────────────────────────────────────

describe("mapStorefrontProductToAdmin", () => {
  // Minimal Product shape needed for the mapping test.
  const storefrontProduct: Product = {
    slug: "zx9-speaker",
    category: "speakers",
    categoryLabel: "Speakers",
    shortName: "ZX9",
    name: "ZX9 Speaker",
    isNew: true,
    price: 4500,
    description: "A great speaker.",
    features: [],
    includes: [],
    categoryImage: { mobile: "", tablet: "", desktop: "" },
    productImage: {
      mobile: "",
      tablet: "",
      desktop: "/assets/zx9/desktop/image-product.jpg",
    },
    gallery: {
      first: { mobile: "", tablet: "", desktop: "" },
      second: { mobile: "", tablet: "", desktop: "" },
      third: { mobile: "", tablet: "", desktop: "" },
    },
    others: [],
    categoryOrder: 1,
  };

  it("copies slug, name, category, and price from the storefront product", () => {
    const admin = mapStorefrontProductToAdmin(storefrontProduct);

    expect(admin.slug).toBe("zx9-speaker");
    expect(admin.name).toBe("ZX9 Speaker");
    expect(admin.category).toBe("speakers");
    expect(admin.price).toBe(4500);
  });

  it("derives storefrontPath from category and slug", () => {
    const admin = mapStorefrontProductToAdmin(storefrontProduct);
    expect(admin.storefrontPath).toBe("/speakers/zx9-speaker");
  });

  it("sets status to Live by default", () => {
    const admin = mapStorefrontProductToAdmin(storefrontProduct);
    expect(admin.status).toBe("Live");
  });

  it("sets featured to true when the product is marked isNew", () => {
    // isNew on the storefront maps to featured in the admin view.
    const admin = mapStorefrontProductToAdmin(storefrontProduct);
    expect(admin.featured).toBe(true);
  });
});
