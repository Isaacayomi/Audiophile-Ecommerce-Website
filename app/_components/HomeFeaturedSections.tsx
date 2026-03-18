import Link from "next/link";
import ResponsivePicture from "./ResponsivePicture";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center border border-black px-[30px] text-[13px] font-bold uppercase tracking-[1px] text-black transition-colors hover:bg-black hover:text-white";

const HomeFeaturedSections = () => {
  return (
    <section className="mx-6 mb-[120px] md:mx-10 lg:mx-auto lg:mb-[200px] lg:max-w-[1110px]">
      <div className="relative overflow-hidden rounded-lg bg-[#D87D4A] px-6 pb-[55px] pt-[55px] text-center md:px-[58px] md:pb-16 md:pt-[52px] lg:min-h-[560px] lg:px-[95px] lg:pt-0 lg:text-left">
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/home/desktop/pattern-circles.svg')] bg-[length:558px_558px] bg-[position:center_-120px] bg-no-repeat md:bg-[position:center_-290px] md:bg-[length:944px_944px] lg:bg-[position:-149px_-36px]"></div>

        <div className="relative z-10 mx-auto mb-8 w-[172px] md:mb-16 md:w-[197px] lg:absolute lg:bottom-0 lg:left-[95px] lg:mb-0 lg:w-[410px]">
          <ResponsivePicture
            mobileSrc="/assets/home/mobile/image-speaker-zx9.png"
            tabletSrc="/assets/home/tablet/image-speaker-zx9.png"
            desktopSrc="/assets/home/desktop/image-speaker-zx9.png"
            alt="ZX9 speaker"
          />
        </div>

        <div className="relative z-10 lg:ml-auto lg:flex lg:min-h-[560px] lg:w-[349px] lg:items-center">
          <div>
            <h2 className="mx-auto mb-6 max-w-[280px] text-[36px] leading-[40px] font-bold uppercase tracking-[1.29px] text-white md:max-w-none md:text-[56px] md:leading-[58px] md:tracking-[2px] lg:mx-0">
              ZX9
              <br />
              Speaker
            </h2>

            <p className="mx-auto mb-6 max-w-[280px] text-[15px] leading-[25px] font-medium text-white/75 md:mb-10 lg:mx-0 lg:max-w-[349px]">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>

            <Link
              href="/speakers/zx9-speaker"
              className="inline-flex h-12 items-center justify-center bg-black px-[31px] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4C4C4C]"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-[#F1F1F1] bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] bg-cover bg-center bg-no-repeat px-6 py-[101px] md:mt-8 md:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')] md:px-[62px] lg:mt-12 lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')] lg:px-[95px]">
        <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[2px] text-black">
          ZX7 Speaker
        </h2>

        <Link href="/speakers/zx7-speaker" className={secondaryButtonClass}>
          See Product
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-[11px] lg:mt-12 lg:gap-[30px]">
        <div className="overflow-hidden rounded-lg">
          <ResponsivePicture
            mobileSrc="/assets/home/mobile/image-earphones-yx1.jpg"
            tabletSrc="/assets/home/tablet/image-earphones-yx1.jpg"
            desktopSrc="/assets/home/desktop/image-earphones-yx1.jpg"
            alt="YX1 earphones"
            imageClassName="h-[200px] object-cover md:h-full"
          />
        </div>

        <div className="rounded-lg bg-[#F1F1F1] px-6 py-[41px] md:px-[41px] md:py-[101px] lg:px-[95px]">
          <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[2px] text-black">
            YX1 Earphones
          </h2>

          <Link href="/earphones/yx1-earphones" className={secondaryButtonClass}>
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedSections;
