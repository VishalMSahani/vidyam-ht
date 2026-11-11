import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/vidyam.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Vidyam Home Tuition | Personal tuition at home",
    template: "%s | Vidyam Home Tuition",
  },
  description:
    "Home tuition for nursery to class 12, school subjects, and exam preparation. Talk to Vidyam about finding a teacher who fits your learner.",
  openGraph: {
    title: "Vidyam Home Tuition",
    description: "Thoughtful, subject-specific tuition at home.",
    type: "website",
  },
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
