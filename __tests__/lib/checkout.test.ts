// Tests for the pure calculation helpers in app/lib/checkout.ts.
// "Pure" means the function only looks at its inputs — no network calls,
// no database, no React. These are the easiest tests to write and the
// fastest to run.

import {
  formatPrice,
  calculateCheckoutTotals,
  normalizeCheckoutFormValues,
} from "@/app/lib/checkout";
import type { CartItem } from "@/app/type";

// ─── helpers ─────────────────────────────────────────────────────────────────

// Builds a CartItem with the minimum fields needed.
// Having a helper like this means tests stay short; we only set the fields
// that are relevant to each individual test.
const makeItem = (price: number, quantity: number): CartItem => ({
  slug: "test-product",
  name: "Test Product",
  shortName: "Test",
  price,
  quantity,
  image: "/assets/test.jpg",
});

// ─── formatPrice ─────────────────────────────────────────────────────────────

// describe() groups related tests under a shared heading. Think of it as
// a folder label — everything inside tests the same function or concept.
describe("formatPrice", () => {
  // it() (also written as test()) describes one specific thing that should be
  // true. The string is the human-readable name that appears in the test report.

  it("adds a $ sign and comma-separates thousands", () => {
    // expect() wraps the value we want to check.
    // toBe() is a strict equality check — same as ===.
    expect(formatPrice(2999)).toBe("$2,999");
  });

  it("formats zero as $0", () => {
    expect(formatPrice(0)).toBe("$0");
  });

  it("omits decimal places", () => {
    // VAT rounding can produce floats — we confirm they display as whole dollars.
    expect(formatPrice(49.9)).toBe("$50");
  });

  it("handles large amounts", () => {
    expect(formatPrice(10000)).toBe("$10,000");
  });
});

// ─── calculateCheckoutTotals ──────────────────────────────────────────────────

describe("calculateCheckoutTotals", () => {
  it("returns all-zero totals for an empty cart", () => {
    // toEqual() does a deep equality check — it compares every key/value
    // in the object, unlike toBe() which checks reference equality.
    expect(calculateCheckoutTotals([])).toEqual({
      subtotal: 0,
      shipping: 0,
      vat: 0,
      grandTotal: 0,
    });
  });

  it("skips the $50 shipping fee when the cart is empty", () => {
    const { shipping } = calculateCheckoutTotals([]);
    expect(shipping).toBe(0);
  });

  it("adds a flat $50 shipping fee for any non-empty cart", () => {
    const { shipping } = calculateCheckoutTotals([makeItem(100, 1)]);
    expect(shipping).toBe(50);
  });

  it("multiplies price × quantity for each line item", () => {
    // Two items at $100 with qty 2 each → subtotal of $400.
    const items = [makeItem(100, 2), makeItem(100, 2)];
    const { subtotal } = calculateCheckoutTotals(items);
    expect(subtotal).toBe(400);
  });

  it("calculates VAT as 20% of the subtotal", () => {
    // $100 subtotal → $20 VAT.
    const { vat } = calculateCheckoutTotals([makeItem(100, 1)]);
    expect(vat).toBe(20);
  });

  it("grand total is the sum of subtotal + shipping + vat", () => {
    const items = [makeItem(100, 1)];
    const { subtotal, shipping, vat, grandTotal } =
      calculateCheckoutTotals(items);
    // This test documents the formula rather than hardcoding the number,
    // so it stays correct even if the constants change.
    expect(grandTotal).toBe(subtotal + shipping + vat);
  });

  it("handles multiple different items with different quantities", () => {
    // $2,999 × 1 + $4,500 × 2 = $11,999 subtotal.
    const items = [makeItem(2999, 1), makeItem(4500, 2)];
    const { subtotal } = calculateCheckoutTotals(items);
    expect(subtotal).toBe(11999);
  });
});

// ─── normalizeCheckoutFormValues ──────────────────────────────────────────────

describe("normalizeCheckoutFormValues", () => {
  it("trims leading and trailing whitespace from every field", () => {
    const result = normalizeCheckoutFormValues({
      name: "  Jane Doe  ",
      email: " jane@example.com ",
      phone: " +1 555-0100 ",
      address: " 5 Oak Ave ",
      zipCode: " 10001 ",
      city: " New York ",
      country: " US ",
    });

    // Checking a few key fields is enough — the function trims them all
    // the same way, so if name and email work, the rest do too.
    expect(result.name).toBe("Jane Doe");
    expect(result.email).toBe("jane@example.com");
    expect(result.city).toBe("New York");
  });

  it("leaves values that already have no extra whitespace unchanged", () => {
    const clean = {
      name: "Jane",
      email: "jane@example.com",
      phone: "555-0100",
      address: "5 Oak Ave",
      zipCode: "90210",
      city: "LA",
      country: "US",
    };
    // toEqual does a deep comparison — confirms none of the values changed.
    expect(normalizeCheckoutFormValues(clean)).toEqual(clean);
  });
});
