import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Ask Vidyam Home Tuition about classes, subjects, teacher availability and free trial sessions. Call or email our team.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-12 lg:py-24">
      <Reveal className="flex flex-col items-start gap-8">
        <div className="flex flex-col gap-6">
          <p className="text-caption-1-semibold uppercase tracking-widest text-accent-700">Contact us</p>
          <h1 className="text-display-3-medium text-text-primary sm:text-display-2-medium">Let’s talk about your child’s learning.</h1>
          <p className="text-body-2-regular text-text-secondary">Tell us the class, board and subjects. If you’re looking for exam preparation, let us know the exam and target year.</p>
        </div>
        <div className="flex w-full flex-col gap-6 border-t border-separator-border pt-8">
          <div className="flex flex-col gap-2"><p className="text-caption-1-semibold uppercase tracking-widest text-text-tertiary">Call us</p><a href="tel:+919820438932" className="text-title-3-semibold text-accent-700 hover:underline">+91 98204 38932</a><a href="tel:+918591148341" className="text-title-3-semibold text-accent-700 hover:underline">+91 85911 48341</a></div>
          <div className="flex flex-col gap-2"><p className="text-caption-1-semibold uppercase tracking-widest text-text-tertiary">Email us</p><a href="mailto:info@vidyamhometuition.in" className="break-all text-body-medium text-accent-700 hover:underline">info@vidyamhometuition.in</a></div>
        </div>
        <p className="rounded-2xl bg-accent-50 p-5 text-body-regular text-text-secondary">Free trials are available. Ask us about the subject and a suitable time when you get in touch.</p>
      </Reveal>
      <Reveal delay={0.08}><ContactForm /></Reveal>
    </section>
  );
}
