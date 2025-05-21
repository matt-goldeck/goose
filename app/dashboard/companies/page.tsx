import { getIsUserAuthorized } from "@/auth";
import JobCompanyDashboard from "@/components/job-companies/job-company-dashboard";
import PageContainer from "@/components/ui/page-container";
import { redirect } from "next/navigation";

export default async function JobCompanyDashboardPage() {
  const userAuthorized = await getIsUserAuthorized();
  if (!userAuthorized) {
    redirect("/sign-in");
  } else {
    return (
      <PageContainer>
        <JobCompanyDashboard />
      </PageContainer>
    );
  }
}
