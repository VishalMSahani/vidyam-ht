import type { Metadata } from "next";
import Image from "next/image";
import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { SectionHeading } from "@/components/section-heading";
import { TrialCta } from "@/components/trial-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About Our Mumbai Home Tuition",
  description: "Learn how Vidyam Home Tuition helps Mumbai families find subject-focused teaching at home for schoolwork and entrance exam preparation.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Vidyam Home Tuition", description: "Meet our approach to home tuition in Mumbai, shaped around each student and subject.", url: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <Reveal className="flex flex-col items-start gap-7">
          <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">About Vidyam</p>
          <h1 className="text-display-3-medium text-text-primary sm:text-display-2-medium">Learning is personal. Tuition should be too.</h1>
          <p className="max-w-xl text-body-2-regular text-text-secondary">Vidyam Home Tuition brings subject-focused teaching into a space students know well: their home. We help families discuss the support their child needs, from early school years to entrance exam preparation.</p>
          <ButtonLink href="/contact/" trailingIcon={RiArrowRightLine} className="h-11 rounded-full px-5">Talk to us</ButtonLink>
        </Reveal>
        <Reveal className="overflow-hidden rounded-3xl bg-accent-50" delay={0.08}>
          <Image src="/images/about-mumbai.png" alt="Tutor and parent discussing a student’s learning in a Mumbai home" width={1300} height={975} priority sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
      </section>

      <section className="bg-background-primary-default py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <Reveal><SectionHeading eyebrow="Our approach" title="Start with the student in front of us." description="Different subjects can call for different teachers. A useful first step is understanding the learner, their syllabus and the topics where they need a little more time." /></Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal><article className="flex h-full flex-col gap-4 rounded-3xl border border-border-button-default bg-background-full p-7">
              <p className="text-caption-1-semibold text-accent-600">01 / Listen</p>
              <h2 className="text-title-2-medium text-text-primary">Understand the need</h2>
              <p className="text-body-regular text-text-secondary">Tell us about the class, board, subjects and goals. The details help make the conversation useful.</p>
            </article></Reveal>
            <Reveal delay={0.08}><article className="flex h-full flex-col gap-4 rounded-3xl border border-border-button-default bg-background-full p-7">
              <p className="text-caption-1-semibold text-accent-600">02 / Match</p>
              <h2 className="text-title-2-medium text-text-primary">Find subject support</h2>
              <p className="text-body-regular text-text-secondary">We can discuss a teacher for the subject and a routine that works at home.</p>
            </article></Reveal>
            <Reveal className="sm:col-span-2" delay={0.14}><article className="flex flex-col gap-4 rounded-3xl border border-border-button-default bg-background-full p-7">
              <p className="text-caption-1-semibold text-accent-600">03 / Begin</p>
              <h2 className="text-title-2-medium text-text-primary">See how it feels</h2>
              <p className="text-body-regular text-text-secondary">Ask about a free trial. It’s a chance to meet, ask questions and decide what comes next.</p>
            </article></Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-28">
        <Reveal><SectionHeading eyebrow="Who we help" title="Support across the school years." /></Reveal>
        <Reveal className="flex flex-col gap-6 text-body-2-regular text-text-secondary" delay={0.08}>
          <p>Families can enquire about home tuition from nursery to class 12, including subjects taught under CBSE, ICSE, IB and state board syllabuses.</p>
          <p>For older students, we also discuss preparation for JEE, NEET, MHT-CET and NDA. Computer studies and other school subjects are part of the conversation too.</p>
          <p>The best place to begin is with the student’s current class and the topic they want help with.</p>
        </Reveal>
      </section>
      <Reveal><TrialCta /></Reveal>
    </>
  );
}
