"use client";

import { useState, type FormEvent } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Head Office",
    value: "Bole Road, Addis Ababa, Ethiopia",
    href: "https://maps.google.com/?q=Bole+Road+Addis+Ababa+Ethiopia",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@mesobcenter.et",
    href: "mailto:info@mesobcenter.et",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+251 11 554 1234",
    href: "tel:+251115541234",
  },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    errors.subject = "Please enter a subject";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter your message";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);
    setTouched(new Set(["name", "email", "subject", "message"]));

    if (Object.keys(validation).length > 0) return;

    setStatus("sending");

    // Simulate sending — in production, replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-white/5",
      errors[field] && touched.has(field)
        ? "border-destructive/40 focus:border-destructive focus:ring-destructive/20"
        : "border-border/70 hover:border-primary/30 focus:border-primary/50 focus:ring-primary/20"
    );

  if (status === "success") {
    return (
      <section id="contact" className="relative overflow-hidden border-b border-border/50 py-20">
        {/* Subtle grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
        />
        <div className="container relative mx-auto px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 shadow-inner">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">
                Message sent successfully!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Thank you for reaching out. Our team will review your inquiry
                and get back to you within 1–2 business days.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                onClick={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setErrors({});
                  setTouched(new Set());
                }}
              >
                Send another message
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative overflow-hidden border-b border-border/50 py-20">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-14 max-w-2xl">
            <Badge
              variant="outline"
              className="mb-4 w-fit border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent"
            >
              Get in Touch
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Get in touch with <br /> MESOB Center
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Have a question, feedback, or need assistance? Fill out the form
              below and our team will get back to you within 1&ndash;2 business days.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Contact info cards */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04] dark:hover:border-primary/40"
                >


                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      {value}
                    </p>
                  </div>
                  {href.startsWith("http") && (
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 self-start text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </a>
              ))}

              {/* Office hours */}
              <div className="rounded-2xl border border-dashed border-accent/20 bg-accent/[0.02] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">Office hours</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      Sunday – Thursday, 8:00 AM – 5:00 PM (local Ethiopian time)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-md dark:bg-white/[0.04] lg:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-medium text-foreground/80"
                  >
                    Full name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Abebe Kebede"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputClass("name")}
                    aria-invalid={!!errors.name && touched.has("name")}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && touched.has("name") && (
                    <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-medium text-foreground/80"
                  >
                    Email address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="abebe@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputClass("email")}
                    aria-invalid={!!errors.email && touched.has("email")}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && touched.has("email") && (
                    <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-xs font-medium text-foreground/80"
                >
                  Subject <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    className={cn(inputClass("subject"), "appearance-none")}
                    aria-invalid={!!errors.subject && touched.has("subject")}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  >
                    <option value="">Select a topic...</option>
                    <option value="Service Inquiry">Service Inquiry</option>
                    <option value="Document Requirements">Document Requirements</option>
                    <option value="Location & Hours">Location & Hours</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.subject && touched.has("subject") && (
                  <p id="subject-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-medium text-foreground/80"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={cn(inputClass("message"), "resize-y min-h-[120px]")}
                  aria-invalid={!!errors.message && touched.has("message")}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && touched.has("message") && (
                  <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center">
                <Badge variant="outline" className="border-accent/30 bg-accent/5 text-[10px] text-accent">
                  <Clock className="mr-1 h-3 w-3" />
                  Response within 1–2 business days
                </Badge>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="group w-full gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="mt-4 animate-fade-up rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4">
                  <p className="text-xs text-destructive">
                    Something went wrong. Please try again or email us directly at{" "}
                    <a
                      href="mailto:info@mesobcenter.et"
                      className="font-medium underline underline-offset-4 transition-colors hover:text-destructive/80"
                    >
                      info@mesobcenter.et
                    </a>
                  </p>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
