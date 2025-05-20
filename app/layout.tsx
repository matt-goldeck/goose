import HeaderAuth from "@/components/header-auth";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/arya-orange/theme.css";
import "primereact/resources/primereact.min.css"; // Core styles (always required)
import "primeicons/primeicons.css"; // Optional for icons

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Afterburner",
  description: "Your job hunt wingman",
  icons: {
    icon: {
      url: "/favicon.ico",
    },
    shortcut: {
      url: "/favicon.ico",
    },
    apple: {
      url: "/apple-touch-icon.png",
    },
    other: {
      url: "/favicon.ico",
    },
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <PrimeReactProvider>
        <body>
          <main className="min-h-screen flex flex-col">
            {/* Nav */}
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 p-card">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>Afterburner 🔥</Link>
                </div>
                <HeaderAuth />
              </div>
            </nav>

            {/* Page Content */}
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="flex flex-col gap-20 w-full max-w-screen-xl px-6 py-10">
                {children}
              </div>
            </div>
          </main>
        </body>
      </PrimeReactProvider>
      <Analytics />
    </html>
  );
}
