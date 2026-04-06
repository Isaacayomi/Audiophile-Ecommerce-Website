import { StorefrontProductView } from "@/app/_components/StorefrontCatalogViews";
import { getProduct } from "@/app/lib/products.server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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

  return <StorefrontProductView slug={slug} product={product} />;
};

export default HeadphoneProductPage;
