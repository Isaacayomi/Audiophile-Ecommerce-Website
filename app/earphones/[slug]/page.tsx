import { StorefrontProductView } from "@/app/_components/StorefrontCatalogViews";
import { getCategoryProducts, getProduct } from "@/app/lib/products.server";

export const dynamic = "force-dynamic";

// Next.js uses these slugs to pre-render the known product detail routes.
export const generateStaticParams = async () => {
  try {
    const products = await getCategoryProducts("earphones");
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
};

const EarphoneProductPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  // Fetch the exact product for this route and let Next show a 404 if it does not exist.
  const product = await getProduct("earphones", slug).catch(() => null);
  return <StorefrontProductView product={product} />;
};

export default EarphoneProductPage;
