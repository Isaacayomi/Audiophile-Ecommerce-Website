import Image from "next/image";
import Link from "next/link";
import { RhythmGroup, RhythmItem } from "../_components/ui/Rhythm";

const CheckoutPage = () => {
  return (
    <div className="bg-neutral-100 px-6 py-4 md:px-10 md:py-12 lg:px-41.25 lg:py-19.75">
      <RhythmGroup inView={false}>
        <RhythmItem variant="soft">
          <Link
            href="/"
            className="mb-6 inline-block text-copy leading-copy font-medium text-black/50 transition-colors hover:text-brand md:mb-9.5"
          >
            Go Back
          </Link>
        </RhythmItem>
      </RhythmGroup>

      <RhythmGroup className="lg:grid lg:grid-cols-checkout lg:items-start lg:gap-7.5">
        <RhythmItem className="rounded-lg bg-white px-6 py-8 md:px-7 md:py-7.5 lg:px-12 lg:py-13.5">
          <h1 className="mb-8 text-heading-md font-bold uppercase tracking-copy text-black md:text-4xl md:tracking-title">
            Checkout
          </h1>

          <div className="grid gap-8">
            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
                Billing details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  Name
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="Alexei Ward" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  Email Address
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="alexei@mail.com" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black md:col-span-2 lg:col-span-1">
                  Phone Number
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="+1 202-555-0136" />
                </label>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
                Shipping info
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black md:col-span-2">
                  Address
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="1137 Williams Avenue" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  ZIP Code
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="10001" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  City
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="New York" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  Country
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="United States" />
                </label>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-copy text-brand">
                Payment details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <p className="text-xs font-bold tracking-tight text-black">
                  Payment Method
                </p>
                <div className="grid gap-4">
                  <label className="flex h-14 items-center gap-4 rounded-lg border border-brand px-4 text-overline font-bold text-black">
                    <span className="h-5 w-5 rounded-full border border-line p-1">
                      <span className="block h-full w-full rounded-full bg-brand"></span>
                    </span>
                    e-Money
                  </label>
                  <label className="flex h-14 items-center gap-4 rounded-lg border border-line px-4 text-overline font-bold text-black">
                    <span className="h-5 w-5 rounded-full border border-line"></span>
                    Cash on Delivery
                  </label>
                </div>

                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  e-Money Number
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="238521993" />
                </label>
                <label className="grid gap-2.25 text-xs font-bold tracking-tight text-black">
                  e-Money PIN
                  <input className="h-14 rounded-lg border border-line px-6 text-overline outline-none transition-colors focus:border-brand" placeholder="6891" />
                </label>
              </div>

              <div className="mt-8 flex gap-8 rounded-lg bg-surface-muted p-6 md:items-center">
                <Image
                  src="/assets/checkout/icon-cash-on-delivery.svg"
                  alt=""
                  width={48}
                  height={48}
                />
                <p className="text-copy leading-copy font-medium text-black/50">
                  The Cash on Delivery option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            </div>
          </div>
        </RhythmItem>

        <RhythmItem className="mt-8 rounded-lg bg-white px-6 py-8 md:px-8 lg:mt-0" variant="pop">
          <h2 className="mb-7.75 text-title font-bold uppercase tracking-heading text-black">
            Summary
          </h2>

          <div className="grid gap-6">
            {[
              {
                name: "XX99 MK II",
                price: "$ 2,999",
                quantity: "x1",
                image: "/assets/cart/image-xx99-mark-two-headphones.jpg",
              },
              {
                name: "XX59",
                price: "$ 899",
                quantity: "x1",
                image: "/assets/cart/image-xx59-headphones.jpg",
              },
              {
                name: "YX1",
                price: "$ 599",
                quantity: "x1",
                image: "/assets/cart/image-yx1-earphones.jpg",
              },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-copy font-bold text-black">{item.name}</p>
                  <p className="text-overline font-bold text-black/50">
                    {item.price}
                  </p>
                </div>
                <p className="text-copy font-bold text-black/50">
                  {item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-2">
            {[
              ["Total", "$ 4,497"],
              ["Shipping", "$ 50"],
              ["VAT (Included)", "$ 1,079"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <p className="text-copy uppercase text-black/50">{label}</p>
                <p className="text-title font-bold text-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-copy uppercase text-black/50">Grand Total</p>
            <p className="text-title font-bold text-brand">$ 5,626</p>
          </div>

          <button
            type="button"
            className="mt-8 inline-flex h-12 w-full items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
          >
            Continue &amp; Pay
          </button>
        </RhythmItem>
      </RhythmGroup>
    </div>
  );
};

export default CheckoutPage;
