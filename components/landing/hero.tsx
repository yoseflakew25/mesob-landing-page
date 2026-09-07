"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HeroCtaButtons } from "@/components/landing/hero-cta-buttons";
import { ShieldCheck, Building2, Users } from "lucide-react";

const HERO_SLIDES = [
  {
    src: "/images/hero/hero-slide-1.jpg",
    alt: "MESOB Center - Modern government service center in Ethiopia",
    headline: "67+ Public Services",
    subtext: "All accessible under one roof",
  },
  {
    src: "/images/hero/hero-slide-2.jpg",
    alt: "MESOB Center - Citizens accessing government services",
    headline: "8+ Government Institutions",
    subtext: "Unified service delivery system",
  },
  {
    src: "/images/hero/hero-slide-3.jpg",
    alt: "MESOB Center - Integrated one-stop service delivery",
    headline: "30+ Cities Nationwide",
    subtext: "Expanding across Ethiopia",
  },
  {
    src: "/images/hero/hero-slide-4.png",
    alt: "MESOB Center - Digital transformation for Ethiopian public services",
    headline: "24/7 Digital Access",
    subtext: "Modernizing service delivery",
  },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Official Government Portal" },
  { icon: Building2, label: "8+ Government Institutions" },
  { icon: Users, label: "67+ Public Services" },
] as const;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      {/* Grid pattern background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Top-left accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="grid min-h-[82vh] lg:grid-cols-2 lg:items-center">
        {/* Left — text content (vertically centered) */}
        <div className="container relative z-10 mx-auto flex flex-col justify-center items-start pl-16">
          <Badge
            variant="outline"
            className="mb-4 w-fit border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent"
          >
            The New Horizon of Service!
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            FDRE <span className="text-primary">MESOB</span>
            <br />
            SERVICE
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Access multiple government institutions under one roof. MESOB Center
            modernizes public service delivery, reducing the time and effort
            needed to access essential government services.
          </p>

          <HeroCtaButtons />

          <div className="mt-10 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1"
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Edge-to-edge image slideshow (auto-advance only) */}
        <div className="relative h-[400px] lg:h-[82vh] overflow-hidden">
          {/* Slides */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="50vw"
                priority={index === 0}
                className="object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold text-accent lg:text-4xl">
                    {slide.headline}
                  </h2>
                  <p className="mt-2 text-base text-white/80">
                    {slide.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
