import Image from "next/image";
import Link from "next/link";

const CheckoutPage = () => {
  return (
    <div className="bg-[#F2F2F2] px-6 py-4 md:px-10 md:py-12 lg:px-[165px] lg:py-[79px]">
      <Link
        href="/"
        className="mb-6 inline-block text-[15px] leading-[25px] font-medium text-black/50 transition-colors hover:text-[#D87D4A] md:mb-[38px]"
      >
        Go Back
      </Link>

      <div className="lg:grid lg:grid-cols-[730px_350px] lg:items-start lg:gap-[30px]">
        <section className="rounded-lg bg-white px-6 py-8 md:px-7 md:py-[30px] lg:px-12 lg:py-[54px]">
          <h1 className="mb-8 text-[28px] font-bold uppercase tracking-[1px] text-black md:text-[32px] md:tracking-[1.14px]">
            Checkout
          </h1>

          <div className="grid gap-8">
            <div>
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.93px] text-[#D87D4A]">
                Billing details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  Name
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="Alexei Ward" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  Email Address
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="alexei@mail.com" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black md:col-span-2 lg:col-span-1">
                  Phone Number
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="+1 202-555-0136" />
                </label>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.93px] text-[#D87D4A]">
                Shipping info
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black md:col-span-2">
                  Address
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="1137 Williams Avenue" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  ZIP Code
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="10001" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  City
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="New York" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  Country
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="United States" />
                </label>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.93px] text-[#D87D4A]">
                Payment details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <p className="text-[12px] font-bold tracking-[-0.21px] text-black">
                  Payment Method
                </p>
                <div className="grid gap-4">
                  <label className="flex h-14 items-center gap-4 rounded-lg border border-[#D87D4A] px-4 text-[14px] font-bold text-black">
                    <span className="h-5 w-5 rounded-full border border-[#CFCFCF] p-1">
                      <span className="block h-full w-full rounded-full bg-[#D87D4A]"></span>
                    </span>
                    e-Money
                  </label>
                  <label className="flex h-14 items-center gap-4 rounded-lg border border-[#CFCFCF] px-4 text-[14px] font-bold text-black">
                    <span className="h-5 w-5 rounded-full border border-[#CFCFCF]"></span>
                    Cash on Delivery
                  </label>
                </div>

                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  e-Money Number
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="238521993" />
                </label>
                <label className="grid gap-[9px] text-[12px] font-bold tracking-[-0.21px] text-black">
                  e-Money PIN
                  <input className="h-14 rounded-lg border border-[#CFCFCF] px-6 text-[14px] outline-none transition-colors focus:border-[#D87D4A]" placeholder="6891" />
                </label>
              </div>

              <div className="mt-8 flex gap-8 rounded-lg bg-[#FAFAFA] p-6 md:items-center">
                <Image
                  src="/assets/checkout/icon-cash-on-delivery.svg"
                  alt=""
                  width={48}
                  height={48}
                />
                <p className="text-[15px] leading-[25px] font-medium text-black/50">
                  The Cash on Delivery option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="mt-8 rounded-lg bg-white px-6 py-8 md:px-8 lg:mt-0">
          <h2 className="mb-[31px] text-[18px] font-bold uppercase tracking-[1.29px] text-black">
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
                  <p className="text-[15px] font-bold text-black">{item.name}</p>
                  <p className="text-[14px] font-bold text-black/50">
                    {item.price}
                  </p>
                </div>
                <p className="text-[15px] font-bold text-black/50">
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
                <p className="text-[15px] uppercase text-black/50">{label}</p>
                <p className="text-[18px] font-bold text-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-[15px] uppercase text-black/50">Grand Total</p>
            <p className="text-[18px] font-bold text-[#D87D4A]">$ 5,626</p>
          </div>

          <button
            type="button"
            className="mt-8 inline-flex h-12 w-full items-center justify-center bg-[#D87D4A] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
          >
            Continue &amp; Pay
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
