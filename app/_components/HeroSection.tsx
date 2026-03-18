import Link from "next/link";
import CategoryCards from "./CategoryCards";

const HeroSection = () => {
  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          bg-[#101010]
          bg-[url('/assets/home/mobile/image-header.jpg')]
          bg-no-repeat
          bg-[length:375px_auto]
          bg-[position:center_top]
          min-h-[600px]
          md:min-h-[729px]
          md:bg-[url('/assets/home/tablet/image-header.jpg')]
          md:bg-[length:768px_auto]
          md:bg-[position:center_top]
          lg:min-h-[632px]
          lg:bg-[url('/assets/home/desktop/image-hero.jpg')]
          lg:bg-[length:1440px_729px]
          lg:bg-[position:center_-97px]
        "
      >
        <div className="mx-auto w-[328px] pt-[108px] pb-[112px] text-center md:w-[379px] md:pt-[126px] md:pb-[167px] lg:max-w-[1110px] lg:py-0 lg:text-left">
          {/* Keep the desktop copy in a fixed-width column so the background crop lines up with the product artwork. */}
          <div className="relative z-10 lg:flex lg:min-h-[632px] lg:items-center">
            <div className="lg:w-[398px]">
              <p className="pb-4 text-[14px] tracking-[10px] text-white/50 md:pb-6">
                NEW PRODUCT
              </p>

              <h1 className="pb-6 text-[36px] font-bold uppercase tracking-[1.29px] text-white md:text-[56px] md:leading-[58px] md:tracking-[2px]">
                XX99 Mark II Headphones
              </h1>

              <p className="pb-7 text-[15px] font-medium leading-[25px] text-white/75 md:pb-10 lg:w-[349px]">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>

              <Link
                href="/headphones/xx99-mark-two-headphones"
                className="inline-flex h-12 w-[160px] items-center justify-center bg-[#D87D4A] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <CategoryCards className="pb-[120px] pt-[92px] md:pb-[96px] md:pt-[148px] lg:pb-[168px] lg:pt-[120px]" />
      </section>
    </>
  );
};

export default HeroSection;
