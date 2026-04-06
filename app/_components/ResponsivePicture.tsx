"use client";

import { ResponsivePictureProps } from "../type";

const ResponsivePicture = ({
  alt,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  className,
  imageClassName,
  imageOverride,
}: ResponsivePictureProps) => {
  const overrideSrc =
    imageOverride && imageOverride.startsWith("data:") ? imageOverride : "";

  return (
    <picture className={className}>
      <source media="(min-width: 1024px)" srcSet={overrideSrc || desktopSrc} />
      <source media="(min-width: 768px)" srcSet={overrideSrc || tabletSrc} />
      <img
        src={overrideSrc || mobileSrc}
        alt={alt}
        className={`h-auto w-full ${imageClassName ?? ""}`}
      />
    </picture>
  );
};

export default ResponsivePicture;
