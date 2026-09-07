"use client";

import { MapPin, Clock, Phone, Mail, Navigation, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/MESOB+center/@9.003299,38.800196,511m/data=!3m1!1e3!4m6!3m5!1s0x164b85006e9cfdbd:0xfad648311c9f71d4!8m2!3d9.0033465!4d38.8001631!16s%2Fg%2F11mdbzhp84?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=MESOB+Center+Addis+Ababa+Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed";

const INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "MESOB Center, Addis Ababa, Ethiopia",
  },
  {
    icon: Clock,
    label: "Operating Hours",
    value: "Monday – Friday: 8:00 AM – 6:00 PM",
  },
  {
    icon: Phone,
    label: "Contact",
    value: "+251 11 123 4567",
    href: "tel:+251111234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@mesob.gov.et",
    href: "mailto:info@mesob.gov.et",
  },
];

export function Locations() {
  return (
    <section
      id="locations"
      className="primary-band relative overflow-hidden border-b border-primary-foreground/20 py-20"
    >
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
        {/* Heading */}
        <FadeIn direction="up">
          <div className="mb-14 max-w-4xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              Our Main Center
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              Visit our headquarters located in the heart of Addis Ababa
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Serving as the central hub for all MESOB operations
            </p>
          </div>
        </FadeIn>

        {/* Map + Info Grid */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Map */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 ">
              <div className="aspect-[16/9] w-full lg:aspect-[16/10]">
                <iframe
                  title="MESOB Center location on Google Maps"
                  src={MAP_EMBED_URL}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              </div>
              {/* Bottom bar */}
              <div className="flex items-center justify-between border-t border-white/15 px-5 py-3">
                <span className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  Addis Ababa, Ethiopia
                </span>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 transition-all hover:text-accent/80 hover:underline"
                >
                  View on Google Maps
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Info Card */}
          <FadeIn direction="right" className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-white/20  p-6">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-white/15 pb-5">

                <div>
                  <h3 className="text-lg font-semibold text-primary-foreground">
                    MESOB Headquarters
                  </h3>
                  <p className="text-xs font-medium text-accent">
                    Government Services Center
                  </p>
                </div>
              </div>

              {/* Info list */}
              <StaggerContainer className="mt-5 flex flex-1 flex-col gap-3">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <StaggerItem key={label}>
                    <div className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/10">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block truncate text-sm font-medium text-primary-foreground/90 transition-colors duration-200 hover:text-accent"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm font-medium text-primary-foreground/90">
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Get Directions button */}
              <div className="mt-6 border-t border-white/15 pt-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full gap-2 rounded-xl border border-white/30 bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
                >
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
                <p className="mt-2 text-center text-[11px] text-primary-foreground/40">
                  Open in Google Maps for turn-by-turn navigation
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
