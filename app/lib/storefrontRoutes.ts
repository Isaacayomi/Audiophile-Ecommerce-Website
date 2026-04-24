import type { Category } from "../type";

export const storefrontCategoryProductSlugs: Record<Category, string[]> = {
  headphones: [
    "xx99-mark-ii-headphones",
    "xx99-mark-one-headphones",
    "xx59-headphones",
  ],
  speakers: ["zx9-speaker", "zx7-speaker"],
  earphones: ["yx1-wireless-earphones"],
};

// Maps old backend slugs to current canonical slugs so legacy URLs and API responses still resolve correctly.
export const storefrontLegacyProductSlugAliases: Partial<
  Record<Category, Record<string, string>>
> = {
  headphones: {
    "xx99-mark-two-headphones": "xx99-mark-ii-headphones",
  },
  earphones: {
    "yx1-earphones": "yx1-wireless-earphones",
  },
};

const storefrontLegacyProductSlugMap = {
  "xx99-mark-two-headphones": "xx99-mark-ii-headphones",
  "yx1-earphones": "yx1-wireless-earphones",
} as const;

export const resolveStorefrontSlug = (category: Category, slug: string) =>
  storefrontLegacyProductSlugAliases[category]?.[slug] ?? slug;

export const resolveStorefrontSlugByValue = (slug: string) =>
  storefrontLegacyProductSlugMap[
    slug as keyof typeof storefrontLegacyProductSlugMap
  ] ?? slug;

export const storefrontProductPaths = {
  heroHeadphones: "/headphones/xx99-mark-ii-headphones",
  featuredSpeaker: "/speakers/zx9-speaker",
  featuredSpeakerSecondary: "/speakers/zx7-speaker",
  featuredEarphones: "/earphones/yx1-wireless-earphones",
} as const;
