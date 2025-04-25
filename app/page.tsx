import { getIsUserAuthorized } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const userAuthorized = await getIsUserAuthorized();
  if (!userAuthorized) {
    redirect("/sign-in");
  } else {
    // TODO: Public landing page here. For now, redirect to dashboard
    redirect("/dashboard");
  }
}
