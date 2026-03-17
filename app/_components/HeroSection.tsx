import NavMenu from "./ui/navMenu";
import ModalButton from "./ui/modalButton";

const HeroSection = () => {
  return (
    <div className="h-screen bg-[url('/assets/hero-cover.png')] bg-no-repeat bg-[position:center_-98px] md:bg-[position:center_-112px] md:bg-[url('/assets/tablet-hero.png')] bg-cover overflow-hidden mb-[40px]">
      <div className="w-[328px] md:w-[349px] mx-auto text-center pt-[108px] pb-[112px] md:pt-[126px] md:pb-[167px] md:h-screen">
        <p className="pb-[16px] text-[14px] tracking-[10px] text-[#FFFFFF7F] md:pb-[24px]">
          NEW PRODUCT
        </p>
        <h1 className="pb-[24px] uppercase font-bold text-[36px] tracking-[1.29px] leading-[41px] md:text-[56px] tracking-[2px] md:leading-[58px]">
          XX99 Mark II Headphones
        </h1>
        <p className="pb-[28px] text-[15px] font-medium leading-[30px] tracking-[1.15px] text-[#FFFFFFBF] leading-[25px]">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>

        <ModalButton width="w-[160px]" paddingX="px-0" classname="uppercase">
          See Product
        </ModalButton>
      </div>

      <NavMenu absolute={false} />
    </div>
  );
};

export default HeroSection;
