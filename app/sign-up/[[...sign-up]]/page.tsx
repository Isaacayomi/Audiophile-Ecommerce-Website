import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center justify-center px-6 py-16">
      <SignUp
        path="/sign-up"
        routing="path"
        fallbackRedirectUrl="/"
      />
    </div>
  );
}
