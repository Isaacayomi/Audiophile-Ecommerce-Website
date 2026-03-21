import ProductDetailLayout from "@/app/_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "@/app/lib/products";
import { notFound } from "next/navigation";

// Next.js uses these slugs to pre-render the known product detail routes.
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

  // Fetch the exact product for this route and let Next show a 404 if it does not exist.
  const product = await getProduct("speakers", slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default SpeakersProductPage;
