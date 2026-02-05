"use client";

import { Button } from "@heroui/react";
import { useTheme } from "@/lib/context/ThemeContext";

interface DashboardHeaderProps {
  userName: string;
  onRefresh?: () => void;
  onAddSite?: () => void;
}

export function DashboardHeader({ userName, onRefresh, onAddSite }: DashboardHeaderProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
            isLight ? "from-zinc-800 to-zinc-600" : "from-zinc-100 to-zinc-300"
          }`}>Welcome back, {userName}</h1>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20 flex items-center gap-2 shadow-sm shadow-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All systems online
          </span>
        </div>
        <p className={`text-sm ${isLight ? "text-zinc-600" : "text-zinc-500"}`}>Here&apos;s your hosting overview for today.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all group ${
            isLight
              ? "bg-zinc-100/50 hover:bg-zinc-100 border-transparent hover:border-zinc-200"
              : "bg-[#27272A]/50 hover:bg-[#27272A] border-transparent hover:border-[#3F3F46]"
          }`}
        >
          <svg className={`w-5 h-5 transition-colors ${
            isLight ? "text-zinc-500 group-hover:text-zinc-700" : "text-zinc-400 group-hover:text-zinc-200"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
        </button>
        <Button
          onClick={onAddSite}
          className="font-semibold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all gap-2 rounded-xl h-10"
          startContent={
            <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </div>
          }
        >
          Add New Site
        </Button>
      </div>
    </div>
  );
}
