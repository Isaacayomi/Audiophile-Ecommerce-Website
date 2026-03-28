import ProductDetailLayout from "@/app/_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "@/app/lib/products.server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Next.js uses these slugs to pre-render the known product detail routes.
export const generateStaticParams = async () => {
  try {
    const products = await getCategoryProducts("headphones");
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
};

const HeadphoneProductPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  // Fetch the exact product for this route and let Next show a 404 if it does not exist.
  const product = await getProduct("headphones", slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default HeadphoneProductPage;
