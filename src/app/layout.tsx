import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { PublicSiteChrome } from "@/components/layout/PublicSiteChrome";
import { BookingProvider } from "@/context/BookingContext";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const siteUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "PuzzleMetrics — AI You Can Build, Deploy, and Scale",
  description:
    "PuzzleMetrics builds AI agents, RAG systems, and Ads intelligence that creates measurable results for businesses worldwide. UK-based, globally operational.",
  keywords: "AI agents, RAG systems, Meta Ads AI, Google Ads AI, AI automation, UK AI company",
  openGraph: {
    title: "PuzzleMetrics — AI You Can Build, Deploy, and Scale",
    description: "Build AI that works. SaaS agents, RAG, Ads intelligence — measurable results.",
    url: siteUrl,
    siteName: "PuzzleMetrics",
    type: "website",
  },
};

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('pm-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${interTight.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <BookingProvider>
            <div className="w-full">
              <PublicSiteChrome footer={<Footer />}>{children}</PublicSiteChrome>
            </div>
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
