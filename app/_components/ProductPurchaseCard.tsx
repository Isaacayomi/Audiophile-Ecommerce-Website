"use client";

import { useState } from "react";
import { Product } from "../lib/products";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const ProductPurchaseCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mx-auto max-w-143 py-8 md:py-13 lg:mx-0 lg:max-w-111.25 lg:py-0">
      {product.isNew ? (
        <p className="mb-6 text-overline uppercase tracking-overline text-brand">
          New Product
        </p>
      ) : null}

      <h1 className="mb-6 text-heading-md leading-heading font-bold uppercase tracking-copy text-black md:text-heading-lg md:leading-display md:tracking-title">
        {product.name}
      </h1>

      <p className="mb-6 text-copy leading-copy font-medium text-black/50 md:mb-8">
        {product.description}
      </p>

      <p className="mb-7.75 text-title font-bold tracking-heading text-black">
        {formatPrice(product.price)}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-30 items-center justify-between bg-surface px-4 text-label font-bold text-black">
          {/* Keep quantity from going below one so the CTA always represents a valid cart action. */}
          <button
            type="button"
            className="cursor-pointer text-black/25 transition-colors hover:text-brand"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="cursor-pointer text-black/25 transition-colors hover:text-brand"
            onClick={() => setQuantity((current) => current + 1)}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPurchaseCard;
