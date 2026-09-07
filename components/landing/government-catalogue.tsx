"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Building2, Globe, Clock, ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { organizations, PASTEL_COLORS, type Organization } from "@/data/organizations";

const PAGE_SIZE = 8;

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
function OrganizationModal({
  org,
  colorIndex,
  onClose,
}: {
  org: Organization;
  colorIndex: number;
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

  const color = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={org.name}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-white shadow-xl dark:bg-gray-900"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted-foreground shadow-sm transition-colors hover:bg-white hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={cn("px-6 pb-4 pt-8 text-center", color.bg)}>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <img src={org.logo} alt={org.name} className="h-14 w-14 object-contain" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">{org.name}</h3>
          <Badge variant="outline" className="mt-2">Government Service</Badge>
        </div>

        <div className="space-y-3 px-6 py-5">
          {org.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{org.description}</p>
          )}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-border/50 bg-muted/20 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Category</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{org.category}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-muted/20 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Status</p>
              <p className="mt-0.5 text-sm font-medium text-success">{org.status}</p>
            </div>
          </div>
          {org.website && (
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-3">
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-sm text-primary underline-offset-2 hover:underline">
                {org.website.replace("https://", "")}
              </a>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </div>
          )}
          {org.officeHours && (
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-3">
              <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-foreground">{org.officeHours}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-border/50 px-6 py-4">
          <Button variant="default" size="lg" className="flex-1" asChild>
            <a href={org.website || "#"} target={org.website ? "_blank" : undefined} rel={org.website ? "noopener noreferrer" : undefined}>
              <ExternalLink className="h-4 w-4" /> Visit Service
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
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
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    const idx = organizations.findIndex((o) => o.id === org.id);
    setSelectedIndex(idx);
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
          <div className="relative py-4">
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

      {/* Modal */}
      <AnimatePresence>
        {selectedOrg && (
          <OrganizationModal
            key={selectedOrg.id}
            org={selectedOrg}
            colorIndex={selectedIndex}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
