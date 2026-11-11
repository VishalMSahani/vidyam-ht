import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/vidyam.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://vidyamhometuition.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Home Tuition in Mumbai | Vidyam Home Tuition",
    template: "%s | Vidyam Home Tuition",
  },
  description:
    "Home tuition in Mumbai for nursery to class 12, school subjects and entrance exams. Ask Vidyam about a subject-focused teacher and a free trial.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home Tuition in Mumbai | Vidyam Home Tuition",
    description: "Subject-focused home tuition in Mumbai, from nursery to class 12 and entrance exam preparation.",
    url: "/",
    siteName: "Vidyam Home Tuition",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero-mumbai.png", width: 1400, height: 933, alt: "A tutor helping a student learn at home in Mumbai" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="h-full scroll-smooth motion-reduce:scroll-auto antialiased">
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-background-primary-default focus:p-3 focus:text-text-primary"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
