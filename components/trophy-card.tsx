"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star, Crown, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  Trophy,
  Medal,
  Award,
  Star,
  Crown,
  Target,
};

export function TrophyCard({
  icon,
  title,
  issuer,
  date,
  image,
  imageContain,
  index,
}: {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  imageContain?: boolean; // true for certificates: show the whole page, not a crop
  index: number;
}) {
  const Icon = ICONS[icon] ?? Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex h-full w-[260px] shrink-0 snap-center flex-col border-2 border-foreground/15 bg-card transition-all hover:border-foreground hover:shadow-hard sm:w-[280px]"
    >
      {image ? (
        // Image-on-top: photo or certificate; certificates use contain so
        // the whole page shows. Click opens the full image in a new tab.
        <a
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] w-full overflow-hidden border-b-2 border-foreground/15 bg-white"
          title="Open full image"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="280px"
            className={`transition-transform duration-500 group-hover:scale-105 ${
              imageContain ? "object-contain" : "object-cover"
            }`}
          />
          <div className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background text-accent">
            <Icon className="h-4 w-4" />
          </div>
        </a>
      ) : (
        <div className="m-5 flex h-12 w-12 items-center justify-center border-2 border-foreground/30 bg-secondary text-accent">
          <Icon className="h-6 w-6" />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col p-5", image && "pt-4")}>
        <h3 className="font-display text-base font-bold leading-snug">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{issuer}</p>
        <p className="mt-auto pt-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          {date}
        </p>
      </div>
    </motion.div>
  );
}
