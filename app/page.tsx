"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { useTheme } from "@/lib/context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Feature cards data
const FEATURES = [
  {
    title: "Lightning Fast",
    description: "Optimized servers with built-in caching deliver sub-second load times worldwide.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    gradient: "from-amber-500 to-orange-600",
    glow: "from-amber-500/20",
  },
  {
    title: "Enterprise Security",
    description: "DDoS protection, WAF, malware scanning, and automatic backups included.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    gradient: "from-emerald-500 to-teal-600",
    glow: "from-emerald-500/20",
  },
  {
    title: "24/7 Expert Support",
    description: "WordPress experts available around the clock via chat, email, or phone.",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    gradient: "from-violet-500 to-purple-600",
    glow: "from-violet-500/20",
  },
  {
    title: "One-Click Staging",
    description: "Test changes safely with instant staging environments and easy deployment.",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    gradient: "from-sky-500 to-blue-600",
    glow: "from-sky-500/20",
  },
];

// Stats data
const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50ms", label: "Avg Response" },
  { value: "25K+", label: "Sites Hosted" },
  { value: "150+", label: "Countries" },
];

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className={`flex-1 pt-16 ${isLight ? "bg-zinc-50" : "bg-[#0f0f11]"}`}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
              isLight ? "bg-emerald-500/10" : "bg-emerald-500/5"
            }`} />
            <div className={`absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
              isLight ? "bg-sky-500/10" : "bg-sky-500/5"
            }`} />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl ${
              isLight ? "bg-violet-500/5" : "bg-violet-500/5"
            }`} />
          </div>

          {/* Grid pattern overlay */}
          <div className={`absolute inset-0 ${isLight ? "opacity-[0.015]" : "opacity-[0.02]"}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isLight ? "000" : "fff"}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ring-1 transition-all ${
                isLight
                  ? "bg-gradient-to-r from-emerald-500/10 to-sky-500/10 ring-emerald-500/20"
                  : "bg-gradient-to-r from-emerald-500/15 to-sky-500/15 ring-emerald-500/30"
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className={`text-sm font-medium ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>
                  New: Advanced caching now available
                </span>
              </div>

              {/* Headline */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${
                isLight ? "text-zinc-900" : "text-white"
              }`}>
                WordPress Hosting{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              {/* Subheadline */}
              <p className={`text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Premium managed WordPress hosting with blazing-fast performance,
                enterprise-grade security, and expert support. Focus on your content
                while we handle the rest.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={ROUTES.DASHBOARD}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #0ea5e9)",
                    boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.5)",
                  }}
                >
                  <span className="relative z-10">Get Started Free</span>
                  <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href={ROUTES.DOCS}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ring-1 ${
                    isLight
                      ? "bg-white text-zinc-700 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-50"
                      : "bg-[#1E1E21] text-zinc-200 ring-[#2A2A2E] hover:ring-[#3F3F46] hover:bg-[#27272A]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  View Documentation
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className={`mt-20 py-8 px-8 rounded-2xl ring-1 ${
              isLight
                ? "bg-white/80 backdrop-blur-sm ring-zinc-200"
                : "bg-[#1E1E21]/80 backdrop-blur-sm ring-[#2A2A2E]"
            }`}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-3xl lg:text-4xl font-bold mb-1 ${
                      isLight ? "text-zinc-900" : "text-white"
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`relative py-24 lg:py-32 ${isLight ? "bg-white" : "bg-[#18181B]"}`}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className={`inline-block text-sm font-semibold uppercase tracking-wider mb-4 ${
                isLight ? "text-emerald-600" : "text-emerald-400"
              }`}>
                Why Choose Us
              </span>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isLight ? "text-zinc-900" : "text-white"
              }`}>
                Everything You Need to Succeed
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Powerful features designed for developers, agencies, and businesses
                who demand the best for their WordPress sites.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className={`group relative p-6 rounded-2xl transition-all overflow-hidden ${
                    isLight
                      ? "bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50"
                      : "bg-[#1E1E21] hover:bg-[#222225] border border-[#2A2A2E] hover:border-[#3F3F46]"
                  }`}
                >
                  {/* Glow effect */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.glow} to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isLight ? "text-zinc-900" : "text-white"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isLight ? "text-zinc-600" : "text-zinc-400"
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0"
            style={{
              background: isLight
                ? "linear-gradient(135deg, #ecfdf5, #f0f9ff, #f5f3ff)"
                : "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))",
            }}
          />

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 ${
              isLight ? "bg-emerald-500/20" : "bg-emerald-500/10"
            }`} />
            <div className={`absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${
              isLight ? "bg-violet-500/20" : "bg-violet-500/10"
            }`} />
          </div>

          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className={`text-center p-12 lg:p-16 rounded-3xl ring-1 ${
              isLight
                ? "bg-white/80 backdrop-blur-sm ring-zinc-200"
                : "bg-[#1E1E21]/80 backdrop-blur-sm ring-[#2A2A2E]"
            }`}>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isLight ? "text-zinc-900" : "text-white"
              }`}>
                Ready to Get Started?
              </h2>
              <p className={`text-lg mb-8 max-w-xl mx-auto ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Join thousands of satisfied customers and experience the difference
                premium WordPress hosting can make.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={ROUTES.DASHBOARD}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #0ea5e9)",
                    boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.5)",
                  }}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href={ROUTES.SUPPORT}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                    isLight
                      ? "text-zinc-700 hover:text-zinc-900"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Talk to Sales
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
