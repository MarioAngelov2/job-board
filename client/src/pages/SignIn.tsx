import { SignIn } from "@clerk/clerk-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function SignInPage() {
  return (
    <MaxWidthWrapper>
      <div className="flex mx-auto w-full mt-36 justify-center min-h-screen">
        <SignIn />
      </div>
    </MaxWidthWrapper>
  );
}
