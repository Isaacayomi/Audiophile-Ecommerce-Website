"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RhythmGroup, RhythmItem } from "../_components/ui/Rhythm";
import { API_BASE_URL } from "../lib/products";
import { RootState } from "../store/store";
import {
  calculateCheckoutTotals,
  CheckoutFormValues,
  formatPrice,
  normalizeCheckoutFormValues,
} from "../lib/checkout";

const getInputClassName = (hasError: boolean) =>
  `h-14 rounded-lg border px-6 text-overline outline-none transition-colors ${
    hasError
      ? "border-red-500 text-red-500 placeholder:text-red-300 focus:border-red-500"
      : "border-line text-black focus:border-brand"
  }`;

const CheckoutForm = () => {
  // Live Redux cart state powers the summary list and is sent to FastAPI when payment starts.
  const cartItems = useSelector((state: RootState) => state.cartValue.items);
  const [isRedirectingToCheckout, setIsRedirectingToCheckout] = useState(false);

  // Totals are derived once from the cart so the sidebar stays in sync with the current order.
  const { subtotal, shipping, vat, grandTotal } =
    calculateCheckoutTotals(cartItems);

  // React Hook Form manages field values, validation, and submit state for the customer details form.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
  });

  // Once the local form passes validation, the same payload is posted to FastAPI to create a Stripe session.
  const onSubmit = async (values: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsRedirectingToCheckout(true);

    try {
      const customer = normalizeCheckoutFormValues(values);

      const response = await fetch(
        `${API_BASE_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer,
            cartItems,
          }),
        },
      );

      const payload = (await response.json()) as {
        detail?: string;
        url?: string;
      };

      if (!response.ok || !payload.url) {
        throw new Error(
          payload.detail ?? "Unable to start Stripe checkout right now.",
        );
      }

      // Redirect the shopper to Stripe's hosted checkout page returned by the FastAPI backend.
      window.location.href = payload.url;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start Stripe checkout right now.";

      toast.error(message);
      setIsRedirectingToCheckout(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RhythmGroup className="lg:grid lg:grid-cols-checkout lg:items-start lg:gap-7.5">
        <RhythmItem className="rounded-lg bg-white px-6 py-8 md:px-7 md:py-7.5 lg:px-12 lg:py-13.5">
          <h1 className="mb-8 text-heading-md font-bold uppercase tracking-copy text-black md:text-4xl md:tracking-title">
            Checkout
          </h1>

          <div className="grid gap-8">
            {/* These customer fields are validated locally before the payment session request is sent to FastAPI. */}
            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
                Contact details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  <span className="flex items-center justify-between">
                    Name
                    {errors.name ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.name.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.name))}
                    placeholder="Alexei Ward"
                    {...register("name", {
                      required: "Required",
                      minLength: {
                        value: 2,
                        message: "Too short",
                      },
                    })}
                  />
                </label>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  <span className="flex items-center justify-between">
                    Email Address
                    {errors.email ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.email.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.email))}
                    placeholder="alexei@mail.com"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Wrong format",
                      },
                    })}
                  />
                </label>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black md:col-span-2 lg:col-span-1">
                  <span className="flex items-center justify-between">
                    Phone Number
                    {errors.phone ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.phone.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.phone))}
                    placeholder="+1 202-555-0136"
                    {...register("phone", {
                      required: "Required",
                      pattern: {
                        value: /^[0-9+\-\s()]{7,}$/,
                        message: "Wrong format",
                      },
                    })}
                  />
                </label>
              </div>
            </div>

            {/* Shipping fields stay in your app so the backend receives delivery details alongside the cart payload. */}
            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
                Shipping info
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black md:col-span-2">
                  <span className="flex items-center justify-between">
                    Address
                    {errors.address ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.address.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.address))}
                    placeholder="1137 Williams Avenue"
                    {...register("address", {
                      required: "Required",
                      minLength: {
                        value: 5,
                        message: "Too short",
                      },
                    })}
                  />
                </label>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  <span className="flex items-center justify-between">
                    ZIP Code
                    {errors.zipCode ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.zipCode.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.zipCode))}
                    placeholder="10001"
                    {...register("zipCode", {
                      required: "Required",
                      minLength: {
                        value: 3,
                        message: "Too short",
                      },
                    })}
                  />
                </label>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  <span className="flex items-center justify-between">
                    City
                    {errors.city ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.city.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.city))}
                    placeholder="New York"
                    {...register("city", {
                      required: "Required",
                    })}
                  />
                </label>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  <span className="flex items-center justify-between">
                    Country
                    {errors.country ? (
                      <span className="text-[11px] font-medium text-red-500">
                        {errors.country.message}
                      </span>
                    ) : null}
                  </span>
                  <input
                    className={getInputClassName(Boolean(errors.country))}
                    placeholder="United States"
                    {...register("country", {
                      required: "Required",
                    })}
                  />
                </label>
              </div>
            </div>
          </div>
        </RhythmItem>

        <RhythmItem
          className="mt-8 rounded-lg bg-white px-6 py-8 md:px-8 lg:mt-0"
          variant="pop"
        >
          <h2 className="mb-7.75 text-title font-bold uppercase tracking-heading text-black">
            Summary
          </h2>

          {/* Summary rows mirror the current cart so the order review matches the payload FastAPI sends to Stripe. */}
          {cartItems.length === 0 ? (
            <p className="text-copy leading-copy font-medium text-black/50">
              Your cart is empty.
            </p>
          ) : (
            <div className="grid gap-6">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-copy font-bold text-black">
                      {item.shortName}
                    </p>
                    <p className="text-overline font-bold text-black/50">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-copy font-bold text-black/50">
                    x{item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Totals are derived from cart state so the sidebar stays aligned with the backend checkout payload. */}
          <div className="mt-8 grid gap-2">
            {[
              ["Total", formatPrice(subtotal)],
              ["Shipping", formatPrice(shipping)],
              ["VAT (Included)", formatPrice(vat)],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <p className="text-copy uppercase text-black/50">{label}</p>
                <p className="text-title font-bold text-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-copy uppercase text-black/50">Grand Total</p>
            <p className="text-title font-bold text-brand">
              {formatPrice(grandTotal)}
            </p>
          </div>

          {/* The primary CTA validates the form, then starts Stripe Checkout through the FastAPI backend. */}
          <button
            type="submit"
            disabled={
              isSubmitting || isRedirectingToCheckout || cartItems.length === 0
            }
            className="mt-8 inline-flex h-12 w-full items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRedirectingToCheckout ? "Redirecting..." : "Continue & Pay"}
          </button>
        </RhythmItem>
      </RhythmGroup>
    </form>
  );
};

export default CheckoutForm;
