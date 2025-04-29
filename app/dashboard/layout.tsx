import { JobCompanyProvider } from "@/hooks/use-job-company";
import { ResumeProvider } from "@/hooks/use-resume";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <JobCompanyProvider>
          <ResumeProvider>{children}</ResumeProvider>
      </JobCompanyProvider>
    </main>
  );
}
