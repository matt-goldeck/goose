import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import PageContainer from "@/components/ui/page-container";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <PageContainer>
      <form className="w-full max-w-sm mx-auto flex flex-col gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-center">Sign in</h1>
          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
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
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs underline text-muted-foreground">
                Forgot?
              </Link>
            </div>
            <InputText
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button formAction={signInAction} className="w-full justify-center" outlined>
            Sign in
          </Button>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </PageContainer>
  );
}
