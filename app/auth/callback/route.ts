import { createClient } from "@/utils/supabase/server";
import { getFrontEndURL } from "@/utils/urls";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${getFrontEndURL()}/sign-in`);
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${getFrontEndURL()}/${redirectTo}`);
  }

  // Push to dashboard if no redirect
  return NextResponse.redirect(`${getFrontEndURL()}/dashboard`);
}
