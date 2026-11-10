"use client";

import { useState, type FormEvent } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Textarea } from "@/components/base/textarea/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classOrExam, setClassOrExam] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Home tuition enquiry from ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Class or exam: ${classOrExam.trim()}`,
      "",
      message.trim() || "Please contact me about home tuition.",
    ].join("\n");
    window.location.href = `mailto:info@vidyamhometuition.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-sm sm:p-9">
      <div className="flex flex-col gap-2 pb-2">
        <h2 className="text-title-2-medium text-text-primary">Tell us a little about the learner</h2>
        <p className="text-body-regular text-text-secondary">We’ll fill an email with these details for you to review and send.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Your name" name="name" autoComplete="name" isRequired value={name} onChange={setName} placeholder="Your name" />
        <Input label="Phone number" name="phone" type="tel" autoComplete="tel" isRequired value={phone} onChange={setPhone} placeholder="Your number" />
      </div>
      <Input label="Class or exam" name="classOrExam" isRequired value={classOrExam} onChange={setClassOrExam} placeholder="For example, class 8 or NEET" />
      <Textarea label="What would you like help with?" name="message" value={message} onChange={setMessage} rows={4} placeholder="Subjects, board, preferred time or any questions" />
      <Button type="submit" trailingIcon={RiArrowRightLine} className="h-11 self-start rounded-full px-5">Prepare email</Button>
      <p role="status" className="text-caption-1-medium text-text-tertiary">
        {opened ? "Your email app should open with the enquiry. Please send it from there." : "This opens your email app. Your enquiry is sent only when you press Send there."}
      </p>
    </form>
  );
}
