"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RiArrowLeftLine, RiArrowRightLine, RiExternalLinkLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { LinkButton } from "@/components/base/buttons/link-button";
import SpotlightCard from "@/components/SpotlightCard";
import { cx } from "@/utils/cx";

const reviews = [
  {
    name: "Mitra Veena",
    quote: "It’s been hardly a month since we joined Vidyam Home Tuition, and my kids are already loving it! They provide great tutors and ensure a comfortable environment for both students and teachers.",
  },
  {
    name: "Vaishnavi Hiranna",
    quote: "Best and detailed explanation is provided for each and every basic concept",
  },
  {
    name: "Neha Hajeri",
    quote: "Very nice classes, easy explanation ✨",
  },
  {
    name: "Dharmendra Dubey",
    quote: "Best home tuition in sion mumbai",
  },
  {
    name: "Sanjay Kumar Pandey",
    quote: "Very nice platform for students who wants to achieve success.",
  },
] as const;

export function HomeReviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      setCanGoBack(rail.scrollLeft > 4);
      setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
      const card = rail.querySelector<HTMLElement>("[data-review-card]");
      if (card) {
        const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 16;
        setActiveIndex(Math.min(reviews.length - 1, Math.round(rail.scrollLeft / (card.offsetWidth + gap))));
      }
    };
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    update();
    rail.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-review-card]");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 16;
    const distance = (card?.offsetWidth || rail.clientWidth) + gap;
    rail.scrollBy({ left: direction * distance, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section aria-labelledby="reviews-title" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">Shared experiences</p>
          <h2 id="reviews-title" className="mt-3 text-display-4-medium text-text-primary md:text-display-3-medium">What people say about Vidyam.</h2>
          <p className="mt-4 text-body-2-regular text-text-secondary">A few words from parents and learners in Mumbai.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="me-3 text-caption-1-medium tabular-nums text-text-tertiary" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
          <Button type="button" iconOnly leadingIcon={RiArrowLeftLine} variant="secondary" aria-label="Previous reviews" disabled={!canGoBack} onClick={() => move(-1)} className="rounded-full" />
          <Button type="button" iconOnly leadingIcon={RiArrowRightLine} variant="secondary" aria-label="Next reviews" disabled={!canGoForward} onClick={() => move(1)} className="rounded-full" />
        </div>
      </div>
      <div ref={railRef} role="list" aria-label="Vidyam Google reviews" className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review, index) => (
          <article key={review.name} role="listitem" data-review-card className="w-[84%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-2rem)/3)]">
            <SpotlightCard
              theme="light"
              spotlightColor="var(--color-accent-500)"
              intensity={0.18}
              borderGlow={0.52}
              flare={false}
              style={{ "--spotlight-card-surface": index === activeIndex ? "var(--color-accent-50)" : "var(--color-background-primary-default)" } as CSSProperties}
              className={cx("group flex h-full min-h-80 flex-col border p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg", index === activeIndex ? "border-accent-200 shadow-md" : "border-border-button-default")}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-100 text-body-medium text-accent-700">{review.name.charAt(0)}</span>
                  <div className="min-w-0">
                    <p className="truncate text-body-medium text-text-primary">{review.name}</p>
                    <p className="text-caption-1-medium text-text-tertiary">Google review</p>
                  </div>
                </div>
                <span aria-hidden="true" className="text-display-3-medium text-accent-200">“</span>
              </div>
              <p aria-label="5 out of 5 stars" className="mt-6 text-body-medium tracking-widest text-accent-600">★★★★★</p>
              <blockquote className="mt-4 flex-1 text-title-3-medium text-text-primary">{review.quote}</blockquote>
              <div className="mt-7 flex items-center gap-2 border-t border-separator-border pt-5 text-caption-1-medium text-text-tertiary">
                <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
                <span>Shared on Google</span>
              </div>
            </SpotlightCard>
          </article>
        ))}
      </div>
      <LinkButton href="https://www.google.com/maps/search/?api=1&query=Vidyam%20Home%20Tuition%20Wadala%20Mumbai" target="_blank" rel="noopener noreferrer" trailingIcon={RiExternalLinkLine} className="mt-7">
        Read more on Google Maps
      </LinkButton>
    </section>
  );
}
