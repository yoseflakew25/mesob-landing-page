import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NEWS_ARTICLES } from "@/data/news";
import { NewsCard } from "@/components/news/news-card";
import { getNewsCategoryIcon } from "@/components/news/news-category";

interface NewsArticlePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ id: String(article.id) }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = NEWS_ARTICLES.find((a) => String(a.id) === id);

  if (!article) {
    return { title: "Article not found – MESOB Center" };
  }

  return {
    title: `${article.title} – MESOB Center News`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = await params;
  const article = NEWS_ARTICLES.find((a) => String(a.id) === id);

  if (!article) notFound();

  const CategoryIcon = getNewsCategoryIcon(article.category);
  const paragraphs = article.content.split("\n\n").filter(Boolean);
  const related = NEWS_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
       
        {/* Article hero */}
        <section className="primary-band relative overflow-hidden py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up" className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                <CategoryIcon className="h-3.5 w-3.5" aria-hidden />
                {article.category}
              </span>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
                {article.subtitle}
              </p>
              <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-primary-foreground/80">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {article.date}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Article content */}
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="mx-auto max-w-3xl space-y-5">
                {paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="whitespace-pre-line text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>

            {/* In-article CTA */}
            <FadeIn direction="up" delay={0.2}>
              <div className="mx-auto mt-14 flex max-w-3xl flex-col items-start justify-between gap-4 rounded-2xl border border-accent/20 bg-accent/[0.03] p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Questions about our services?
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Call 9838 or visit a MESOB Center near you.
                  </p>
                </div>
                <Button size="sm" asChild className="shrink-0">
                  <Link href="/contact">
                    Contact us
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Related news */}
        <section className="relative overflow-hidden border-t border-border/50 py-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]"
          />
          <div className="container relative mx-auto px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-primary">
                  More news
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Other announcements from MESOB Center
                </p>
              </div>
            </FadeIn>

            <StaggerContainer>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedArticle) => (
                  <StaggerItem key={relatedArticle.id}>
                    <NewsCard article={relatedArticle} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            <FadeIn direction="up" delay={0.2}>
              <div className="mt-10 text-center">
                <Button variant="outline" asChild>
                  <Link href="/news">
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    All news &amp; updates
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
