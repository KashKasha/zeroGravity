"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../components/AppShell";
import {
  DashboardHeader,
  PromoBanner,
  SiteGrid,
  ActivityFeed,
  UpgradeModal,
  ActivityDetailModal,
} from "../components/dashboard";
import { DASHBOARD_SITES, DASHBOARD_ACTIVITIES, type DashboardSite, type DashboardActivity } from "@/data/dashboard";
import { createRoute } from "@/config/routes";

export default function DashboardPage() {
  const router = useRouter();
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<DashboardActivity | null>(null);
  const [isActivityDetailOpen, setIsActivityDetailOpen] = useState(false);

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log("Refreshing data...");
  };

  const handleVisitSite = (site: DashboardSite) => {
    window.open(site.url, "_blank");
  };

  const handleManageSite = (site: DashboardSite) => {
    router.push(createRoute.site(site.name));
  };

  const handleViewAllActivity = () => {
    // TODO: Navigate to activity page
    console.log("Viewing all activity...");
  };

  const handleViewActivityDetails = (activity: DashboardActivity) => {
    setSelectedActivity(activity);
    setIsActivityDetailOpen(true);
  };

  const handleGoToActivitySite = (activity: DashboardActivity) => {
    window.open(`https://${activity.site}`, "_blank");
  };

  return (
    <AppShell>
      <DashboardHeader
        userName="Lime"
        onRefresh={handleRefresh}
      />

      <PromoBanner onUpgrade={() => setIsUpgradeOpen(true)} />

      <SiteGrid
        sites={DASHBOARD_SITES}
        onVisitSite={handleVisitSite}
        onManageSite={handleManageSite}
      />

      <ActivityFeed
        activities={DASHBOARD_ACTIVITIES}
        onViewAll={handleViewAllActivity}
        onViewDetails={handleViewActivityDetails}
        onGoToSite={handleGoToActivitySite}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      />

      <ActivityDetailModal
        isOpen={isActivityDetailOpen}
        onClose={() => setIsActivityDetailOpen(false)}
        activity={selectedActivity}
        onGoToSite={() => selectedActivity && handleGoToActivitySite(selectedActivity)}
      />
    </AppShell>
  );
}
