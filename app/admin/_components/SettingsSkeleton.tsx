"use client";

import { Skeleton } from "./Skeleton";

export function SettingsSkeleton() {
  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <header className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-40" />
      </div>
    </div>
  );
}
