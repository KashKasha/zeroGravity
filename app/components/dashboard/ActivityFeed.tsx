"use client";

import { ActivityItem } from "./ActivityItem";
import { SectionHeader } from "../ui/SectionHeader";
import { useTheme } from "@/lib/context/ThemeContext";
import type { DashboardActivity } from "@/data/dashboard";

interface ActivityFeedProps {
  activities: DashboardActivity[];
  onViewAll?: () => void;
  onViewDetails?: (activity: DashboardActivity) => void;
  onGoToSite?: (activity: DashboardActivity) => void;
}

export function ActivityFeed({ activities, onViewAll, onViewDetails, onGoToSite }: ActivityFeedProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="mb-10">
      <SectionHeader
        title="Recent Activity"
      />
      <div className={`relative rounded-2xl overflow-hidden ${
        isLight
          ? "bg-white border border-zinc-200"
          : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border border-[#2A2A2E]"
      }`}>
        {/* Corner Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-60" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className={`relative divide-y ${isLight ? "divide-zinc-100" : "divide-[#2A2A2E]"}`}>
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              activity={activity}
              isFirst={index === 0}
              isLast={index === activities.length - 1}
              onViewDetails={() => onViewDetails?.(activity)}
              onGoToSite={() => onGoToSite?.(activity)}
            />
          ))}
        </div>

        {/* Footer with View All */}
        <div className={`relative border-t bg-gradient-to-t from-violet-500/[0.02] to-transparent ${
          isLight ? "border-zinc-200" : "border-[#2A2A2E]"
        }`}>
          <button
            onClick={onViewAll}
            className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors group/btn"
          >
            <span>View all activity</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
