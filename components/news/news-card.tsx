import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/data/news";
import {
  getNewsCategoryBadgeClasses,
  getNewsCategoryIcon,
} from "@/components/news/news-category";

export function NewsCard({ article }: { article: NewsArticle }) {
  const CategoryIcon = getNewsCategoryIcon(article.category);
  const badgeClasses = getNewsCategoryBadgeClasses(article.category);

  return (
    <Link
      href={`/news/${article.id}`}
      aria-label={`Read article: ${article.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:bg-white/[0.04] dark:hover:border-primary/40"
    >
      {/* Visual header */}
      <div className="primary-band relative h-36 overflow-hidden">
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
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 transition-transform duration-300 ease-out group-hover:scale-110">
            <CategoryIcon className="h-8 w-8 text-accent" aria-hidden />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              badgeClasses
            )}
          >
            <CategoryIcon className="h-3 w-3" aria-hidden />
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" aria-hidden />
            {article.date}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-primary/80">
          {article.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.subtitle}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Read article
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
