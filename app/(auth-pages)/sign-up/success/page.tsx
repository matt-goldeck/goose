import PageContainer from "@/components/ui/page-container";
import Link from "next/link";
import { Button } from "primereact/button";

export default function SignUpSuccessPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold font-tourney">
            Sign-Up Successful
          </h1>
          <p className="text-lg">
            Your account has been created. You can now sign in to get started.
          </p>
          <Link href="/sign-in">
            <Button label="Go to Login" className="p-3 px-6 font-jetBrainsMono mt-5" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
