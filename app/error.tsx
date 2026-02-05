"use client";

import { useEffect } from "react";

/**
 * Global error boundary component.
 * Catches and displays errors at the application level.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console (could be sent to error tracking service)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#18181B] flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        {/* Error icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        {/* Error message */}
        <h2 className="text-xl font-semibold text-zinc-100 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="h-10 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="h-10 px-6 rounded-xl bg-[#27272A] text-zinc-300 font-semibold text-sm hover:bg-[#3F3F46] hover:text-white transition-all"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Error details in development */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-6 text-xs text-zinc-600">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
