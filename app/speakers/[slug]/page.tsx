import ProductDetailLayout from "@/app/_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "@/app/lib/products";
import { notFound } from "next/navigation";

// Prebuild all slugs for static generation (optional, if using SSG)
export const generateStaticParams = async () => {
  const products = await getCategoryProducts("speakers");

  return products.map((product) => ({ slug: product.slug }));
};

const SpeakersProductPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  const product = await getProduct("speakers", slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default SpeakersProductPage;
