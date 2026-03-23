import { getOrderBySessionId } from "@/app/lib/orders";
import SuccessClient from "./SuccessClient";

const CheckoutSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  // Stripe appends the Checkout Session id to the success URL so we can look up the stored order.
  const { session_id } = await searchParams;
  const order = session_id ? await getOrderBySessionId(session_id) : null;

  return (
    <div className="bg-neutral-100 px-6 py-16 md:px-10 md:py-20 lg:px-41.25 lg:py-24">
      <SuccessClient order={order} />
    </div>
  );
};

export default CheckoutSuccessPage;
