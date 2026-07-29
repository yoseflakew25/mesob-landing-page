"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCtaButtons() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-80 md:w-96"
        />
      </div>
      
      {/* View Organizations button */}
      <Button size="lg" asChild>
        <Link href="#featured-properties">
          View Organizations <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
