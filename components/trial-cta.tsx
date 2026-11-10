import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";

export function TrialCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-4 sm:px-8 lg:px-12 lg:pb-28">
      <div className="flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-accent-800 px-7 py-10 sm:px-10 lg:flex-row lg:items-end lg:px-14 lg:py-14">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-caption-1-semibold uppercase tracking-widest text-accent-200">A good place to begin</p>
          <h2 className="text-display-4-medium text-text-white md:text-display-3-medium">Tell us what your child needs help with.</h2>
          <p className="text-body-regular text-accent-100">We can talk through the class, subjects and schedule, then discuss a suitable teacher and trial.</p>
        </div>
        <ButtonLink href="/contact/" trailingIcon={RiArrowRightLine} className="h-11 shrink-0 rounded-full bg-background-primary-default px-5 text-accent-700 hover:bg-accent-50">
          Get in touch
        </ButtonLink>
      </div>
    </section>
  );
}
