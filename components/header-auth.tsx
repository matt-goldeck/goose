import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "primereact/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button>Sign out</Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
