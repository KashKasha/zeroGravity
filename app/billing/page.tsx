"use client";

import { useState } from "react";
import AppShell from "../components/AppShell";
import { useTheme } from "@/lib/context/ThemeContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Progress,
} from "@heroui/react";

const invoices = [
  { id: "INV-2026-001", date: "Jan 25, 2026", amount: "$49.00", status: "Paid", description: "Business Plan - Monthly" },
  { id: "INV-2025-012", date: "Dec 25, 2025", amount: "$49.00", status: "Paid", description: "Business Plan - Monthly" },
  { id: "INV-2025-011", date: "Nov 25, 2025", amount: "$49.00", status: "Paid", description: "Business Plan - Monthly" },
  { id: "INV-2025-010", date: "Oct 25, 2025", amount: "$9.00", status: "Paid", description: "Global CDN Add-on" },
  { id: "INV-2025-009", date: "Oct 25, 2025", amount: "$49.00", status: "Paid", description: "Business Plan - Monthly" },
  { id: "INV-2025-008", date: "Sep 25, 2025", amount: "$49.00", status: "Refunded", description: "Business Plan - Monthly" },
];

const usageItems = [
  { label: "Sites", current: 2, max: 5, icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418", color: "emerald" },
  { label: "Storage", current: 2.4, max: 50, unit: "GB", icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125", color: "sky" },
  { label: "Bandwidth", current: 45, max: 500, unit: "GB", icon: "M3 8l4-4m0 0l4 4m-4-4v12m14-4l-4 4m0 0l-4-4m4 4V4", color: "violet" },
  { label: "Backups", current: 14, max: 30, unit: "days", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", color: "amber" },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string; glow: string; progress: string; gradient: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20", glow: "from-emerald-500/10", progress: "bg-emerald-500", gradient: "from-emerald-500 to-emerald-600" },
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", ring: "ring-sky-500/20", glow: "from-sky-500/10", progress: "bg-sky-500", gradient: "from-sky-500 to-sky-600" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20", glow: "from-violet-500/10", progress: "bg-violet-500", gradient: "from-violet-500 to-violet-600" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20", glow: "from-amber-500/10", progress: "bg-amber-500", gradient: "from-amber-500 to-amber-600" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", ring: "ring-rose-500/20", glow: "from-rose-500/10", progress: "bg-rose-500", gradient: "from-rose-500 to-rose-600" },
};

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  Paid: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  Pending: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  Refunded: { bg: "bg-sky-500/10", text: "text-sky-400", dot: "bg-sky-400" },
  Failed: { bg: "bg-rose-500/10", text: "text-rose-400", dot: "bg-rose-400" },
};

export default function BillingPage() {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Billing</h1>
          <p className={`text-sm ${isLight ? "text-zinc-600" : "text-zinc-500"}`}>Manage your subscription, payment methods, and invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className={`font-semibold text-sm transition-all gap-2 rounded-xl ${
              isLight
                ? "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900"
                : "bg-[#27272A] text-zinc-200 hover:bg-[#3F3F46] hover:text-white"
            }`}
            startContent={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          >
            Manage Plan
          </Button>
          <Button
            className="font-semibold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white transition-all gap-2 rounded-xl shadow-lg shadow-emerald-500/20"
            startContent={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            }
          >
            Download Invoices
          </Button>
        </div>
      </div>

      {/* Current Subscription Card */}
      <div className={`mb-8 group relative overflow-hidden rounded-2xl border border-emerald-500/20 hover:border-emerald-500/30 transition-all ${
        isLight ? "bg-white" : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d]"
      }`}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.08] via-transparent to-sky-500/[0.08]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className={`text-xl font-bold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Business Plan</h2>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">Active</span>
                </span>
              </div>
              <p className={`text-sm ${isLight ? "text-zinc-600" : "text-zinc-500"}`}>Perfect for growing businesses with multiple sites</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-3xl font-bold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>$49</span>
                <span className={`text-sm ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>/month</span>
              </div>
              <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Billed monthly</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {usageItems.map((item) => {
              const colors = colorClasses[item.color];
              const percentage = (item.current / item.max) * 100;
              return (
                <div key={item.label} className={`rounded-xl p-4 border ${
                  isLight ? "bg-zinc-50 border-zinc-200" : "bg-[#18181B]/50 border-[#2A2A2E]"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.text} ring-1 ${colors.ring} flex items-center justify-center`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <span className={`text-xs font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>{item.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-lg font-bold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>{item.current}</span>
                    <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>/ {item.max} {item.unit || ""}</span>
                  </div>
                  <Progress
                    size="sm"
                    value={percentage}
                    classNames={{
                      base: "h-1.5",
                      track: isLight ? "bg-zinc-200" : "bg-[#27272A]",
                      indicator: `bg-gradient-to-r ${colors.gradient}`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Next Billing Info */}
          <div className={`mt-5 pt-5 border-t flex items-center justify-between ${
            isLight ? "border-zinc-200" : "border-[#2A2A2E]"
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Next billing date</p>
                <p className={`text-sm font-semibold ${isLight ? "text-zinc-700" : "text-zinc-200"}`}>February 25, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`text-sm font-medium transition-colors px-4 py-2 ${
                isLight ? "text-zinc-500 hover:text-zinc-700" : "text-zinc-400 hover:text-zinc-200"
              }`}>
                Cancel Plan
              </button>
              <button className="h-10 px-5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isLight ? "text-zinc-600" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <h2 className={`text-base font-semibold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Payment Methods</h2>
          </div>
          <Button
            className="font-semibold text-sm bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors rounded-xl gap-2"
            startContent={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Payment Method
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Credit Card */}
          <div
            onClick={() => setSelectedPayment("credit-card")}
            className={`group relative rounded-xl p-5 cursor-pointer transition-all overflow-hidden ${
              isLight
                ? selectedPayment === "credit-card"
                  ? "bg-white border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-white border border-zinc-200 hover:border-zinc-300"
                : selectedPayment === "credit-card"
                  ? "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border border-[#2A2A2E] hover:border-[#3F3F46]"
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${colorClasses.emerald.glow} to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorClasses.emerald.gradient} flex items-center justify-center shadow-lg shadow-emerald-500/20`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className={`font-semibold block ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Credit Card</span>
                    <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Visa ending in 4242</span>
                  </div>
                </div>
                {selectedPayment === "credit-card" && (
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-emerald-500/10 border-0",
                      content: "text-emerald-400 font-semibold text-[10px]"
                    }}
                  >
                    Default
                  </Chip>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-mono ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</p>
                <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Exp 12/27</span>
              </div>
            </div>
          </div>

          {/* Account Balance */}
          <div
            onClick={() => setSelectedPayment("balance")}
            className={`group relative rounded-xl p-5 cursor-pointer transition-all overflow-hidden ${
              isLight
                ? selectedPayment === "balance"
                  ? "bg-white border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-white border border-zinc-200 hover:border-zinc-300"
                : selectedPayment === "balance"
                  ? "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border border-[#2A2A2E] hover:border-[#3F3F46]"
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${colorClasses.sky.glow} to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorClasses.sky.gradient} flex items-center justify-center shadow-lg shadow-sky-500/20`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h2.25A2.25 2.25 0 0021 6v0a2.25 2.25 0 00-2.25-2.25H15" />
                      <path d="M3 12a2.25 2.25 0 012.25-2.25H9a3 3 0 100-6H6.75A2.25 2.25 0 003 6v0a2.25 2.25 0 002.25 2.25H9" />
                      <path d="M12 12v9m0-9l-3 3m3-3l3 3" />
                    </svg>
                  </div>
                  <div>
                    <span className={`font-semibold block ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Account Balance</span>
                    <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Prepaid credits</span>
                  </div>
                </div>
                {selectedPayment === "balance" && (
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-emerald-500/10 border-0",
                      content: "text-emerald-400 font-semibold text-[10px]"
                    }}
                  >
                    Default
                  </Chip>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>$247.50</span>
                  <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>available</span>
                </div>
                <button className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  Add Funds
                </button>
              </div>
            </div>
          </div>

          {/* Cryptocurrency */}
          <div
            onClick={() => setSelectedPayment("crypto")}
            className={`group relative rounded-xl p-5 cursor-pointer transition-all overflow-hidden ${
              isLight
                ? selectedPayment === "crypto"
                  ? "bg-white border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-white border border-zinc-200 hover:border-zinc-300"
                : selectedPayment === "crypto"
                  ? "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border-2 border-emerald-500/50 hover:border-emerald-500"
                  : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border border-[#2A2A2E] hover:border-[#3F3F46]"
            }`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${colorClasses.amber.glow} to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorClasses.amber.gradient} flex items-center justify-center shadow-lg shadow-amber-500/20`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 6v2m0 8v2m-5-7h1.5a2.5 2.5 0 010 5H7m0-5h1.5a2.5 2.5 0 000-5H7m10 0h-1m0 10h1M9 3v2m0 14v2" />
                    </svg>
                  </div>
                  <div>
                    <span className={`font-semibold block ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Cryptocurrency</span>
                    <span className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>BTC, ETH, USDT</span>
                  </div>
                </div>
                {selectedPayment === "crypto" && (
                  <Chip
                    size="sm"
                    classNames={{
                      base: "bg-emerald-500/10 border-0",
                      content: "text-emerald-400 font-semibold text-[10px]"
                    }}
                  >
                    Default
                  </Chip>
                )}
              </div>
              <div className="flex gap-2">
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ring-1 ${
                  isLight ? "bg-zinc-100 text-zinc-600 ring-zinc-200" : "bg-[#27272A] text-zinc-400 ring-[#3F3F46]"
                }`}>BTC</span>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ring-1 ${
                  isLight ? "bg-zinc-100 text-zinc-600 ring-zinc-200" : "bg-[#27272A] text-zinc-400 ring-[#3F3F46]"
                }`}>ETH</span>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ring-1 ${
                  isLight ? "bg-zinc-100 text-zinc-600 ring-zinc-200" : "bg-[#27272A] text-zinc-400 ring-[#3F3F46]"
                }`}>USDT</span>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ring-1 ${
                  isLight ? "bg-zinc-100 text-zinc-600 ring-zinc-200" : "bg-[#27272A] text-zinc-400 ring-[#3F3F46]"
                }`}>+5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isLight ? "text-zinc-600" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h2 className={`text-base font-semibold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Recent Invoices</h2>
          </div>
          <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <div className={`rounded-2xl border overflow-hidden ${
          isLight ? "bg-white border-zinc-200" : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border-[#2A2A2E]"
        }`}>
          <Table
            aria-label="Invoices"
            removeWrapper
            classNames={{
              table: "bg-transparent",
              th: `text-[11px] font-semibold uppercase tracking-wider py-4 px-6 first:rounded-tl-none last:rounded-tr-none border-b ${
                isLight ? "bg-zinc-50 text-zinc-500 border-zinc-200" : "bg-[#18181B]/80 text-zinc-500 border-[#2A2A2E]"
              }`,
              td: "text-sm py-4 px-6",
              tr: `border-b last:border-b-0 transition-colors ${
                isLight ? "hover:bg-zinc-50 border-zinc-100" : "hover:bg-[#27272A]/30 border-[#2A2A2E]/50"
              }`,
            }}
          >
            <TableHeader>
              <TableColumn>Invoice</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => {
                const status = statusStyles[inv.status] || statusStyles.Paid;
                return (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <span className={`font-mono font-medium text-xs ${isLight ? "text-zinc-700" : "text-zinc-200"}`}>{inv.id}</span>
                    </TableCell>
                    <TableCell className={isLight ? "text-zinc-600" : "text-zinc-400"}>{inv.description}</TableCell>
                    <TableCell className={isLight ? "text-zinc-500" : "text-zinc-500"}>{inv.date}</TableCell>
                    <TableCell className={`font-semibold ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>{inv.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} ring-1 ring-inset ring-white/5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        <span className={`text-[11px] font-semibold ${status.text}`}>{inv.status}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isLight ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700" : "bg-[#27272A]/50 hover:bg-[#27272A] text-zinc-400 hover:text-zinc-200"
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 flex items-center justify-center transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Billing Support Banner */}
      <div className={`group relative overflow-hidden rounded-2xl border transition-all ${
        isLight
          ? "bg-white border-zinc-200 hover:border-zinc-300"
          : "bg-gradient-to-br from-[#1E1E21] to-[#1a1a1d] border-[#2A2A2E] hover:border-[#3F3F46]"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.04] via-transparent to-rose-500/[0.04]" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-violet-500/10 to-transparent rounded-full translate-y-1/2 translate-x-1/4" />

        <div className="relative px-6 py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-sm font-semibold mb-0.5 ${isLight ? "text-zinc-800" : "text-zinc-100"}`}>Need help with billing?</h3>
              <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>Our support team is available 24/7 to assist with any billing questions or issues.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className={`text-sm font-medium transition-colors px-4 py-2 ${
              isLight ? "text-zinc-500 hover:text-zinc-700" : "text-zinc-400 hover:text-zinc-200"
            }`}>
              View FAQ
            </button>
            <button className={`h-10 px-5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
              isLight
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 border-zinc-200"
                : "bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200 hover:text-white border-[#3F3F46]"
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
