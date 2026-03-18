import NavMenu from "./ui/navMenu";
import ModalButton from "./ui/modalButton";

const HeroSection = () => {
  return (
    <div
      className="
        bg-black
        bg-[url('/assets/mobile-hero.png')]
        bg-no-repeat
        bg-[position:center_-50px]
        bg-[length:320px_auto]
        min-h-[600px]
        md:bg-[url('/assets/sample-tablet.png')]
        md:bg-[length:768px_auto]
        md:bg-[position:center_-112px]
        md:min-h-[900px]
        relative
        overflow-hidden
        mb-[40px]
        lg:bg-none
      "
    >
      {/* Circular trim for mobile using radial gradient */}
      <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle,transparent_65%,black_100%)]"></div>

      {/* Overlay only for tablet and above */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle,transparent_60%,black_100%)]"></div>

      {/* Hero content */}
      <div className="w-[328px] md:w-[406px] mx-auto text-center pt-[108px] pb-[112px] md:pt-[126px] md:pb-[167px] relative z-10">
        <p className="pb-[16px] text-[14px] tracking-[10px] text-[#FFFFFF7F] md:pb-[24px]">
          NEW PRODUCT
        </p>

        <h1 className="pb-[24px] uppercase font-bold text-[36px] md:text-[56px] tracking-[2px] md:leading-[62px]">
          XX99 Mark II Headphones
        </h1>

        <p className="pb-[28px] text-[15px] font-medium tracking-[1.15px] text-[#FFFFFFBF] leading-[25px]">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>

        <ModalButton width="w-[160px]" paddingX="px-0" classname="uppercase">
          See Product
        </ModalButton>
      </div>

      {/* Next section: NavMenu as part of page */}
      <section className="bg-white relative z-0">
        <NavMenu absolute={false} />
      </section>
    </div>
  );
};

export default HeroSection;
