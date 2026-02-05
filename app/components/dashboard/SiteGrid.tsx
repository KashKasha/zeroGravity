"use client";

import { SiteCard } from "./SiteCard";
import { AddSiteCard } from "./AddSiteCard";
import { useTheme } from "@/lib/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { DashboardSite } from "@/data/dashboard";

interface SiteGridProps {
  sites: DashboardSite[];
  onVisitSite?: (site: DashboardSite) => void;
  onManageSite?: (site: DashboardSite) => void;
  onAddSite?: () => void;
}

export function SiteGrid({ sites, onVisitSite, onManageSite, onAddSite }: SiteGridProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className={cn(
            "text-lg font-semibold",
            isLight ? "text-zinc-900" : "text-zinc-100"
          )}>
            Your Sites
          </h2>
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-md",
            isLight ? "bg-zinc-100 text-zinc-600" : "bg-zinc-800 text-zinc-400"
          )}>
            {sites.length}
          </span>
        </div>
        <button
          onClick={onAddSite}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
            isLight
              ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Site
        </button>
      </div>

      {/* Site Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <SiteCard
            key={site.name}
            site={site}
            onVisit={() => onVisitSite?.(site)}
            onManage={() => onManageSite?.(site)}
          />
        ))}
        <AddSiteCard onClick={onAddSite} />
      </div>
    </div>
  );
}
