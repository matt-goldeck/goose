import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 py-4 text-center text-sm text-muted-foreground">
      <Link
        href="https://batstolabs.com"
        target="_blank"
        rel="noopener noreferrer">
        Batsto Labs &copy; 2025
      </Link>
    </footer>
  );
}
