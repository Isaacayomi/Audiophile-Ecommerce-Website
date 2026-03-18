import { notFound } from "next/navigation";
import ProductDetailLayout from "../../_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "../../lib/products";

export const generateStaticParams = () =>
  getCategoryProducts("earphones").map((product) => ({ slug: product.slug }));

const EarphoneProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = getProduct("earphones", slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default EarphoneProductPage;
