import { JobCompanyProvider } from "@/hooks/use-job-company";
import { JobListingProvider } from "@/hooks/use-job-listing";

export default function ProtectedLayout({
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
