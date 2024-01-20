import { SignUp } from "@clerk/clerk-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function SignUpPage() {
  return (
    <MaxWidthWrapper>
      <div className="flex mx-auto w-full mt-36 justify-center min-h-screen">
        <SignUp />
      </div>
    </MaxWidthWrapper>
  );
}
