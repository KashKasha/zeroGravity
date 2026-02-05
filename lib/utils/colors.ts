/**
 * Shared color class definitions for consistent theming.
 * Eliminates duplication across Sidebar, Dashboard, Settings, and Services pages.
 */

export interface ColorClasses {
  bg: string;
  text: string;
  ring: string;
  activeBg: string;
  glow?: string;
  progress?: string;
  gradient?: string;
}

/**
 * Color class mappings for the application.
 * Each color variant includes background, text, ring, and active states.
 */
export const COLOR_CLASSES: Record<string, ColorClasses> = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
    activeBg: "bg-emerald-500/15",
    glow: "from-emerald-500/20",
    progress: "bg-emerald-500",
    gradient: "from-emerald-500 to-emerald-600",
  },
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    ring: "ring-sky-500/20",
    activeBg: "bg-sky-500/15",
    glow: "from-sky-500/20",
    progress: "bg-sky-500",
    gradient: "from-sky-500 to-sky-600",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    ring: "ring-violet-500/20",
    activeBg: "bg-violet-500/15",
    glow: "from-violet-500/20",
    progress: "bg-violet-500",
    gradient: "from-violet-500 to-violet-600",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    ring: "ring-amber-500/20",
    activeBg: "bg-amber-500/15",
    glow: "from-amber-500/20",
    progress: "bg-amber-500",
    gradient: "from-amber-500 to-amber-600",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    ring: "ring-rose-500/20",
    activeBg: "bg-rose-500/15",
    glow: "from-rose-500/20",
    progress: "bg-rose-500",
    gradient: "from-rose-500 to-rose-600",
  },
  pink: {
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    ring: "ring-pink-500/20",
    activeBg: "bg-pink-500/15",
    glow: "from-pink-500/20",
    progress: "bg-pink-500",
    gradient: "from-pink-500 to-pink-600",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    ring: "ring-cyan-500/20",
    activeBg: "bg-cyan-500/15",
    glow: "from-cyan-500/20",
    progress: "bg-cyan-500",
    gradient: "from-cyan-500 to-cyan-600",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    ring: "ring-indigo-500/20",
    activeBg: "bg-indigo-500/15",
    glow: "from-indigo-500/20",
    progress: "bg-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
  },
  zinc: {
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    ring: "ring-zinc-500/20",
    activeBg: "bg-zinc-500/15",
    glow: "from-zinc-500/20",
    progress: "bg-zinc-500",
    gradient: "from-zinc-500 to-zinc-600",
  },
} as const;

export type ColorKey = keyof typeof COLOR_CLASSES;

/**
 * Get color classes for a given color key.
 * Falls back to emerald if the color is not found.
 */
export function getColorClasses(color: string): ColorClasses {
  return COLOR_CLASSES[color] || COLOR_CLASSES.emerald;
}
