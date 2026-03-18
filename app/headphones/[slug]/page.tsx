import { notFound } from "next/navigation";
import ProductDetailLayout from "../../_components/ProductDetailLayout";
import { getCategoryProducts, getProduct } from "../../lib/products";

export const generateStaticParams = () =>
  getCategoryProducts("headphones").map((product) => ({ slug: product.slug }));

const HeadphoneProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = getProduct("headphones", slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
};

export default HeadphoneProductPage;
