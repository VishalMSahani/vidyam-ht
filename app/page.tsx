import Image from "next/image";
import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { LinkButton } from "@/components/base/buttons/link-button";
import { Accordion, AccordionItem } from "@/components/base/accordion/accordion";
import { SectionHeading } from "@/components/section-heading";
import { TrialCta } from "@/components/trial-cta";
import { Reveal } from "@/components/reveal";

const benefits = [
  {
    number: "01",
    title: "At your place",
    text: "A familiar space can make it easier to ask questions, practise and build a steady routine.",
    image: "/images/benefit-home.png",
    imageAlt: "A ready study table in a Mumbai apartment",
    width: 700,
    height: 394,
  },
  {
    number: "02",
    title: "A teacher for each subject",
    text: "Tell us where support is needed. We can discuss a subject-specific teacher for your learner.",
    image: "/images/benefit-subjects.png",
    imageAlt: "Tutor and student working through a geometry exercise",
    width: 700,
    height: 394,
  },
  {
    number: "03",
    title: "Room to learn",
    text: "Sessions can focus on the topics that need attention, from schoolwork to exam preparation.",
    image: "/images/benefit-questions.png",
    imageAlt: "A student asking a male tutor a question at home",
    width: 600,
    height: 338,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-20">
        <Reveal className="flex flex-col items-start gap-7">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-brand-highlight" />
            <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">Home tuition, thoughtfully matched</p>
          </div>
          <h1 className="max-w-2xl text-display-3-medium text-text-primary sm:text-display-2-medium xl:text-display-1-medium">
            A calmer way to learn, right at home.
          </h1>
          <p className="max-w-lg text-body-2-regular text-text-secondary">
            Personal support for school subjects and entrance exams, with a teacher who can focus on your child’s questions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact/" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6">
              Ask about a free trial
            </ButtonLink>
            <LinkButton href="/services/" variant="secondary" trailingIcon={RiArrowRightLine}>See our services</LinkButton>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-separator-border pt-6 text-caption-1-medium text-text-secondary">
            <span>Nursery to class 12</span>
            <span>CBSE · ICSE · IB · State boards</span>
          </div>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-3xl bg-accent-50" delay={0.08}>
          <Image
            src="/images/hero-mumbai.png"
            alt="Tutor and student studying beside a view of Mumbai high-rise buildings"
            width={1400}
            height={933}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-[4/3] h-full w-full object-cover object-right lg:aspect-[1.12]"
          />
        </Reveal>
      </section>

      <section className="border-y border-separator-border bg-background-primary-default">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:grid-cols-3 sm:px-8 lg:px-12">
          <Reveal><p className="text-title-3-semibold text-accent-700">School years</p><p className="mt-1 text-body-regular text-text-secondary">Nursery through class 12</p></Reveal>
          <Reveal delay={0.07}><p className="text-title-3-semibold text-accent-700">Different boards</p><p className="mt-1 text-body-regular text-text-secondary">CBSE, ICSE, IB and state boards</p></Reveal>
          <Reveal delay={0.14}><p className="text-title-3-semibold text-accent-700">Exam goals</p><p className="mt-1 text-body-regular text-text-secondary">JEE, NEET, MHT-CET and NDA</p></Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal><SectionHeading eyebrow="Why home tuition" title="More attention for the things that matter." description="A lesson is more useful when there is time to pause, ask again and work through the tricky part." /></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.number} delay={index * 0.08} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default">
              <Image src={benefit.image} alt={benefit.imageAlt} width={benefit.width} height={benefit.height} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
                <span className="text-caption-1-semibold text-accent-600">{benefit.number}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-title-3-semibold text-text-primary">{benefit.title}</h3>
                  <p className="text-body-regular text-text-secondary">{benefit.text}</p>
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-background-primary-default py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <Reveal className="overflow-hidden rounded-3xl bg-accent-50">
            <Image src="/images/service-mumbai.png" alt="Male tutor helping a student with a lesson in a Mumbai apartment" width={1400} height={1050} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <Reveal className="flex flex-col items-start gap-7" delay={0.08}>
            <SectionHeading eyebrow="What we teach" title="From everyday lessons to big exam goals." description="School tuition can cover core subjects, including computer studies. We can also discuss support for JEE, NEET, MHT-CET and NDA preparation." />
            <div className="flex flex-wrap gap-2">
              {["School subjects", "Computer studies", "Entrance exams"].map((item) => (
                <span key={item} className="rounded-full border border-border-button-default bg-background-full px-4 py-2 text-caption-1-medium text-text-secondary">{item}</span>
              ))}
            </div>
            <LinkButton href="/services/" trailingIcon={RiArrowRightLine}>Explore tuition options</LinkButton>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal><SectionHeading eyebrow="Getting started" title="A simple first conversation." description="Share the class, subjects and the areas that feel difficult. We’ll talk through what kind of support may fit." /></Reveal>
          <Reveal className="divide-y divide-separator-border border-t border-separator-border" delay={0.08}>
            {[
              ["01", "Tell us about your learner", "Let us know the class, board, subjects and exam goals, if any."],
              ["02", "Discuss the right fit", "We’ll talk about the schedule and a teacher suited to the subject."],
              ["03", "Try a session", "Ask us about a free trial before deciding how to continue."],
            ].map(([number, title, text]) => (
              <div key={number} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="text-caption-1-semibold text-accent-600">{number}</span>
                <div className="flex flex-col gap-2"><h3 className="text-title-3-semibold text-text-primary">{title}</h3><p className="text-body-regular text-text-secondary">{text}</p></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-background-primary-default py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <Reveal><SectionHeading eyebrow="Questions" title="A few things parents ask." /></Reveal>
          <Reveal delay={0.08}><Accordion variant="divided" className="border-t border-separator-border">
            <AccordionItem id="classes" title="Which classes do you cover?">We offer home tuition from nursery through class 12. Tell us your child’s class and subjects so we can discuss the right support.</AccordionItem>
            <AccordionItem id="boards" title="Which school boards can you help with?">Families can enquire about CBSE, ICSE, IB and state boards. Share the board and syllabus when you contact us.</AccordionItem>
            <AccordionItem id="exams" title="Do you support entrance exam preparation?">You can enquire about JEE, NEET, MHT-CET and NDA preparation. We’ll discuss the subject and teacher fit with you.</AccordionItem>
            <AccordionItem id="trial" title="Can we try a session first?">Free trials are available. Get in touch to ask about a suitable time and subject.</AccordionItem>
          </Accordion></Reveal>
        </div>
      </section>

      <Reveal className="pt-20 lg:pt-28"><TrialCta /></Reveal>
    </>
  );
}
