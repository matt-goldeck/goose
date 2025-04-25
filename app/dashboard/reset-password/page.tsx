import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-6 mt-12">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Please enter your new password below.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <InputText
            id="password"
            type="password"
            name="password"
            placeholder="New password"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <InputText
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />
        </div>

        <Button
          formAction={resetPasswordAction}
          className="w-full justify-center">
          Reset Password
        </Button>

        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
