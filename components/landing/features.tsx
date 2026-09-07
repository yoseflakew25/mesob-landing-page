import {
  Globe,
  Users,
  Building2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const SERVICE_CATEGORIES = [
  {
    icon: Users,
    title: "For Local Customers",
    services: [
      "Providing 2-day urgent passport renewal service",
      "5-day urgent passport renewal service",
      "Urgent lost and damaged passport renewal services",
      "Providing urgent lost or stolen passport service",
    ],
  },
  {
    icon: Globe,
    title: "For International & Diaspora Customers",
    services: [
      "Providing urgent temporary residence permit card services",
      "Providing urgent permanent residence card services",
      "Providing investment visa services",
      "Work visa iv service provision",
      "Urgent Ethiopian origin ID card",
      "Urgent Ethiopian Origin ID card Service for those under 18 years of age",
    ],
  },
  {
    icon: Building2,
    title: "Government Services for Business",
    services: [
      "Document authentication and legalization for trade licenses, contracts, and foreign business documents",
      "Issuance of expatriate work permits",
      "Processing of work, investment, and residence visas",
      "Authentication of business contracts and powers of attorney",
      "Verification and recertification of educational documents",
      "National ID booking, printing, and updates",
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden border-b border-border/50 bg-background py-20">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-3xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              Our Services
            </span>
            <h2 className="text-5xl font-bold tracking-tight text-primary">
              Services tailored for every need
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From urgent passport renewals for local citizens to residence permits
              for diaspora and business services for companies — we cover it all.
            </p>
          </div>
        </FadeIn>

        {/* Service category cards */}
        <StaggerContainer>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map(({ icon: Icon, title, services }) => (
              <StaggerItem key={title}>
                <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04]">
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-semibold text-primary">
                    {title}
                  </h3>

                  {/* Services list */}
                  <ul className="mt-3 flex-1 space-y-2.5">
                    {services.map((service) => (
                      <li key={service} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="#contact">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
