import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Afterburner",
  description: "The fastest way to find a job",
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
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="min-h-screen flex flex-col">
            {/* Nav */}
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
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

            <footer className="w-full flex items-center justify-center border-t text-center text-xs gap-8 py-8">
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
