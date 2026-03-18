import Image from "next/image";
import Link from "next/link";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center border border-black px-[30px] text-[13px] font-bold uppercase tracking-[1px] text-black transition-colors hover:bg-black hover:text-white";

const HomeFeaturedSections = () => {
  return (
    <section className="mx-6 mb-[120px] md:mx-10 lg:mx-auto lg:mb-[200px] lg:max-w-[1110px]">
      <div className="relative overflow-hidden rounded-lg bg-[#D87D4A] px-6 pb-[55px] pt-[55px] text-center md:px-[58px] md:pb-16 md:pt-[52px] lg:flex lg:min-h-[560px] lg:items-end lg:justify-between lg:px-[95px] lg:pt-0 lg:text-left">
        <div className="pointer-events-none absolute left-1/2 top-[52px] h-[558px] w-[558px] -translate-x-1/2 rounded-full border border-white/20 md:top-[30px] lg:left-[220px] lg:top-[-36px] lg:translate-x-0"></div>
        <div className="pointer-events-none absolute left-1/2 top-[88px] h-[472px] w-[472px] -translate-x-1/2 rounded-full border border-white/10 md:top-[73px] lg:left-[263px] lg:top-[7px] lg:translate-x-0"></div>
        <div className="pointer-events-none absolute left-1/2 top-[123px] h-[390px] w-[390px] -translate-x-1/2 rounded-full border border-white/10 md:top-[114px] lg:left-[304px] lg:top-[50px] lg:translate-x-0"></div>

        <div className="relative z-10 mx-auto mb-8 w-[172px] md:mb-16 md:w-[197px] lg:absolute lg:bottom-0 lg:left-[118px] lg:mb-0 lg:w-[410px]">
          <Image
            src="/assets/speaker.png"
            alt="ZX9 speaker"
            width={410}
            height={493}
            className="h-auto w-full"
          />
        </div>

        <div className="relative z-10 lg:ml-auto lg:w-[349px]">
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

      <div className="mt-6 overflow-hidden rounded-lg bg-[#F1F1F1] px-6 py-[101px] md:mt-8 md:bg-[linear-gradient(to_right,rgba(241,241,241,0.88),rgba(241,241,241,0.35)),url('/assets/hero-cover.png')] md:bg-cover md:bg-[center_right] md:px-[62px] lg:mt-12 lg:px-[95px] lg:py-[101px]">
        <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[2px] text-black">
          ZX7 Speaker
        </h2>

        <Link href="/speakers" className={secondaryButtonClass}>
          See Product
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-[11px] lg:mt-12 lg:gap-[30px]">
        <div className="overflow-hidden rounded-lg bg-[#F1F1F1]">
          <div className="relative h-[200px] w-full md:h-full">
            <Image
              src="/assets/earphone.png"
              alt="YX1 earphones"
              fill
              className="object-cover"
            />
          </div>
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
