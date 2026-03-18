const HomeBestGearSection = () => {
  return (
    <section className="mx-6 mb-[120px] md:mx-10 md:mb-[96px] lg:mx-auto lg:mb-[200px] lg:grid lg:max-w-[1110px] lg:grid-cols-[1fr_540px] lg:items-center lg:gap-[125px]">
      <div className="mb-10 overflow-hidden rounded-lg md:mb-[63px] lg:order-2 lg:mb-0">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/assets/home/best-gear-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/assets/home/best-gear-tablet.jpg" />
          <img
            src="/assets/home/best-gear-mobile.jpg"
            alt="Person listening with headphones"
            className="h-[300px] w-full object-cover lg:h-[588px]"
          />
        </picture>
      </div>

      <div className="text-center lg:order-1 lg:text-left">
        <h2 className="mb-8 text-[28px] leading-[38px] font-bold uppercase tracking-[1px] text-black md:mx-auto md:max-w-[573px] md:text-[40px] md:leading-[44px] md:tracking-[1.43px] lg:mx-0 lg:max-w-[445px]">
          Bringing you the <span className="text-[#D87D4A]">best</span> audio
          gear
        </h2>

        <p className="text-[15px] leading-[25px] font-medium text-black/50 md:mx-auto md:max-w-[573px] lg:mx-0 lg:max-w-[445px]">
          Located at the heart of New York City, Audiophile is the premier
          store for high end headphones, earphones, speakers, and audio
          accessories. We have a large showroom and luxury demonstration rooms
          available for you to browse and experience a wide range of our
          products. Stop by our store to meet some of the fantastic people who
          make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
};

export default HomeBestGearSection;
