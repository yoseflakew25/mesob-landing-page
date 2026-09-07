import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { NEWS_ARTICLES } from "@/data/news";
import { NewsCard } from "@/components/news/news-card";
import {
  getNewsCategoryBadgeClasses,
  getNewsCategoryIcon,
} from "@/components/news/news-category";

export const metadata: Metadata = {
  title: "News – MESOB Center | Latest Announcements & Updates",
  description:
    "Stay informed with the latest announcements, partnerships, and service updates from Ethiopia's premier one-stop service center.",
  openGraph: {
    title: "News – MESOB Center | Latest Announcements & Updates",
    description:
      "Latest announcements, partnerships, and service updates from MESOB Center.",
  },
};

export default function NewsPage() {
  const [featured, ...rest] = NEWS_ARTICLES;
  const FeaturedIcon = getNewsCategoryIcon(featured.category);
  const featuredBadge = getNewsCategoryBadgeClasses(featured.category);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="primary-band relative overflow-hidden py-16">
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
            <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                News &amp; Updates
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
                Latest from <span className="text-accent">MESOB</span> Center
              </h1>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                Stay informed with the latest announcements, service updates, and
                developments from Ethiopia&apos;s premier one-stop service center.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Featured story */}
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <Link
                href={`/news/${featured.id}`}
                aria-label={`Read featured article: ${featured.title}`}
                className="group grid overflow-hidden rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg dark:bg-white/[0.04] dark:hover:border-primary/40 lg:grid-cols-2"
              >
                {/* Visual side */}
                <div className="primary-band relative min-h-[240px] overflow-hidden lg:min-h-0">
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
                  {/* Radial glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]"
                  />
                  {/* Category icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 transition-transform duration-300 ease-out group-hover:scale-105">
                      <FeaturedIcon className="h-12 w-12 text-accent" aria-hidden />
                    </div>
                  </div>
                  {/* Featured label */}
                  <span className="absolute left-5 top-5 inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                    Featured
                  </span>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${featuredBadge}`}
                    >
                      <FeaturedIcon className="h-3 w-3" aria-hidden />
                      {featured.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden />
                      {featured.date}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-primary transition-colors duration-300 group-hover:text-primary/80 lg:text-3xl">
                    {featured.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {featured.subtitle}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read article
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Article grid */}
        <section className="relative overflow-hidden pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="mb-10 max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  More news &amp; announcements
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {rest.length} more updates from MESOB Center — partnerships,
                  milestones, and leadership news.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <StaggerItem key={article.id}>
                    <NewsCard article={article} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
