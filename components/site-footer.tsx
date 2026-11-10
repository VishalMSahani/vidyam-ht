import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { LinkButton } from "@/components/base/buttons/link-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-separator-border bg-background-primary-default">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div className="flex flex-col items-start gap-4">
          <Image src="/vidyam_logo_h.png" alt="Vidyam Home Tuition" width={205} height={68} className="h-auto w-40" />
          <p className="max-w-sm text-body-regular text-text-secondary">Personal tuition at home for school learning and exam preparation.</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="text-caption-1-semibold uppercase tracking-widest text-text-tertiary">Explore</p>
          <Link href="/about/" className="text-body-medium text-text-secondary hover:text-accent-700">About us</Link>
          <Link href="/services/" className="text-body-medium text-text-secondary hover:text-accent-700">Services</Link>
          <Link href="/contact/" className="text-body-medium text-text-secondary hover:text-accent-700">Contact</Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="text-caption-1-semibold uppercase tracking-widest text-text-tertiary">Get in touch</p>
          <a href="tel:+919820438932" className="text-body-medium text-text-secondary hover:text-accent-700">+91 98204 38932</a>
          <a href="tel:+918591148341" className="text-body-medium text-text-secondary hover:text-accent-700">+91 85911 48341</a>
          <LinkButton href="mailto:info@vidyamhometuition.in" trailingIcon={RiArrowRightLine} className="break-all text-start">info@vidyamhometuition.in</LinkButton>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-2 border-t border-separator-border px-5 py-5 text-caption-1-medium text-text-tertiary sm:flex-row sm:flex-wrap sm:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} Vidyam Home Tuition</p>
        <a href="https://www.vishal.it.com" className="text-text-tertiary underline-offset-4 transition-colors hover:text-accent-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">Designed and developed by Vishal Sahani</a>
      </div>
    </footer>
  );
}
