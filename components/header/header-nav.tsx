import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    user && (
      <div className="flex gap-5 items-center font-semibold">
        <Link href="/" className="text-lg">
          Afterburner
        </Link>
        <Link href="/dashboard/listings" className="hover:underline">
          Listings
        </Link>
        <Link href="/dashboard/companies" className="hover:underline">
          Companies
        </Link>
      </div>
    )
  );
}
