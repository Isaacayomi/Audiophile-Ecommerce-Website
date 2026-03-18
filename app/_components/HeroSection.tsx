import Link from "next/link";
import NavMenu from "./ui/navMenu";

const HeroSection = () => {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-[#101010]
        bg-[url('/assets/home/hero-mobile.jpg')]
        bg-no-repeat
        bg-[length:375px_auto]
        bg-[position:center_top]
        mb-[40px]
        min-h-[600px]
        md:min-h-[729px]
        md:bg-[url('/assets/home/hero-tablet.jpg')]
        md:bg-[length:768px_auto]
        md:bg-[position:center_top]
        lg:mb-[120px]
        lg:min-h-[632px]
        lg:bg-[url('/assets/home/hero-desktop.jpg')]
        lg:bg-[length:auto_100%]
        lg:bg-[position:right_center]
      "
    >
      <div className="mx-auto w-[328px] pt-[108px] pb-[112px] text-center md:w-[379px] md:pt-[126px] md:pb-[167px] lg:mx-auto lg:flex lg:min-h-[632px] lg:max-w-[1110px] lg:items-center lg:py-0 lg:text-left">
        <div className="relative z-10 lg:w-[379px]">
          <p className="pb-4 text-[14px] tracking-[10px] text-white/50 md:pb-6">
            NEW PRODUCT
          </p>

          <h1 className="pb-6 text-[36px] font-bold uppercase tracking-[1.29px] text-white md:text-[56px] md:leading-[58px] md:tracking-[2px]">
            XX99 Mark II Headphones
          </h1>

          <p className="pb-7 text-[15px] leading-[25px] font-medium text-white/75 md:pb-10 lg:w-[349px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <Link
            href="/headphones"
            className="inline-flex h-12 w-[160px] items-center justify-center bg-[#D87D4A] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
          >
            See Product
          </Link>
        </div>
      </div>

      <section className="relative z-0 bg-white">
        <NavMenu absolute={false} />
      </section>
    </div>
  );
};

export default HeroSection;
