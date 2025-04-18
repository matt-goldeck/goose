import { JobCompanyProvider } from "@/hooks/use-job-company";
import { JobListingProvider } from "@/hooks/use-job-listing";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <JobCompanyProvider>
        <JobListingProvider>{children}</JobListingProvider>
      </JobCompanyProvider>
    </main>
  );
}
