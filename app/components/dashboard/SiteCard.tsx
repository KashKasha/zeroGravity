"use client";

import { useTheme } from "@/lib/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { DashboardSite } from "@/data/dashboard";

interface SiteCardProps {
  site: DashboardSite;
  onVisit?: () => void;
  onManage?: () => void;
}

export function SiteCard({ site, onVisit, onManage }: SiteCardProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const healthStatus = site.health >= 80 ? "good" : site.health >= 60 ? "warning" : "critical";
  const healthColors = {
    good: isLight ? "text-zinc-700" : "text-zinc-300",
    warning: isLight ? "text-zinc-600" : "text-zinc-400",
    critical: isLight ? "text-zinc-500" : "text-zinc-500",
  };

  return (
    <div
      onClick={onManage}
      className={cn(
        "group relative rounded-xl transition-all duration-200 p-5 cursor-pointer",
        isLight
          ? "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md"
          : "bg-[#1C1C1F] border border-[#2A2A2E] hover:border-[#3A3A3E]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Site Avatar */}
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br",
            site.gradient
          )}>
            {site.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-semibold text-sm",
                isLight ? "text-zinc-900" : "text-zinc-100"
              )}>{site.name}</span>
              {/* Online indicator */}
              <span className="relative flex h-2 w-2">
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLight ? "bg-zinc-400" : "bg-zinc-500"}`}></span>
              </span>
            </div>
            <span className={cn(
              "text-xs",
              isLight ? "text-zinc-500" : "text-zinc-500"
            )}>{site.wordpress}</span>
          </div>
        </div>

        {/* External link button */}
        <button
          onClick={(e) => { e.stopPropagation(); onVisit?.(); }}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isLight
              ? "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
          )}
          aria-label="Visit site"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </div>

      {/* Stats Grid */}
      <div className={cn(
        "grid grid-cols-3 gap-3 py-3 border-y",
        isLight ? "border-zinc-100" : "border-zinc-800"
      )}>
        <div>
          <div className={cn(
            "text-[11px] uppercase tracking-wide mb-1",
            isLight ? "text-zinc-400" : "text-zinc-500"
          )}>Visits</div>
          <div className={cn(
            "text-sm font-semibold tabular-nums",
            isLight ? "text-zinc-800" : "text-zinc-200"
          )}>{site.visits}</div>
        </div>
        <div>
          <div className={cn(
            "text-[11px] uppercase tracking-wide mb-1",
            isLight ? "text-zinc-400" : "text-zinc-500"
          )}>Storage</div>
          <div className={cn(
            "text-sm font-semibold tabular-nums",
            isLight ? "text-zinc-800" : "text-zinc-200"
          )}>{site.storage}</div>
        </div>
        <div>
          <div className={cn(
            "text-[11px] uppercase tracking-wide mb-1",
            isLight ? "text-zinc-400" : "text-zinc-500"
          )}>Health</div>
          <div className={cn(
            "text-sm font-semibold tabular-nums",
            healthColors[healthStatus]
          )}>{site.health}%</div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className={cn(
            "text-xs",
            isLight ? "text-zinc-500" : "text-zinc-500"
          )}>CPU</span>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-24 h-1.5 rounded-full overflow-hidden",
              isLight ? "bg-zinc-100" : "bg-zinc-800"
            )}>
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isLight ? "bg-zinc-400" : "bg-zinc-500"
                )}
                style={{ width: `${site.cpu}%` }}
              />
            </div>
            <span className={cn(
              "text-xs tabular-nums w-8 text-right",
              isLight ? "text-zinc-600" : "text-zinc-400"
            )}>{site.cpu}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className={cn(
            "text-xs",
            isLight ? "text-zinc-500" : "text-zinc-500"
          )}>Memory</span>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-24 h-1.5 rounded-full overflow-hidden",
              isLight ? "bg-zinc-100" : "bg-zinc-800"
            )}>
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isLight ? "bg-zinc-400" : "bg-zinc-500"
                )}
                style={{ width: `${site.memory}%` }}
              />
            </div>
            <span className={cn(
              "text-xs tabular-nums w-8 text-right",
              isLight ? "text-zinc-600" : "text-zinc-400"
            )}>{site.memory}%</span>
          </div>
        </div>
      </div>

      {/* Manage Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onManage?.(); }}
        className={cn(
          "w-full mt-4 py-2.5 rounded-lg text-xs font-medium transition-colors",
          isLight
            ? "bg-zinc-900 text-white hover:bg-zinc-800"
            : "bg-zinc-100 text-zinc-900 hover:bg-white"
        )}
      >
        Manage Site
      </button>
    </div>
  );
}
