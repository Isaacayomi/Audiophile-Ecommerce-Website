import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center justify-center px-6 py-16">
      <SignIn
        path="/sign-in"
        routing="path"
        fallbackRedirectUrl="/"
      />
    </div>
  );
}
