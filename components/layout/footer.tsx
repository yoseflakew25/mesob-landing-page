import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "All Services", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Organizations", href: "#featured-properties" },
      { label: "Service Requirements", href: "#features" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Addis Ababa", href: "#" },
      { label: "Harar", href: "#" },
      { label: "Dire Dawa", href: "#" },
      { label: "Coming Soon", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About MESOB", href: "#" },
      { label: "National Strategy", href: "#" },
      { label: "Digital Transformation", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
] as const;

const CONTACT_INFO = [
  { icon: Globe, label: "mesobcenter.et", href: "https://mesobcenter.et" },
  { icon: Mail, label: "info@mesobcenter.et", href: "mailto:info@mesobcenter.et" },
  { icon: Phone, label: "+251 11 123 4567", href: "tel:+251111234567" },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary-foreground/15 bg-primary dark:bg-[#314ea1]">
      {/* Dot-grid pattern */}
      <div
        aria-hidden
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
        {/* CTA Section — Merged from FinalCTA */}
        <div className="py-20 lg:py-24">
          <FadeIn direction="up" className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              Our Vision
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Transforming Ethiopia&apos;s Future
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Through our innovative <span className="text-accent">MESOB</span> one-stop service center, we are revolutionizing how Ethiopian
              residents interact with government services, creating a more connected, efficient, and
              transparent society for all.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-white text-primary shadow-none hover:bg-white/90 dark:bg-white dark:text-primary dark:hover:bg-white/90"
                asChild
              >
                <Link href="#features">
                  Explore services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/35 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white dark:border-white/35 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                asChild
              >
                <Link href="#how-it-works">How it works</Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20" />

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/Logo.png"
                alt="MESOB Center Logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-contain"
              />
              <span className="text-lg font-semibold tracking-tight text-primary-foreground">
                MESOB Center
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Modern Ethiopian Service for Organized Benefits. A government
              initiative to modernize public service delivery through integrated
              one-stop centers across Ethiopia.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-accent/20 py-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-accent/80">
              © {new Date().getFullYear()} MESOB Center. Government of Ethiopia. All rights reserved.
            </p>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent/80">
              Federal Government Initiative
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
