import Link from "next/link";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center border border-black px-[30px] text-[13px] font-bold uppercase tracking-[1px] text-black transition-colors hover:bg-black hover:text-white";

const HomeFeaturedSections = () => {
  return (
    <section className="mx-6 mb-[120px] md:mx-10 lg:mx-auto lg:mb-[200px] lg:max-w-[1110px]">
      <div className="relative overflow-hidden rounded-lg bg-[#D87D4A] px-6 pb-[55px] pt-[55px] text-center md:px-[58px] md:pb-16 md:pt-[52px] lg:min-h-[560px] lg:px-[95px] lg:pt-0 lg:text-left">
        <div className="pointer-events-none absolute left-1/2 top-[52px] h-[558px] w-[558px] -translate-x-1/2 rounded-full border border-white/20 md:top-[30px] lg:left-[220px] lg:top-[-36px] lg:translate-x-0"></div>
        <div className="pointer-events-none absolute left-1/2 top-[88px] h-[472px] w-[472px] -translate-x-1/2 rounded-full border border-white/10 md:top-[73px] lg:left-[263px] lg:top-[7px] lg:translate-x-0"></div>
        <div className="pointer-events-none absolute left-1/2 top-[123px] h-[390px] w-[390px] -translate-x-1/2 rounded-full border border-white/10 md:top-[114px] lg:left-[304px] lg:top-[50px] lg:translate-x-0"></div>

        <div className="relative z-10 mx-auto mb-8 w-[172px] md:mb-16 md:w-[197px] lg:absolute lg:bottom-0 lg:left-[95px] lg:mb-0 lg:w-[410px]">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/assets/home/zx9-desktop.png" />
            <source media="(min-width: 768px)" srcSet="/assets/home/zx9-tablet.png" />
            <img
              src="/assets/home/zx9-mobile.png"
              alt="ZX9 speaker"
              className="h-auto w-full"
            />
          </picture>
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
              href="/speakers"
              className="inline-flex h-12 items-center justify-center bg-black px-[31px] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4C4C4C]"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>

      <div
        className="
          mt-6
          rounded-lg
          bg-[#F1F1F1]
          bg-[url('/assets/home/zx7-mobile.jpg')]
          bg-cover
          bg-center
          bg-no-repeat
          px-6
          py-[101px]
          md:mt-8
          md:bg-[url('/assets/home/zx7-tablet.jpg')]
          md:px-[62px]
          lg:mt-12
          lg:bg-[url('/assets/home/zx7-desktop.jpg')]
          lg:px-[95px]
        "
      >
        <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[2px] text-black">
          ZX7 Speaker
        </h2>

        <Link href="/speakers" className={secondaryButtonClass}>
          See Product
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-[11px] lg:mt-12 lg:gap-[30px]">
        <div className="overflow-hidden rounded-lg">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/assets/home/yx1-desktop.jpg" />
            <source media="(min-width: 768px)" srcSet="/assets/home/yx1-tablet.jpg" />
            <img
              src="/assets/home/yx1-mobile.jpg"
              alt="YX1 earphones"
              className="h-[200px] w-full object-cover md:h-full"
            />
          </picture>
        </div>

        <div className="rounded-lg bg-[#F1F1F1] px-6 py-[41px] md:px-[41px] md:py-[101px] lg:px-[95px]">
          <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[2px] text-black">
            YX1 Earphones
          </h2>

          <Link href="/earphones" className={secondaryButtonClass}>
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedSections;
