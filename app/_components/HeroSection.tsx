import NavMenu from "./ui/navMenu";
import ModalButton from "./ui/modalButton";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="
        bg-black
        bg-[url('/assets/mobile-hero.png')]
        bg-no-repeat
        bg-[position:center_-60px]
        bg-[length:320px_auto]
        min-h-[600px]
        md:bg-[url('/assets/sample-tablet.png')]
        md:bg-[length:768px_auto]
        md:bg-[position:center_-112px]
        md:min-h-[900px]
        relative
        overflow-hidden
        mb-[40px]
        lg:min-h-[632px]
        lg:bg-[#101010]
        lg:bg-none
        lg:mb-[120px]
      "
    >
      {/* Circular trim for mobile using radial gradient */}
      <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle,transparent_65%,black_100%)]"></div>

      {/* Overlay only for tablet and above */}
      <div className="hidden md:block lg:hidden absolute inset-0 bg-[radial-gradient(circle,transparent_60%,black_100%)]"></div>

      {/* Hero content */}
      <div className="relative mx-auto lg:max-w-[1110px] lg:min-h-[632px]">
        <div className="w-[328px] md:w-[406px] lg:w-[379px] lg:h-[346px] mx-auto lg:mx-0 text-center lg:text-left pt-[108px] pb-[112px] md:pt-[126px] md:pb-[167px] lg:pt-[128px] lg:pb-0 relative z-10">
          <p className="pb-[16px] text-[14px] tracking-[10px] text-[#FFFFFF7F] md:pb-[24px]">
            NEW PRODUCT
          </p>

          <h1 className="pb-[24px] uppercase font-bold text-[36px] md:text-[56px] tracking-[2px] md:leading-[62px] lg:leading-[58px]">
            XX99 Mark II Headphones
          </h1>

          <p className="pb-[28px] text-[15px] font-medium tracking-[1.15px] text-[#FFFFFFBF] leading-[25px] lg:w-[349px] lg:pb-[40px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <Link href="/headphones" className="inline-block">
            <ModalButton width="w-[160px]" paddingX="px-0" classname="uppercase">
              See Product
            </ModalButton>
          </Link>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:block lg:absolute lg:top-[-157px] lg:right-[-118px] lg:h-[886px] lg:w-[709px]">
          <Image
            src="/assets/desktop-hero.png"
            alt="Desktop Image"
            width={709}
            height={886}
            className="h-full w-full max-w-none object-contain"
            priority
          />
        </div>
      </div>
      {/* Next section: NavMenu as part of page */}
      <section className="bg-white relative z-0">
        <NavMenu absolute={false} />
      </section>
    </div>
  );
};

export default HeroSection;
