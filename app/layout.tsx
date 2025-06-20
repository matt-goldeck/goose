import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/arya-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import localFont from "next/font/local";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const tourney = localFont({
  src: "./fonts/Tourney-VariableFont_wdth,wght.ttf",
  variable: "--font-Tourney",
  weight: "100 900",
});

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-JetBrainsMono",
});

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.variable} ${geistSans.className} ${tourney.variable} `}
      suppressHydrationWarning>
      <PrimeReactProvider>
        <body className="font-sans">
          <main className="min-h-screen flex flex-col">
            {/* Nav */}
            <Navbar />

            {/* Page Content */}
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="flex flex-col gap-20 w-full max-w-screen-xl px-6 py-10">
                {children}
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </main>
        </body>
      </PrimeReactProvider>
      <Analytics />
    </html>
  );
}
