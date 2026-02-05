"use client";

import { useTheme } from "@/lib/context/ThemeContext";
import { cn } from "@/lib/utils";

export function SettingsHeader() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="mb-6">
      <h1 className={cn(
        "text-2xl font-bold",
        isLight ? "text-zinc-800" : "text-zinc-100"
      )}>Settings</h1>
      <p className={cn(
        "text-sm mt-1",
        isLight ? "text-zinc-500" : "text-zinc-400"
      )}>Manage your account preferences and configurations</p>
    </div>
  );
}
