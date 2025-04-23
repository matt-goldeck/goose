import { JobCompanyProvider } from "@/hooks/use-job-company";
import { JobListingProvider } from "@/hooks/use-job-listing";
import { ResumeProvider } from "@/hooks/use-resume";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <JobCompanyProvider>
        <JobListingProvider>
          <ResumeProvider>{children}</ResumeProvider>
        </JobListingProvider>
      </JobCompanyProvider>
    </main>
  );
}
