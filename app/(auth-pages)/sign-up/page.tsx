import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import PageContainer from "@/components/ui/page-container";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getIsUserAuthorized } from "@/auth";
import { redirect } from "next/navigation";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const userAuthorized = await getIsUserAuthorized();
  if (userAuthorized) {
    redirect("/");
  }

  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <PageContainer>
      <form className="w-full max-w-sm mx-auto flex flex-col gap-6">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-semibold font-tourney">Sign up</h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <InputText
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <InputText
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <Button
            formAction={signUpAction}
            className="w-full justify-center font-jetBrainsMono"
            outlined>
            Sign up
          </Button>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </PageContainer>
  );
}
