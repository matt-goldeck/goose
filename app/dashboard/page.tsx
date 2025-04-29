import JobListingDashboard from "@/components/job-listings/job-listing-dashboard";
import PageContainer from "@/components/ui/page-container";
import { JobListingProvider } from "@/hooks/use-job-listing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <PageContainer>
      <JobListingProvider>
        <JobListingDashboard />
      </JobListingProvider>
    </PageContainer>
  );
}
