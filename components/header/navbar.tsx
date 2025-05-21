// components/header/navbar.tsx
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "primereact/button";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 p-card font-tourney">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-8 items-center font-semibold font-tourney">
          <Link href="/" className="text-3xl text-harvest">
            Afterburner
          </Link>
          {user && (
            <>
              <Link href="/dashboard/listings" className="hover:underline">
                Listings
              </Link>
              <Link href="/dashboard/companies" className="hover:underline">
                Companies
              </Link>
            </>
          )}
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <form action={signOutAction}>
              <Button className="font-tourney">Sign out</Button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2 font-tourney">
            <Button className="font-tourney">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button className="font-tourney">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
