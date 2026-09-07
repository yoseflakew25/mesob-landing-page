import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About MESOB Center – Our Mission, Vision & Core Values",
  description:
    "Learn about MESOB Center's mission to transform Ethiopian public service delivery through innovation, efficiency, and dedication to serving all Ethiopian residents.",
  openGraph: {
    title: "About MESOB Center – Our Mission, Vision & Core Values",
    description:
      "Learn about MESOB Center's mission to transform Ethiopian public service delivery.",
  },
};

const CORE_VALUES = [
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Streamlining processes to deliver faster, more effective services to all residents.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Ensuring the highest standards of data protection and secure service delivery.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Making government services accessible to all Ethiopian residents, regardless of location.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero + Mission & Vision — merged into one primary band */}
        <section className="primary-band relative overflow-hidden">
          {/* Dot-grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Subtle radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]" />

          <div className="container relative mx-auto px-6 lg:px-8">
            {/* Hero heading */}
            <div className="py-16">
              <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
                <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  About Us
                </span>
                <h1 className="text-4xl font-semibold tracking-tight text-primary-foreground ">
                  About <span className="text-accent">MESOB</span> Center
                </h1>
                <p className="mt-2 text-base leading-relaxed text-primary-foreground/80">
                  Transforming public service delivery through innovation, efficiency, and
                  dedication to serving Ethiopian residents.
                </p>
              </FadeIn>
            </div>

            {/* Mission & Vision cards */}
            <div className="grid gap-8 pb-24 lg:grid-cols-2 lg:gap-12">
              {/* Mission */}
              <FadeIn direction="left">
                <div className="flex h-full flex-col rounded-2xl border border-white/20  p-8 hover:scale-105 transition-all duration-300 ease-in-out">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Our Mission
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
                    Seamless, efficient, and secure service delivery
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/80">
                    To establish a seamless, efficient, and secure one-stop service center
                    where Ethiopian residents can access essential government and
                    organizational services in a single location, reducing bureaucracy,
                    enhancing service efficiency, and fostering trust between residents and
                    service providers.
                  </p>
                </div>
              </FadeIn>

              {/* Vision */}
              <FadeIn direction="right">
                <div className="flex h-full flex-col rounded-2xl border border-white/20 p-8  hover:scale-105 transition-all duration-300 ease-in-out">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Our Vision
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
                    Ethiopia&apos;s premier service hub
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/80">
                    To become Ethiopia&apos;s premier digital and physical service hub,
                    integrating multiple organizations into a single, efficient, and secure
                    platform that transforms public service delivery, enhances resident
                    satisfaction, and sets a global benchmark for one-stop government service
                    centers.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative overflow-hidden py-20">
          {/* Grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            {/* Heading */}
            <FadeIn direction="up">
              <div className="mb-12 max-w-2xl">
                <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  Our Core Values
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-primary">
                  The principles that guide us
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Every service we deliver is rooted in these core values, ensuring that
                  Ethiopian residents receive the highest standard of public service.
                </p>
              </div>
            </FadeIn>

            {/* Values grid */}
            <StaggerContainer>
              <div className="grid gap-6 md:grid-cols-3">
                {CORE_VALUES.map(({ icon: Icon, title, description }) => (
                  <StaggerItem key={title}>
                    <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04] dark:hover:border-primary/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-primary">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* Bottom CTA */}
            <FadeIn direction="up" delay={0.3}>
              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link href="/#contact">
                    Get in touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
