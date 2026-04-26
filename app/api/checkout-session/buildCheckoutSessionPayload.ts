export const buildCheckoutSessionPayload = (
  payload: Record<string, unknown>,
  origin: string,
) => ({
  ...payload,
  origin,
  successUrl: `${origin}/checkout/success`,
  cancelUrl: `${origin}/checkout`,
});
