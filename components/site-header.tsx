"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiArrowRightLine, RiCloseLine, RiMenuLine } from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About us" },
  { href: "/services/", label: "Services" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-separator-border bg-background-primary-default/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Vidyam Home Tuition, home" onClick={() => setIsOpen(false)}>
          <Image src="/vidyam_logo_h.png" alt="Vidyam Home Tuition" width={228} height={76} priority className="h-auto w-40 sm:w-44" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href || (href !== "/" && pathname.startsWith(href.slice(0, -1))) ? "page" : undefined}
              className={cx(
                "rounded-full px-4 py-2 text-body-medium text-text-secondary transition-colors hover:bg-accent-50 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                (pathname === href || (href !== "/" && pathname.startsWith(href.slice(0, -1)))) && "bg-accent-50 text-accent-700",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/contact/" trailingIcon={RiArrowRightLine} className="h-11 rounded-full px-5">
            Ask about a trial
          </ButtonLink>
        </div>
        <Button
          type="button"
          variant="ghost"
          iconOnly
          leadingIcon={isOpen ? RiCloseLine : RiMenuLine}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden"
        />
      </div>
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-separator-border bg-background-primary-default px-5 pb-6 pt-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cx(
                  "rounded-xl px-4 py-3 text-body-medium text-text-primary transition-colors hover:bg-accent-50",
                  (pathname === href || (href !== "/" && pathname.startsWith(href.slice(0, -1)))) && "bg-accent-50 text-accent-700",
                )}
              >
                {label}
              </Link>
            ))}
            <ButtonLink href="/contact/" onClick={() => setIsOpen(false)} trailingIcon={RiArrowRightLine} className="mt-3 h-11 w-full rounded-full">
              Ask about a trial
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
