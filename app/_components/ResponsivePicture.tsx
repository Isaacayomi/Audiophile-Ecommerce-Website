interface ResponsivePictureProps {
  alt: string;
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  className?: string;
  imageClassName?: string;
}

const ResponsivePicture = ({
  alt,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  className,
  imageClassName,
}: ResponsivePictureProps) => {
  return (
    <picture className={className}>
      <source media="(min-width: 1024px)" srcSet={desktopSrc} />
      <source media="(min-width: 768px)" srcSet={tabletSrc} />
      <img src={mobileSrc} alt={alt} className={`h-auto w-full ${imageClassName ?? ""}`} />
    </picture>
  );
};

export default ResponsivePicture;
