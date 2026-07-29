"use client";

import Link from "next/link";
import { ArrowRight, Monitor, HeadphonesIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

const HIGHLIGHTS = [
  { icon: Monitor, title: "Digital Services", subtitle: "Apply for permits online" },
  { icon: HeadphonesIcon, title: "Citizen Support", subtitle: "24/7" },
  { icon: Zap, title: "Quick Processing", subtitle: "Fast and efficient service" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-border/50 py-20">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — Text content */}
          <FadeIn direction="left">
            <div>
              <Badge
                variant="outline"
                className="mb-4 w-fit border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent"
              >
                Serving Our Community with Excellence
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                One <span className="text-primary">MESOB</span> Center, endless possibilities
              </h2>

              <p className="mt-5 text-md leading-relaxed text-muted-foreground">
                In one <span className="text-primary">MESOB</span> Center, we bring together essential government services,
                resources, and information into one seamless digital platform. Whether
                you are applying for permits, accessing public records, or exploring
                social services, our citizen-first hub is designed to make your
                experience faster, easier, and more transparent.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Navigate through the website to understand the required documents,
                processing time, and fees for each service. Interact with multiple
                government institutions — all in one place.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link href="#services">
                    Explore Services <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right — Feature highlights */}
          <FadeIn direction="right">
            <div className="space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04] dark:hover:border-primary/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-primary/80">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/75">
                      {subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
