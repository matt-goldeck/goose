import { ResumeProvider } from "@/hooks/use-resume";

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ResumeProvider>{children}</ResumeProvider>
    </main>
  );
}
