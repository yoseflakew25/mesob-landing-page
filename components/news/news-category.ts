import {
  Award,
  Building2,
  Crown,
  Handshake,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Category → icon                                                    */
/* ------------------------------------------------------------------ */
export const NEWS_CATEGORY_ICONS: Record<string, LucideIcon> = {
  Inauguration: Crown,
  Leadership: Building2,
  Achievement: Award,
  Partnership: Handshake,
};

export function getNewsCategoryIcon(category: string): LucideIcon {
  return NEWS_CATEGORY_ICONS[category] ?? Newspaper;
}

/* ------------------------------------------------------------------ */
/*  Category → badge color classes (for use on light surfaces)         */
/* ------------------------------------------------------------------ */
const NEWS_CATEGORY_BADGES: Record<string, string> = {
  Inauguration: "border-accent/30 bg-accent/5 text-accent",
  Leadership: "border-primary/30 bg-primary/5 text-primary",
  Achievement:
    "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  Partnership:
    "border-violet-500/30 bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
};

export function getNewsCategoryBadgeClasses(category: string): string {
  return NEWS_CATEGORY_BADGES[category] ?? NEWS_CATEGORY_BADGES.Partnership;
}
