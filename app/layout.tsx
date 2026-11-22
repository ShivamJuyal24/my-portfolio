import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// Set NEXT_PUBLIC_SITE_URL to the canonical deployment URL for social previews.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shivam Juyal | Backend Engineer",
    template: "%s | Shivam Juyal",
  },
  description:
    "Backend engineer building LLM systems you can trust. Explore projects, open-source contributions, and experience.",
  openGraph: {
    title: "Shivam Juyal | Backend Engineer",
    description: "Backend engineer building LLM systems you can trust.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shivam Juyal — Backend engineer building LLM systems you can trust." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Juyal | Backend Engineer",
    description: "Backend engineer building LLM systems you can trust.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0c" },
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
