import { SignIn } from "@clerk/clerk-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function SignInPage() {
  return (
    <MaxWidthWrapper>
      <div className="flex mx-auto w-full items-center justify-center mt-28">
        <SignIn />
      </div>
    </MaxWidthWrapper>
  );
}
