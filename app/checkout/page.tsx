import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { RhythmGroup, RhythmItem } from "../_components/ui/Rhythm";
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = async () => {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn({ returnBackUrl: "/checkout" });
    }
  } catch {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center px-6 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-black">Checkout unavailable</h1>
          <p className="text-black/60">
            Sign-in is not configured on this deployment, so checkout cannot be
            opened right now.
          </p>
          <Link href="/sign-in" className="text-brand hover:underline">
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 px-6 py-4 md:px-10 md:py-12 lg:px-41.25 lg:py-19.75">
      <RhythmGroup inView={false}>
        <RhythmItem variant="soft">
          <Link
            href="/"
            className="mb-6 inline-block text-copy leading-copy font-medium text-black/50 transition-colors hover:text-brand md:mb-9.5"
          >
            Go Back
          </Link>
        </RhythmItem>
      </RhythmGroup>

      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
