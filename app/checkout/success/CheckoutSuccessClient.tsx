"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RhythmGroup, RhythmItem } from "@/app/_components/ui/Rhythm";
import { calculateCheckoutTotals, formatPrice } from "@/app/lib/checkout";
import {
  CART_STORAGE_KEY,
  hydrateCartValue,
} from "@/app/store/uiState/cartValueslice";
import type { CartItem, cartValueState } from "@/app/type";

const EMPTY_CART: cartValueState = {
  value: 0,
  selectedValue: 1,
  items: [],
};

const STATUS_STEPS = [
  "Order Confirmed",
  "Being Prepared",
  "Delivered",
] as const;

const CheckoutSuccessClient = () => {
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);

  // Read directly from localStorage rather than waiting for Redux to hydrate — avoids a timing
  // gap where the effect fires before CartPersistence has dispatched hydrateCartValue.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (
        parsed &&
        typeof parsed === "object" &&
        "items" in parsed &&
        Array.isArray((parsed as { items: unknown }).items) &&
        (parsed as cartValueState).items.length > 0
      ) {
        setOrderItems((parsed as cartValueState).items);
        dispatch(hydrateCartValue(EMPTY_CART));
      }
    } catch {
      // localStorage unavailable or data is corrupt — show fallback
    }
  }, [dispatch]);

  const hasOrderItems = orderItems.length > 0;
  const totals = hasOrderItems ? calculateCheckoutTotals(orderItems) : null;
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-10 md:px-10 md:py-16 lg:px-41.25 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <RhythmGroup inView={false} className="grid gap-6">
          {/* Hero confirmation card */}
          <RhythmItem variant="pop">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              <div className="h-1 bg-brand" />

              <div className="px-8 pt-10 pb-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
                  <Image
                    src="/assets/checkout/icon-order-confirmation.svg"
                    width={40}
                    height={40}
                    alt="Order confirmed"
                  />
                </div>
                <p className="mb-2 text-overline font-bold uppercase tracking-overline text-brand">
                  Order confirmed
                </p>
                <h1 className="text-heading-sm font-bold uppercase tracking-heading text-black md:text-4xl md:tracking-title">
                  Thank you for your order
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-copy leading-copy font-medium text-black/50">
                  We&apos;ve received your order and are getting it ready. You&apos;ll
                  receive an email confirmation shortly.
                </p>
              </div>

              {/* Status tracker */}
              <div className="border-t border-line/60 px-8 py-6">
                <div className="flex items-start">
                  {STATUS_STEPS.map((label, i) => {
                    const isLast = i === STATUS_STEPS.length - 1;

                    return (
                      <div key={label} className="flex flex-1 flex-col items-center">
                        <div className="flex w-full items-center">
                          {i > 0 && (
                            <div className="h-px flex-1 bg-brand" />
                          )}
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                            ✓
                          </div>
                          {!isLast && (
                            <div className="h-px flex-1 bg-brand" />
                          )}
                        </div>
                        <p className="mt-2 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-black">
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RhythmItem>

          {/* Order summary */}
          <RhythmItem variant="rise">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <div className="px-8 py-6">
                <h2 className="text-title font-bold uppercase tracking-heading text-black">
                  Order Summary
                </h2>
                <p className="mt-1 text-copy leading-copy font-medium text-black/50">
                  {hasOrderItems
                    ? `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""} ordered`
                    : "Your order has been received successfully."}
                </p>
              </div>

              {hasOrderItems ? (
                <>
                  <div className="space-y-5 border-t border-line/60 px-8 py-6">
                    {orderItems.map((item) => (
                      <div key={item.slug} className="flex items-center gap-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-copy font-bold text-black">
                            {item.shortName}
                          </p>
                          <p className="text-overline font-bold text-black/50">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-copy font-bold text-black/40">
                            ×{item.quantity}
                          </p>
                          <p className="text-copy font-bold text-black">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totals && (
                    <div className="space-y-3 border-t border-line/60 bg-surface px-8 py-6">
                      <div className="flex justify-between text-copy font-medium">
                        <span className="text-black/50">Subtotal</span>
                        <span className="font-bold text-black">
                          {formatPrice(totals.subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-copy font-medium">
                        <span className="text-black/50">Shipping</span>
                        <span className="font-bold text-black">
                          {formatPrice(totals.shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between text-copy font-medium">
                        <span className="text-black/50">VAT (20%)</span>
                        <span className="font-bold text-black">
                          {formatPrice(totals.vat)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-line/60 pt-4">
                        <span className="text-copy font-bold uppercase tracking-heading text-black">
                          Grand Total
                        </span>
                        <span className="text-title font-bold text-brand">
                          {formatPrice(totals.grandTotal)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="border-t border-line/60 px-8 py-6">
                  <div className="rounded-xl border border-line/60 bg-surface px-5 py-4">
                    <p className="text-copy leading-copy font-medium text-black/60">
                      We could not load the item list, but your order has been
                      received and you&apos;ll get an email confirmation shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </RhythmItem>

          {/* CTA buttons */}
          <RhythmItem>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
              >
                Back to Home
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center border border-line bg-white text-label font-bold uppercase tracking-copy text-black transition-colors hover:border-brand hover:text-brand"
              >
                Continue Shopping
              </Link>
            </div>
          </RhythmItem>
        </RhythmGroup>
      </div>
    </main>
  );
};

export default CheckoutSuccessClient;
