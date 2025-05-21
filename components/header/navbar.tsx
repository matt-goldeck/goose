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
    <nav className="w-full border-b border-b-foreground/10 p-card font-tourney">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 text-sm">
        {/* Left Side: Branding and Nav Links */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center font-semibold">
          <Link href="/" className="text-3xl text-harvest">
            Afterburner
          </Link>
          {user && (
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Link href="/dashboard/listings" className="hover:underline">
                Listings
              </Link>
              <Link href="/dashboard/companies" className="hover:underline">
                Companies
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Auth Buttons */}
        {user ? (
          <form action={signOutAction} className="self-start md:self-center">
            <Button className="font-jetBrainsMono" label="Sign Out" />
          </form>
        ) : (
          <div className="flex flex-col md:flex-row gap-2 font-tourney self-start md:self-center">
            <Button className="font-jetBrainsMono">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="font-jetBrainsMono">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}