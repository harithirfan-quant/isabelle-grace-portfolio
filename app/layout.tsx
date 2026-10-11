import type { Metadata, Viewport } from "next";
import { Caveat, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { CommandPalette } from "@/components/command-palette";
import { Toaster } from "sonner";
import { personal, site, socials } from "@/content/portfolio";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// Handwritten accent, used only for the margin notes and the wall cards.
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.metaTitle,
  description: site.metaDescription,
  keywords: [
    "Isabelle Grace",
    "International Business",
    "People Operations",
    "Learning & Development",
    "HRM",
    "UniMAP",
    "Bintulu Port",
    "MyNext",
    "Internship",
    "Malaysia",
  ],
  authors: [{ name: personal.fullName }],
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    url: site.url,
    siteName: `${personal.preferredName} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    // The desktop scene is a daylight one: pink wallpaper, light window.
    { media: "(prefers-color-scheme: light)", color: "#ffb3d4" },
    { media: "(prefers-color-scheme: dark)", color: "#ffb3d4" },
  ],
};

// JSON-LD Person schema for rich SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.fullName,
  alternateName: personal.preferredName,
  email: `mailto:${personal.email}`,
  jobTitle: personal.title,
  url: site.url,
  alumniOf: site.alumniOf.map((name) => ({
    "@type": "CollegeOrUniversity",
    name,
  })),
  knowsLanguage: personal.languages,
  sameAs: [socials.linkedin, socials.instagram, socials.projectUrl],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} ${mono.variable} ${hand.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <SiteChrome>
            {children}
          </SiteChrome>
          <CommandPalette />
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
