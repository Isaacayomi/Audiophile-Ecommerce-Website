"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RhythmGroup, RhythmItem } from "@/app/_components/ui/Rhythm";
import { hydrateCartValue } from "@/app/store/uiState/cartValueslice";
import type { cartValueState } from "@/app/type";

const EMPTY_CART: cartValueState = {
  value: 0,
  selectedValue: 1,
  items: [],
};

const CheckoutSuccessClient = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateCartValue(EMPTY_CART));
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-10 md:px-10 md:py-16 lg:px-41.25 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <RhythmGroup inView={false} className="grid gap-6">
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
            </div>
          </RhythmItem>

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
