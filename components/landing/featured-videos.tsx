"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/motion";
import { featuredVideos, type FeaturedVideo } from "@/data/videos";
import { getYoutubeId, getThumbnail } from "@/utils/youtube";

/* ------------------------------------------------------------------ */
/*  Featured player                                                    */
/* ------------------------------------------------------------------ */
function VideoPlayer({ video }: { video: FeaturedVideo }) {
  const videoId = getYoutubeId(video.youtube);

  return (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="aspect-[16/9] w-full overflow-hidden"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={video.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Video list item (right side)                                       */
/* ------------------------------------------------------------------ */
function VideoListItem({
  video,
  isActive,
  onClick,
}: {
  video: FeaturedVideo;
  isActive: boolean;
  onClick: () => void;
}) {
  const thumbnail = getThumbnail(video.youtube);

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isActive
          ? "border-accent/50 bg-accent/15"
          : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
      )}
      aria-label={`Play ${video.title}`}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-white/10 md:w-28">
        <img
          src={thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Hide broken image, show placeholder
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Play icon overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/30">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300",
              isActive
                ? "bg-accent/90 text-white ring-2 ring-accent/50"
                : "bg-white/30 text-white ring-2 ring-white/40 group-hover:scale-110 group-hover:bg-accent group-hover:ring-accent/50 group-hover:text-white"
            )}
          >
            <Play className="ml-0.5 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-xs font-medium leading-snug transition-colors duration-200 md:text-sm",
            isActive
              ? "text-accent"
              : "text-primary-foreground/80 group-hover:text-primary-foreground"
          )}
        >
          {video.title}
        </p>
        <p className="mt-0.5 text-[10px] text-primary-foreground/40">
          Video {video.id} of {featuredVideos.length}
        </p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function FeaturedVideos() {
  const [selectedVideo, setSelectedVideo] = useState<FeaturedVideo>(featuredVideos[0]);

  const handleSelect = (video: FeaturedVideo) => {
    setSelectedVideo(video);
  };

  return (
    <section
      id="featured-videos"
      className="primary-band relative overflow-hidden border-b border-primary-foreground/20 py-20"
    >
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
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]"
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* ---- Heading ---- */}
        <FadeIn direction="up">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex w-fit rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
              Featured Videos
            </span>
            <h2 className="text-5xl font-bold tracking-tight text-primary-foreground">
              See MESOB in action
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Watch how MESOB Center is transforming public service delivery across Ethiopia.
            </p>
          </div>
        </FadeIn>

        {/* ---- Grid: Player (left) + List (right) ---- */}
        {/* 60/40 split — matches Locations section grid proportions */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Left — Featured player (3/5) */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10">
              <AnimatePresence mode="wait">
                <VideoPlayer key={selectedVideo.id} video={selectedVideo} />
              </AnimatePresence>
              {/* Video title bar — matches Locations map bottom bar pattern */}
              <div className="flex items-center justify-between border-t border-white/15 px-5 py-3">
                <p className="truncate text-sm font-medium text-primary-foreground">
                  Now playing:{" "}
                  <span className="text-accent">{selectedVideo.title}</span>
                </p>
                <span className="shrink-0 text-xs text-primary-foreground/50">
                  {selectedVideo.id} / {featuredVideos.length}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Right — Video list (2/5) */}
          <FadeIn direction="right" className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-white/20">
              {/* Header — matches Locations info card label pattern */}
              <div className="border-b border-white/15 px-5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">
                  All videos
                </p>
              </div>
              {/* Scrollable list */}
              <div className="flex-1 space-y-2 overflow-y-auto p-4 pt-3 max-h-[440px] [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
                {featuredVideos.map((video) => (
                  <VideoListItem
                    key={video.id}
                    video={video}
                    isActive={selectedVideo.id === video.id}
                    onClick={() => handleSelect(video)}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
