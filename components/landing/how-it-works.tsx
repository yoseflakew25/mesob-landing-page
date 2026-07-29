import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const STEPS = [
  {
    step: "01",
    title: "Find Your Nearest MESOB Center",
    description:
      "Locate the MESOB Center in your city. Centers are available in Addis Ababa, Harar, Dire Dawa, and expanding across Ethiopia.",
  },
  {
    step: "02",
    title: "Check Service Requirements",
    description:
      "Visit our portal to review the required documents, fees, and processing times for the service you need before your visit.",
  },
  {
    step: "03",
    title: "Visit the Service Counter",
    description:
      "Arrive at the MESOB Center and proceed to the appropriate counter. Staff will guide you through the application process.",
  },
  {
    step: "04",
    title: "Receive Your Service",
    description:
      "Complete your transaction efficiently. Documents are processed on-site or within the published processing time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="primary-band relative overflow-hidden border-b border-primary-foreground/20 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]" />
      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left — heading + CTA */}
          <FadeIn direction="left" className="lg:pt-2">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              How It Works
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground">
              Get government services in four steps
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              From finding your nearest center to receiving your documents,
              MESOB Center makes accessing government services simple and efficient.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-8 border-white/35 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white dark:border-white/35 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
              asChild
            >
              <Link href="#features">
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>

          {/* Right — vertical timeline */}
          <StaggerContainer>
            <div className="relative flex flex-col gap-0">
              {STEPS.map(({ step, title, description }) => (
                <StaggerItem key={step} className="pb-10 last:pb-0">
                  <div className="group relative flex items-start gap-4 rounded-lg pr-3 transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]">
                    {/* Circle number */}
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-xs font-semibold text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/60 group-hover:bg-accent/20">
                      {step}
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1 transition-colors duration-300">
                      <h3 className="text-sm font-semibold text-primary-foreground transition-colors duration-300 group-hover:text-white">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/75 transition-colors duration-300 group-hover:text-primary-foreground/90">
                        {description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
