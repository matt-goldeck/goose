export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-8 py-6 flex flex-col gap-12">{children}</div>
  );
}
