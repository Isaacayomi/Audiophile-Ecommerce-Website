"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { formatPrice } from "@/app/lib/checkout";
import { PersistedOrder } from "@/app/lib/orders";
import { completeCheckout } from "@/app/store/uiState/cartValueslice";

const SuccessClient = ({ order }: { order: PersistedOrder | null }) => {
  const dispatch = useDispatch();
  const hasClearedCart = useRef(false);

  useEffect(() => {
    // The success page is the safest place to clear cart state after Stripe sends the shopper back.
    if (hasClearedCart.current) {
      return;
    }

    dispatch(completeCheckout());
    hasClearedCart.current = true;
    toast.success("Payment completed successfully.");
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-140 rounded-lg bg-white px-6 py-10 shadow-panel md:px-12 md:py-14">
      <div className="mb-8">
        <p className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
          Payment Complete
        </p>
        <h1 className="mb-6 text-heading-md font-bold uppercase tracking-copy text-black md:text-heading-lg">
          Thank you for your order
        </h1>
        <p className="max-w-110 text-copy leading-copy font-medium text-black/50">
          {order
            ? `Stripe confirmed your payment for ${order.customerEmail}. Your order was persisted on the server and is ready for the next fulfillment step.`
            : "Stripe sent you back successfully, but the webhook-backed order record is not available yet. This can happen briefly if Stripe has not finished delivering the event."}
        </p>
      </div>

      {/* When the webhook record exists, we show the saved order summary instead of a generic success state. */}
      {order ? (
        <div className="mb-8 rounded-lg bg-surface p-6">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <p className="text-copy font-bold text-black">{order.customerName}</p>
              <p className="mt-1 text-copy text-black/50">{order.customerEmail}</p>
              <p className="mt-1 text-copy text-black/50">{order.customerPhone}</p>
            </div>
            <div className="text-right">
              <p className="text-copy font-bold uppercase text-black">
                {formatPrice(order.amountTotal)}
              </p>
              <p className="mt-1 text-copy text-black/50">
                Session: {order.sessionId}
              </p>
            </div>
          </div>

          <div className="mb-6 border-t border-line pt-6">
            <p className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
              Items
            </p>
            <div className="grid gap-4">
              {order.items.map((item) => (
                <div
                  key={`${item.name}-${item.quantity}`}
                  className="flex items-center gap-4"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-white" />
                  )}
                  <div className="flex-1">
                    <p className="text-copy font-bold text-black">{item.name}</p>
                    <p className="text-overline font-bold text-black/50">
                      {formatPrice(item.unitAmount)}
                    </p>
                  </div>
                  <p className="text-copy font-bold text-black/50">
                    x{item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2 border-t border-line pt-6">
            <div className="flex items-center justify-between">
              <p className="text-copy uppercase text-black/50">Subtotal</p>
              <p className="text-title font-bold text-black">
                {formatPrice(order.subtotal)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-copy uppercase text-black/50">Shipping</p>
              <p className="text-title font-bold text-black">
                {formatPrice(order.shippingAmount)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-copy uppercase text-black/50">Total</p>
              <p className="text-title font-bold text-brand">
                {formatPrice(order.amountTotal)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
        >
          Back to home
        </Link>
        {order ? (
          <p className="inline-flex h-12 items-center text-copy font-medium text-black/50">
            Deliver to: {order.shippingAddress}, {order.shippingCity},{" "}
            {order.shippingCountry}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default SuccessClient;
