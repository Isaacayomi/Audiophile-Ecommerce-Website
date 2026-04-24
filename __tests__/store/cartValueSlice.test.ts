// Tests for the cart Redux slice (app/store/uiState/cartValueslice.ts).
//
// How Redux reducer tests work: a Redux reducer is just a plain function —
// it takes (currentState, action) and returns the next state. We call it
// directly without mounting any React component. No DOM, no network.
//
// Pattern for every test:
//   const nextState = reducer(startingState, someAction());
//   expect(nextState.someField).toBe(expectedValue);

// react-hot-toast is mocked so calling toast.success() inside removeAllCartItems
// doesn't try to access DOM APIs that aren't wired up in the test environment.
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

import reducer, {
  increaseValue,
  decreaseValue,
  addToCartValue,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  removeAllCartItems,
  hydrateCartValue,
} from "@/app/store/uiState/cartValueslice";
import type { cartValueState } from "@/app/type";

// ─── shared fixtures ──────────────────────────────────────────────────────────

// The blank slate we start from in most tests.
const emptyState: cartValueState = {
  value: 0,
  selectedValue: 1,
  items: [],
};

// A minimal product payload — matches exactly what addToCartValue expects.
const headphones = {
  slug: "xx99-mark-ii-headphones",
  name: "XX99 Mark II Headphones",
  shortName: "XX99 MK II",
  price: 2999,
  image: "/assets/xx99.jpg",
  quantity: 1,
};

const earphones = {
  slug: "yx1-wireless-earphones",
  name: "YX1 Wireless Earphones",
  shortName: "YX1",
  price: 599,
  image: "/assets/yx1.jpg",
  quantity: 1,
};

// ─── quantity picker (the +/- on the product page) ───────────────────────────

describe("quantity picker", () => {
  it("increaseValue raises selectedValue by 1", () => {
    const next = reducer(emptyState, increaseValue());
    expect(next.selectedValue).toBe(2);
  });

  it("increaseValue can be called multiple times", () => {
    let state = reducer(emptyState, increaseValue());
    state = reducer(state, increaseValue());
    expect(state.selectedValue).toBe(3);
  });

  it("decreaseValue lowers selectedValue by 1", () => {
    const with2 = { ...emptyState, selectedValue: 2 };
    const next = reducer(with2, decreaseValue());
    expect(next.selectedValue).toBe(1);
  });

  it("decreaseValue never lets selectedValue fall below 1", () => {
    // Prevents the quantity picker from showing 0 or a negative number.
    const next = reducer(emptyState, decreaseValue());
    expect(next.selectedValue).toBe(1);
  });
});

// ─── adding items to the cart ─────────────────────────────────────────────────

describe("addToCartValue", () => {
  it("adds a new product line when the cart is empty", () => {
    const next = reducer(emptyState, addToCartValue(headphones));

    // items[] should have exactly one entry.
    expect(next.items).toHaveLength(1);
    // value is the global badge count visible in the header.
    expect(next.value).toBe(1);
  });

  it("stores the correct slug and price on the new line item", () => {
    const next = reducer(emptyState, addToCartValue(headphones));
    const item = next.items[0];
    expect(item.slug).toBe(headphones.slug);
    expect(item.price).toBe(headphones.price);
  });

  it("merges quantity into an existing line instead of adding a second row", () => {
    // Clicking "add to cart" twice for the same product should produce one row
    // with quantity 2, not two separate rows.
    let state = reducer(emptyState, addToCartValue(headphones));
    state = reducer(state, addToCartValue(headphones));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.value).toBe(2);
  });

  it("keeps separate rows for different products", () => {
    let state = reducer(emptyState, addToCartValue(headphones));
    state = reducer(state, addToCartValue(earphones));

    expect(state.items).toHaveLength(2);
    expect(state.value).toBe(2);
  });

  it("resets selectedValue back to 1 after adding", () => {
    // The picker should return to 1 so the next product starts fresh.
    const stateWith3 = { ...emptyState, selectedValue: 3 };
    const next = reducer(stateWith3, addToCartValue(headphones));
    expect(next.selectedValue).toBe(1);
  });

  it("adds the chosen quantity, not always 1", () => {
    // If the user picked qty 3 before clicking "add to cart", all 3 should land.
    const next = reducer(
      emptyState,
      addToCartValue({ ...headphones, quantity: 3 }),
    );
    expect(next.items[0].quantity).toBe(3);
    expect(next.value).toBe(3);
  });
});

// ─── adjusting quantities from inside the cart modal ─────────────────────────

describe("increaseCartItemQuantity", () => {
  it("bumps that item's quantity by 1", () => {
    const withItem = reducer(emptyState, addToCartValue(headphones));
    const next = reducer(withItem, increaseCartItemQuantity(headphones.slug));

    expect(next.items[0].quantity).toBe(2);
  });

  it("also increments the global badge count", () => {
    const withItem = reducer(emptyState, addToCartValue(headphones));
    const next = reducer(withItem, increaseCartItemQuantity(headphones.slug));

    expect(next.value).toBe(2);
  });

  it("is a no-op when the slug doesn't exist in the cart", () => {
    // Guards against corrupted state if an action arrives for a missing item.
    const next = reducer(emptyState, increaseCartItemQuantity("ghost-slug"));
    expect(next).toEqual(emptyState);
  });
});

describe("decreaseCartItemQuantity", () => {
  it("decrements the item's quantity by 1", () => {
    // Start with quantity 2.
    const withQty2 = reducer(
      emptyState,
      addToCartValue({ ...headphones, quantity: 2 }),
    );
    const next = reducer(
      withQty2,
      decreaseCartItemQuantity(headphones.slug),
    );
    expect(next.items[0].quantity).toBe(1);
  });

  it("removes the row entirely when quantity reaches zero", () => {
    // Decrementing a qty-1 item should remove it from the cart completely.
    const withItem = reducer(emptyState, addToCartValue(headphones));
    const next = reducer(withItem, decreaseCartItemQuantity(headphones.slug));

    expect(next.items).toHaveLength(0);
    expect(next.value).toBe(0);
  });

  it("is a no-op for an unknown slug", () => {
    const next = reducer(emptyState, decreaseCartItemQuantity("ghost-slug"));
    expect(next).toEqual(emptyState);
  });
});

// ─── removing items ───────────────────────────────────────────────────────────

describe("removeCartItem", () => {
  it("removes the matching item from the list", () => {
    let state = reducer(emptyState, addToCartValue(headphones));
    state = reducer(state, addToCartValue(earphones));
    state = reducer(state, removeCartItem(headphones.slug));

    // Only the earphones should remain.
    expect(state.items).toHaveLength(1);
    expect(state.items[0].slug).toBe(earphones.slug);
  });

  it("subtracts the item's full quantity from the badge count", () => {
    // An item with qty 3 should reduce the badge by 3, not by 1.
    let state = reducer(
      emptyState,
      addToCartValue({ ...headphones, quantity: 3 }),
    );
    state = reducer(state, removeCartItem(headphones.slug));
    expect(state.value).toBe(0);
  });
});

describe("removeAllCartItems", () => {
  it("clears every item and resets the badge to zero", () => {
    let state = reducer(emptyState, addToCartValue(headphones));
    state = reducer(state, addToCartValue(earphones));
    state = reducer(state, removeAllCartItems());

    expect(state.items).toHaveLength(0);
    expect(state.value).toBe(0);
  });

  it("also resets selectedValue to 1", () => {
    // Ensures the quantity picker is clean for the next session.
    const stateWithPicker = { ...emptyState, selectedValue: 5 };
    const next = reducer(stateWithPicker, removeAllCartItems());
    expect(next.selectedValue).toBe(1);
  });
});

// ─── hydrateCartValue (localStorage restore) ──────────────────────────────────

describe("hydrateCartValue", () => {
  it("replaces the entire state with the saved snapshot", () => {
    // This action fires on page load to restore the cart from localStorage.
    const saved: cartValueState = {
      value: 2,
      selectedValue: 1,
      items: [{ ...headphones, quantity: 2 }],
    };
    const next = reducer(emptyState, hydrateCartValue(saved));

    expect(next.value).toBe(2);
    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(2);
  });

  it("falls back to selectedValue 1 when the saved snapshot omits it", () => {
    // Older localStorage payloads may not have this field.
    const saved = { value: 0, items: [] } as unknown as cartValueState;
    const next = reducer(emptyState, hydrateCartValue(saved));
    expect(next.selectedValue).toBe(1);
  });
});
