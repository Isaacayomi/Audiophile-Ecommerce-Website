import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { RhythmGroup, RhythmItem } from "../_components/ui/Rhythm";
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: "/checkout" });
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
