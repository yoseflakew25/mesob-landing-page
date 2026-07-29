"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About Us" },
] as const;

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState<(typeof LANGUAGES)[number]>(LANGUAGES[0]);
  const langRef = React.useRef<HTMLDivElement>(null);
  const links = NAV_LINKS;

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close language dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = React.useCallback(
    (href: string) => {
      if (href === "/") return pathname === href;
      if (href.startsWith("#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const navLinkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors duration-200 hover:bg-accent/15 hover:text-accent",
      isActive(href) && "bg-accent/20 text-accent"
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary-foreground/15 bg-primary dark:bg-[#314ea1]">
      <div className="container flex h-16 items-center justify-between gap-4 px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="MESOB Center home">
          <Image
            src="/images/Logo.png"
            alt="MESOB Center Logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-primary-foreground">
            <span className="text-accent">MESOB</span> Center
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={navLinkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle className="text-primary-foreground hover:bg-accent/15 hover:text-accent" />

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-primary-foreground/70 transition-colors duration-200 hover:bg-accent/15 hover:text-accent"
              aria-label={`Language: ${currentLang.label}`}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs uppercase">{currentLang.code}</span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  langOpen && "rotate-180"
                )}
              />
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-36 overflow-hidden rounded-lg border border-border/80 bg-background py-1 shadow-lg animate-slide-down"
                role="listbox"
                aria-label="Select language"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-primary/5",
                      currentLang.code === lang.code
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground"
                    )}
                    role="option"
                    aria-selected={currentLang.code === lang.code}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold uppercase">
                      {lang.code}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs">{lang.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {lang.native}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className="text-primary-foreground hover:bg-accent/15 hover:text-accent" />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="border-t border-primary-foreground/15 bg-primary dark:bg-[#314ea1] lg:hidden">
          <div className="container space-y-4 px-6 py-4 lg:px-8">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={navLinkClass(l.href)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Mobile language selector */}
            <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-3">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-primary-foreground/60">
                Language
              </p>
              <div className="flex gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                    }}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors duration-200",
                      currentLang.code === lang.code
                        ? "border-primary-foreground/40 bg-primary-foreground/15 font-medium text-primary-foreground"
                        : "border-primary-foreground/20 text-primary-foreground/60 hover:border-primary-foreground/40 hover:text-primary-foreground"
                    )}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary-foreground/30 text-[10px] font-semibold uppercase text-primary-foreground/70">
                      {lang.code}
                    </span>
                    <span className="text-xs">{lang.native}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
