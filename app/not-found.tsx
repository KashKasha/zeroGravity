import Link from "next/link";
import { ROUTES } from "@/config/routes";

/**
 * Global 404 Not Found page.
 * Displayed when a route doesn't exist.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#18181B] flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[120px] font-bold text-zinc-800/50 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 ring-1 ring-emerald-500/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold text-zinc-100 mb-2">
          Page not found
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href={ROUTES.DASHBOARD}
            className="inline-flex h-10 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm items-center gap-2 hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </Link>
          <Link
            href={ROUTES.SUPPORT}
            className="h-10 px-6 rounded-xl bg-[#27272A] text-zinc-300 font-semibold text-sm hover:bg-[#3F3F46] hover:text-white transition-all inline-flex items-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
