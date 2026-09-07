"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Building2, Globe, Clock, ArrowUpRight, ExternalLink, CheckCircle2, Wallet, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { organizations, PASTEL_COLORS, type Organization } from "@/data/organizations";

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/*  Drawer (slides in from the right)                                  */
/* ------------------------------------------------------------------ */
function OrganizationDrawer({
  org,
  onClose,
}: {
  org: Organization;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right side drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl dark:bg-gray-900 sm:w-1/2"
        role="dialog"
        aria-modal="true"
        aria-label={org.name}
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-primary/25 bg-gradient-to-b from-primary/[0.08] to-primary/[0.03] px-6 pb-6 pt-6 dark:from-primary/20 dark:to-primary/5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm ring-1 ring-primary/10 transition-colors hover:bg-white hover:text-foreground dark:bg-gray-800/90 dark:hover:bg-gray-800"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Avatar + name + service type */}
          <div className="flex items-center gap-4 pr-10">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-primary/15 sm:h-20 sm:w-20">
              <img src={org.logo} alt={org.name} className="h-11 w-11 object-contain sm:h-14 sm:w-14" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                Government Service
              </p>
              <h3 className="mt-0.5 text-base font-bold leading-snug text-primary sm:text-lg">
                {org.name}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-primary/25 bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                <Building2 className="h-3 w-3" /> {org.category}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {org.description && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">{org.description}</p>
          )}

          {/* Available services */}
          {org.services && org.services.length > 0 && (
            <div className="space-y-4 pt-1">
              {org.services.map((service) => {
                const feeLines = Array.isArray(service.serviceFee)
                  ? service.serviceFee
                  : service.serviceFee
                    ? [service.serviceFee]
                    : [];
                const feeRows = feeLines.map((line) => {
                  const idx = line.lastIndexOf(": ");
                  return idx > -1
                    ? { label: line.slice(0, idx), value: line.slice(idx + 2) }
                    : { label: "", value: line };
                });
                const docSections = service.documents
                  ? [{ label: "Required Documents", documents: service.documents }]
                  : (service.documentGroups ?? []).map((group) => ({
                      label: group.entityType,
                      documents: group.documents,
                    }));

                return (
                  <div key={service.title} className="overflow-hidden rounded-xl border border-primary/15 bg-primary/5 dark:border-primary/25 dark:bg-primary/10">
                    <div className="bg-primary px-5 py-3.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                        Available Service
                      </p>
                      <h4 className="mt-1 text-base font-semibold leading-snug text-white">{service.title}</h4>
                    </div>

                    <div className="space-y-4 px-5 py-4">
                      {/* Fee / processing time */}
                      {(feeRows.length > 0 || service.processingTime) && (
                        <div
                          className={cn(
                            "grid gap-3",
                            feeRows.length > 0 && service.processingTime ? "grid-cols-2" : "grid-cols-1"
                          )}
                        >
                          {feeRows.length > 0 && (
                            <div className="flex h-full flex-col rounded-xl border border-primary/20 bg-white p-3.5 shadow-sm dark:bg-gray-800/60">
                              <div className="flex items-center gap-1.5">
                                <Wallet className="h-3.5 w-3.5 shrink-0 text-primary" />
                                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Service Fee</p>
                              </div>
                              <ul className="mt-3 space-y-2">
                                {feeRows.map((row, i) => (
                                  <li key={`${row.value}-${i}`} className="text-sm">
                                    {row.label ? (
                                      <span className="flex items-start justify-between gap-3">
                                        <span className="text-muted-foreground">{row.label}</span>
                                        <span className="shrink-0 font-semibold text-foreground">{row.value}</span>
                                      </span>
                                    ) : (
                                      <span className="text-base font-bold text-foreground">{row.value}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {service.processingTime && (
                            <div className="flex h-full flex-col rounded-xl border border-primary/20 bg-white p-3.5 shadow-sm dark:bg-gray-800/60">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Processing Time</p>
                              </div>
                              <div className="mt-3 flex flex-1 items-center">
                                <p className="text-base font-bold leading-snug text-foreground">{service.processingTime}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Required participants */}
                      {service.requiredParticipants && service.requiredParticipants.length > 0 && (
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">Required Participant</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {service.requiredParticipants.map((participant) => (
                              <span
                                key={participant}
                                className="rounded-lg border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary dark:bg-gray-800/60"
                              >
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Required documents */}
                      {docSections.length > 0 && (
                        <div className="space-y-4">
                          {docSections.map((section) => (
                            <div key={section.label}>
                              <p className="text-sm font-semibold text-foreground">{section.label}</p>
                              <ul className="mt-2 space-y-1.5">
                                {section.documents.map((doc) => (
                                  <li key={doc} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                    {doc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Access link */}
                      {service.accessUrl && (
                        <a
                          href={service.accessUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                        >
                          Access Service <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-primary/15 bg-white p-3.5 shadow-sm dark:bg-gray-800/60">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Category</p>
              </div>
              <p className="mt-2 text-[15px] font-semibold text-foreground">{org.category}</p>
            </div>
            <div className="rounded-xl border border-primary/15 bg-white p-3.5 shadow-sm dark:bg-gray-800/60">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Status</p>
              </div>
              <p className="mt-2 text-[15px] font-semibold text-success">{org.status}</p>
            </div>
          </div>
          {org.website && (
            <div className="flex items-center gap-2.5 rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-3 dark:border-primary/25 dark:bg-primary/10">
              <Globe className="h-5 w-5 shrink-0 text-primary/60" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-[15px] text-primary underline-offset-2 hover:underline">
                {org.website.replace("https://", "")}
              </a>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-primary/60" />
            </div>
          )}
          {org.officeHours && (
            <div className="flex items-center gap-2.5 rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-3 dark:border-primary/25 dark:bg-primary/10">
              <Clock className="h-5 w-5 shrink-0 text-primary/60" />
              <span className="text-[15px] text-foreground">{org.officeHours}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex shrink-0 gap-3 border-t border-border/50 px-6 py-4">
          <Button variant="default" size="lg" className="flex-1" asChild>
            <a href={org.website || "#"} target={org.website ? "_blank" : undefined} rel={org.website ? "noopener noreferrer" : undefined}>
              <ExternalLink className="h-4 w-4" /> Visit Service
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Card                                                       */
/* ------------------------------------------------------------------ */
function ServiceCard({ org, colorIndex, onSelect }: { org: Organization; colorIndex: number; onSelect: () => void }) {
  const color = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex"
    >
      <button
        onClick={onSelect}
        className={cn(
          "group flex w-full flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          color.bg, color.border,
          "hover:-translate-y-1 hover:shadow-lg", color.hover
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
          <img src={org.logo} alt={org.name} className="h-14 w-14 object-contain" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-primary leading-tight transition-colors duration-300 group-hover:text-primary/80">{org.name}</h3>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-[10px] font-medium text-accent">
          <Building2 className="h-3 w-3" /> {org.category}
        </span>
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Chunks                                                        */
/* ------------------------------------------------------------------ */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export function GovernmentCatalogue() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [direction, setDirection] = useState(0); // -1 left, 1 right

  const pages = useMemo(() => chunkArray(organizations, PAGE_SIZE), []);

  const totalPages = pages.length;
  const currentOrgs = pages[currentPage] || [];

  // Reset to page 0 if current page exceeds available pages
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const handleSelect = useCallback((org: Organization) => {
    setSelectedOrg(org);
  }, []);

  const handleClose = useCallback(() => setSelectedOrg(null), []);

  const pageVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  // Compute page labels (show name ranges)
  const pageLabels = useMemo(() => {
    return pages.map((page) => {
      if (page.length === 0) return "Page";
      const firstName = page[0].shortName.split(" ")[0];
      const lastName = page[page.length - 1].shortName.split(" ")[0];
      return `${firstName} – ${lastName}`;
    });
  }, [pages]);

  return (
    <>
      <section id="government-catalogue" className="relative overflow-hidden border-b border-border/50 bg-background py-8 lg:py-20">
        {/* Grid overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="container relative mx-auto px-6 lg:px-8">
          {/* Heading */}
          <FadeIn direction="up">
            <div className="mx-auto mb-5 max-w-3xl text-center">
              <span className="mb-4 inline-flex w-fit rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                Government Service Catalogue
              </span>
              <h2 className="text-5xl font-bold tracking-tight text-primary">Browse Government Organizations</h2>
              <p className="mt-4 text-md leading-relaxed text-muted-foreground">
                Explore agencies, ministries, and services at MESOB Center.
              </p>
            </div>
          </FadeIn>



          {/* Carousel cards */}
          <div className="relative py-8">
            {/* Prev arrow */}
            {currentPage > 0 && (
              <button
                onClick={goPrev}
                className="absolute -left-16 top-1/2 z-20 hidden -translate-y-1/2 lg:flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl active:scale-95"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next arrow */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={goNext}
                className="absolute -right-16 top-1/2 z-20 hidden -translate-y-1/2 lg:flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl active:scale-95"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Cards grid with page transition */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {currentOrgs.map((org) => (
                    <ServiceCard
                      key={org.id}
                      org={org}
                      colorIndex={organizations.findIndex((o) => o.id === org.id)}
                      onSelect={() => handleSelect(org)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Page dots */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {/* Mobile prev */}
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all lg:hidden",
                  currentPage === 0
                    ? "bg-primary/30 text-white/50"
                    : "bg-primary text-white shadow hover:bg-primary/90"
                )}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    currentPage === i
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-primary/20 hover:bg-primary/40"
                  )}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}

              {/* Mobile next */}
              <button
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all lg:hidden",
                  currentPage === totalPages - 1
                    ? "bg-primary/30 text-white/50"
                    : "bg-primary text-white shadow hover:bg-primary/90"
                )}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Page counter */}
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Page {currentPage + 1} of {totalPages} &middot; {organizations.length} organizations total
          </p>
        </div>
      </section>

      {/* Drawer */}
      <AnimatePresence>
        {selectedOrg && (
          <OrganizationDrawer
            key={selectedOrg.id}
            org={selectedOrg}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
