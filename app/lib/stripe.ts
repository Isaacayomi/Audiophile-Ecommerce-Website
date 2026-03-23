import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Stripe should only be initialized on the server, and only when a valid secret key is available.
export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error(
      "Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env.local and restart the dev server.",
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
};
