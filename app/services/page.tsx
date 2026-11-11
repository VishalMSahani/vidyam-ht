import type { Metadata } from "next";
import Image from "next/image";
import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { SectionHeading } from "@/components/section-heading";
import { TrialCta } from "@/components/trial-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Home Tuition Services in Mumbai",
  description: "Explore home tuition in Mumbai for nursery to class 12, CBSE, ICSE, IB and state boards, plus JEE, NEET, MHT-CET and NDA preparation.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Home Tuition Services in Mumbai", description: "School subject support and entrance exam preparation at home with Vidyam.", url: "/services/" },
};

const services = [
  {
    number: "01",
    title: "School tuition",
    description: "Support for everyday lessons, homework questions and topics that need more practice, from nursery through class 12.",
    detail: "Share your child’s class, subjects and board so we can discuss a suitable teacher.",
  },
  {
    number: "02",
    title: "Exam preparation",
    description: "Subject-focused tuition for students preparing for entrance and competitive exams, including JEE, NEET, MHT-CET and NDA.",
    detail: "Tell us the exam, target year and areas where help is needed.",
  },
  {
    number: "03",
    title: "Computer and other subjects",
    description: "From computer studies to the subjects your school syllabus calls for, we can discuss the right subject support.",
    detail: "A different subject may call for a different teacher.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <Reveal className="flex flex-col items-start gap-7">
          <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">Our services</p>
          <h1 className="text-display-3-medium text-text-primary sm:text-display-2-medium">The right help for each stage of learning.</h1>
          <p className="max-w-xl text-body-2-regular text-text-secondary">From early school years to exam preparation, we can discuss home tuition around the subjects and schedule that matter to your family.</p>
          <ButtonLink href="/contact/" trailingIcon={RiArrowRightLine} className="h-11 rounded-full px-5">Ask about tuition</ButtonLink>
        </Reveal>
        <Reveal className="overflow-hidden rounded-3xl bg-accent-50" delay={0.08}>
          <Image src="/images/service-mumbai.png" alt="Male tutor helping a student study in a Mumbai high-rise home" width={1400} height={1050} priority sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
      </section>

      <section className="bg-background-primary-default py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal><SectionHeading eyebrow="Tuition options" title="Tell us where support would help." description="These are the main areas families ask us about. We’ll talk through teacher availability and fit when you get in touch." /></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.number} className="h-full" delay={index * 0.08}>
              <article className="flex h-full flex-col gap-5 rounded-3xl border border-border-button-default bg-background-full p-7 sm:p-8">
                <span className="text-caption-1-semibold text-accent-600">{service.number}</span>
                <h2 className="text-title-2-medium text-text-primary">{service.title}</h2>
                <p className="text-body-regular text-text-secondary">{service.description}</p>
                <p className="mt-auto border-t border-separator-border pt-5 text-caption-1-medium text-text-tertiary">{service.detail}</p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading eyebrow="School learning" title="Your board and syllabus matter." />
          <p className="text-body-regular text-text-secondary">Let us know which curriculum your child follows. Vidyam offers tuition enquiries for these school boards:</p>
          <div className="flex flex-wrap gap-2">
            {["CBSE", "ICSE", "IB", "State boards"].map((board) => <span key={board} className="rounded-full border border-border-button-default bg-background-primary-default px-5 py-2 text-body-medium text-text-primary">{board}</span>)}
          </div>
        </Reveal>
        <Reveal className="flex flex-col gap-6 border-t border-separator-border pt-8 lg:border-s lg:border-t-0 lg:ps-16 lg:pt-0" delay={0.08}>
          <SectionHeading eyebrow="Exam goals" title="Preparation with a clear focus." />
          <p className="text-body-regular text-text-secondary">For entrance and competitive exams, tell us where the student is now and what they’re working towards.</p>
          <div className="flex flex-wrap gap-2">
            {["JEE", "NEET", "MHT-CET", "NDA"].map((exam) => <span key={exam} className="rounded-full border border-border-button-default bg-background-primary-default px-5 py-2 text-body-medium text-text-primary">{exam}</span>)}
          </div>
        </Reveal>
      </section>
      <Reveal><TrialCta /></Reveal>
    </>
  );
}
