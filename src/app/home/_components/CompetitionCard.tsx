"use client";

import Image from "next/image";
import { Clock, Coins, User } from "lucide-react";

interface CompetitionCardProps {
  tag: string;
  title: string;
  subtitle: string;
  participants: string;
  time: string;
  prizePoints: string;
  image: string;
  theme: "blue" | "purple" | "green" | "red";
  category: string; // for tab filtering
}

export default function CompetitionCard({
  tag,
  title,
  subtitle,
  participants,
  time,
  prizePoints,
  image,
  theme,
}: CompetitionCardProps) {
  
  // Custom styles map for the 4 card themes (light and dark modes)
  const themeStyles = {
    blue: {
      card: "bg-gradient-to-b from-[#0a1e3f] to-[#0a0118] dark:from-[#0a1e3f] dark:to-[#0a0118] border-blue-900/40 hover:border-blue-500/50 hover:shadow-blue-500/10 light-card:from-blue-50/70 light-card:to-white light-card:border-blue-200 light-card:hover:border-blue-400",
      tag: "bg-blue-500/10 text-blue-400 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
      glowSpot: "bg-blue-500/15 dark:bg-blue-500/20",
    },
    purple: {
      card: "bg-gradient-to-b from-[#240c3e] to-[#0a0118] dark:from-[#240c3e] dark:to-[#0a0118] border-purple-900/40 hover:border-purple-500/50 hover:shadow-purple-500/10 light-card:from-purple-50/70 light-card:to-white light-card:border-purple-200 light-card:hover:border-purple-400",
      tag: "bg-purple-500/10 text-purple-400 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30",
      glowSpot: "bg-purple-500/15 dark:bg-purple-500/20",
    },
    green: {
      card: "bg-gradient-to-b from-[#0a2f1d] to-[#0a0118] dark:from-[#0a2f1d] dark:to-[#0a0118] border-emerald-900/40 hover:border-emerald-500/50 hover:shadow-emerald-500/10 light-card:from-emerald-50/70 light-card:to-white light-card:border-emerald-200 light-card:hover:border-emerald-400",
      tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
      glowSpot: "bg-emerald-500/15 dark:bg-emerald-500/20",
    },
    red: {
      card: "bg-gradient-to-b from-[#3a0d16] to-[#0a0118] dark:from-[#3a0d16] dark:to-[#0a0118] border-red-900/40 hover:border-red-500/50 hover:shadow-red-500/10 light-card:from-red-50/70 light-card:to-white light-card:border-red-200 light-card:hover:border-red-400",
      tag: "bg-red-500/10 text-red-400 border-red-500/20 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30",
      glowSpot: "bg-red-500/15 dark:bg-red-500/20",
    },
  };

  const selectedStyle = themeStyles[theme];

  return (
    <div className={`group relative flex flex-col justify-between rounded-3xl border p-5 transition-all duration-300 hover:scale-[1.03] select-none hover:shadow-xl ${selectedStyle.card} dark:text-white text-slate-800 bg-card`}>
      
      {/* Top Section: Float Badge & Neon Background Glow Spot */}
      <div className="flex items-center justify-between w-full relative">
        <span className={`px-3 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${selectedStyle.tag}`}>
          {tag}
        </span>
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none -mr-4 -mt-4 ${selectedStyle.glowSpot}`} />
      </div>

      {/* Center Section: Float-effect 3D Image Illustration */}
      <div className="flex items-center justify-center py-6 relative">
        <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 ease-out">
          <Image
            src={image}
            alt={title}
            width={160}
            height={160}
            className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      {/* Middle Section: Card Title & Subtitle */}
      <div className="text-right w-full mt-2">
        <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed min-h-[32px]">
          {subtitle}
        </p>
      </div>

      {/* Bottom Section: Footer Details row (divider + icons) */}
      <div className="border-t border-border/40 mt-5 pt-4 flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground w-full font-sans">
        
        {/* Participants count */}
        <div className="flex items-center gap-1">
          <User className="h-3.5 w-3.5 text-muted-foreground/80" />
          <span className="font-semibold">{participants}</span>
        </div>

        {/* Remaining Time */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 border border-border/20 px-2 py-0.5 rounded-md">
          <Clock className="h-3.5 w-3.5 text-muted-foreground/80 animate-pulse" />
          <span className="font-semibold font-mono" dir="ltr">{time}</span>
        </div>

        {/* Prize Points */}
        <div className="flex items-center gap-1 font-semibold text-primary">
          <Coins className="h-3.5 w-3.5 fill-primary text-primary" />
          <span>{prizePoints}</span>
        </div>

      </div>

    </div>
  );
}
