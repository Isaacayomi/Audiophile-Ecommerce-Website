import { notFound } from "next/navigation";
import ProductDetailLayout from "../../_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "../../lib/products";

// Prebuild every earphone product page so each slug can be statically generated.
export const generateStaticParams = () =>
  getCategoryProducts("earphones").map((product) => ({ slug: product.slug }));

const EarphoneProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Resolve the incoming slug and look up the matching earphone product record.
  const { slug } = await params;
  const product = getProduct("earphones", slug);

  // Delegate unknown slugs to Next.js so the route renders the 404 page.
  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default EarphoneProductPage;
