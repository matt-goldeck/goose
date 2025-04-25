import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import { Button } from "primereact/button";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-6 mt-12">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <Button formAction={forgotPasswordAction} className="w-full justify-center" outlined>
          Reset Password
        </Button>

        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}