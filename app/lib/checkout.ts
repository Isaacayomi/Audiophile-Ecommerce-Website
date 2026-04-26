import { CartItem } from "../type";

export type CheckoutFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
};

export const SHIPPING_COST = 50;
export const VAT_RATE = 0.2;

// Shared formatter keeps cart, checkout, and post-payment messaging consistent.
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

// This helper centralizes cart math so both the client UI and Stripe session use the same totals.
export const calculateCheckoutTotals = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
  const vat = Math.round(subtotal * VAT_RATE);

  return {
    subtotal,
    shipping,
    vat,
    grandTotal: subtotal + shipping + vat,
  };
};

export const getCartStockViolationMessage = (
  cartItems: CartItem[],
  stockBySlug?: Record<string, number | undefined>,
) => {
  const violatingItem = cartItems.find(
    (item) => {
      const liveStock = stockBySlug?.[item.slug];
      const resolvedStock =
        typeof liveStock === "number" && Number.isFinite(liveStock)
          ? liveStock
          : item.stock;

      return typeof resolvedStock === "number" && item.quantity > resolvedStock;
    },
  );

  if (!violatingItem) {
    return null;
  }

  const liveStock = stockBySlug?.[violatingItem.slug];
  const resolvedStock =
    typeof liveStock === "number" && Number.isFinite(liveStock)
      ? liveStock
      : violatingItem.stock;

  if (typeof resolvedStock !== "number") {
    return null;
  }

  const stockLabel = resolvedStock === 1 ? "unit" : "units";

  return `${violatingItem.shortName} has only ${resolvedStock} ${stockLabel} in stock. Reduce your quantity to ${resolvedStock} or less.`;
};

// Lightweight trimming keeps payload values predictable before validation or Stripe metadata storage.
export const normalizeCheckoutFormValues = (
  values: CheckoutFormValues,
): CheckoutFormValues => ({
  name: values.name.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  address: values.address.trim(),
  zipCode: values.zipCode.trim(),
  city: values.city.trim(),
  country: values.country.trim(),
});
