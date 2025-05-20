import { getIsUserAuthorized } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const userAuthorized = await getIsUserAuthorized();
  if (!userAuthorized) {
    redirect("/sign-in");
  } else {
    // TODO: Some kind of dashboard page here? For now redirect to listings
    redirect("/dashboard/listings");
  }
}
