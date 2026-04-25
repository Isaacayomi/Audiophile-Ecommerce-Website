"use client";

import { RhythmGroup, RhythmItem } from "./ui/Rhythm";
import { Product } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  addToCartValue,
  decreaseValue,
  increaseValue,
} from "../store/uiState/cartValueslice";
import { toast } from "react-hot-toast";

const getCartImageSource = (product: Product) =>
  product.image ||
  product.productImage.desktop ||
  product.categoryImage.desktop ||
  `/assets/cart/image-${product.slug}.jpg`;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const ProductPurchaseCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Read the "picker" quantity from Redux; fallback keeps UI stable during slice transitions.
  const quantity = useSelector(
    (state: RootState) => state.cartValue.selectedValue ?? 1,
  );
  const cartQuantityForProduct = useSelector(
    (state: RootState) =>
      state.cartValue.items.find((item) => item.slug === product.slug)?.quantity ?? 0,
  );
  const stock = product.stock;
  const remainingStock =
    typeof stock === "number" ? Math.max(0, stock - cartQuantityForProduct) : null;
  const isLowStock = typeof stock === "number" && stock > 0 && stock < 10;
  const isOutOfStock = typeof stock === "number" && remainingStock === 0;

  return (
    <RhythmGroup
      className="mx-auto max-w-143 py-8 md:py-13 lg:mx-0 lg:max-w-111.25 lg:py-0"
      inView={false}
    >
      {product.isNew ? (
        <RhythmItem variant="soft">
          <p className="mb-6 text-overline uppercase tracking-overline text-brand">
            New Product
          </p>
        </RhythmItem>
      ) : null}

      <RhythmItem>
        <h1 className="mb-6 text-heading-md leading-heading font-bold uppercase tracking-copy text-black md:text-heading-lg md:leading-display md:tracking-title">
          {product.name}
        </h1>
      </RhythmItem>

      <RhythmItem>
        <p className="mb-6 text-copy leading-copy font-medium text-black/50 md:mb-8">
          {product.description}
        </p>
      </RhythmItem>

      <RhythmItem variant="soft">
        <p className="mb-7.75 text-title font-bold tracking-heading text-black">
          {formatPrice(product.price)}
        </p>
      </RhythmItem>

      {isLowStock ? (
        <RhythmItem variant="soft">
          <div className="mb-6 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Low stock
          </div>
        </RhythmItem>
      ) : null}

      {isOutOfStock ? (
        <RhythmItem variant="soft">
          <p className="mb-4 text-copy font-semibold text-rose-600">
            All available units are already in your cart.
          </p>
        </RhythmItem>
      ) : null}

      <RhythmItem variant="pop">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-30 items-center justify-between bg-surface px-4 text-label font-bold text-black">
            {/* Keep quantity from going below one so the CTA always represents a valid cart action. */}
            <button
              type="button"
              className="cursor-pointer text-black/25 transition-colors hover:text-brand"
              onClick={() => dispatch(decreaseValue())}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              className="cursor-pointer text-black/25 transition-colors hover:text-brand"
              onClick={() => {
                if (typeof remainingStock === "number" && quantity >= remainingStock) {
                  toast.error(
                    remainingStock <= 0
                      ? "This item is out of stock."
                      : `Only ${remainingStock} available to add.`,
                  );
                  return;
                }

                dispatch(increaseValue());
              }}
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (typeof remainingStock === "number" && remainingStock <= 0) {
                toast.error("This item is out of stock.");
                return;
              }

              // Commit the currently selected quantity into the persisted cart total.
              dispatch(
                addToCartValue({
                  slug: product.slug,
                  name: product.name,
                  shortName: product.shortName,
                  price: product.price,
                  image: getCartImageSource(product),
                  quantity,
                  stock,
                }),
              );

              const quantityAdded =
                typeof remainingStock === "number"
                  ? Math.min(quantity, remainingStock)
                  : quantity;

              if (quantityAdded > 0) {
                // Immediate UX feedback for a successful add-to-cart action.
                toast.success(
                  quantityAdded === quantity
                    ? "Added to cart"
                    : `Added ${quantityAdded} to cart`,
                );
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </RhythmItem>
    </RhythmGroup>
  );
};

export default ProductPurchaseCard;
