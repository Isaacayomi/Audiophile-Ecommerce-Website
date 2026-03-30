"use client";

import { Skeleton } from "./Skeleton";

export function SidebarSkeleton() {
  return (
    <div className="flex h-full flex-col px-4 py-8">
      <div className="mb-10 flex items-center gap-3 px-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="px-3">
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center px-4 py-3">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="ml-3 h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center px-4 py-3">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="ml-3 h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
