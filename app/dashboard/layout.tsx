import { JobCompanyProvider } from "@/hooks/use-job-company";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <JobCompanyProvider>{children}</JobCompanyProvider>
    </main>
  );
}
