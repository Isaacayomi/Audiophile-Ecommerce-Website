// Tests for the slug-resolution helpers in app/lib/storefrontRoutes.ts.
//
// Why slug resolution needs tests: the backend occasionally uses old product
// slugs (e.g. "xx99-mark-two-headphones") while the storefront expects the
// canonical ones ("xx99-mark-ii-headphones"). A mistake here silently 404s
// product pages, so we pin the exact mapping in tests.

import {
  resolveStorefrontSlug,
  resolveStorefrontSlugByValue,
} from "@/app/lib/storefrontRoutes";

// ─── resolveStorefrontSlug ────────────────────────────────────────────────────

describe("resolveStorefrontSlug", () => {
  it("maps the legacy headphone slug to the canonical slug", () => {
    const canonical = resolveStorefrontSlug(
      "headphones",
      "xx99-mark-two-headphones",
    );
    expect(canonical).toBe("xx99-mark-ii-headphones");
  });

  it("maps the legacy earphone slug to the canonical slug", () => {
    const canonical = resolveStorefrontSlug("earphones", "yx1-earphones");
    expect(canonical).toBe("yx1-wireless-earphones");
  });

  it("returns an unrecognised slug unchanged", () => {
    // If the slug isn't in the legacy alias map, it should pass through
    // as-is so new slugs from the backend aren't accidentally swallowed.
    const slug = "zx9-speaker";
    expect(resolveStorefrontSlug("speakers", slug)).toBe(slug);
  });

  it("does not apply a slug alias from a different category", () => {
    // "yx1-earphones" is only aliased under earphones, not headphones.
    // Applying the alias cross-category would return the wrong product.
    const result = resolveStorefrontSlug("headphones", "yx1-earphones");
    expect(result).toBe("yx1-earphones");
  });

  it("leaves canonical slugs unchanged", () => {
    // Already-canonical slugs should pass through without modification.
    expect(
      resolveStorefrontSlug("headphones", "xx99-mark-ii-headphones"),
    ).toBe("xx99-mark-ii-headphones");
  });
});

// ─── resolveStorefrontSlugByValue ─────────────────────────────────────────────

describe("resolveStorefrontSlugByValue", () => {
  it("resolves a legacy slug without needing a category argument", () => {
    // This variant is used when we only have the slug string and not the
    // category — e.g. when reading a URL param.
    expect(resolveStorefrontSlugByValue("xx99-mark-two-headphones")).toBe(
      "xx99-mark-ii-headphones",
    );
  });

  it("resolves the earphone legacy slug", () => {
    expect(resolveStorefrontSlugByValue("yx1-earphones")).toBe(
      "yx1-wireless-earphones",
    );
  });

  it("returns any non-legacy slug unchanged", () => {
    expect(resolveStorefrontSlugByValue("zx9-speaker")).toBe("zx9-speaker");
  });

  it("returns an empty string unchanged", () => {
    // Edge-case guard: a missing slug should not throw or produce garbage.
    expect(resolveStorefrontSlugByValue("")).toBe("");
  });
});
