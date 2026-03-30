"use client";

import { Skeleton } from "./Skeleton";

export function ProductsSkeleton() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-11 w-40" />
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-11 flex-1 max-w-md" />
        <Skeleton className="h-11 w-48" />
      </div>

      <div className="space-y-4 md:hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex gap-4">
              <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="w-full rounded-2xl border border-white/5 bg-white/5">
          <div className="border-b border-white/5 px-6 py-4 flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/6" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-6 flex items-center gap-4 border-b border-white/5 last:border-0">
               <div className="flex items-center gap-4 w-1/4">
                 <Skeleton className="h-12 w-12 shrink-0" />
                 <div className="space-y-2 flex-1">
                   <Skeleton className="h-4 w-3/4" />
                   <Skeleton className="h-3 w-1/2" />
                 </div>
               </div>
               <Skeleton className="h-4 w-1/6" />
               <Skeleton className="h-4 w-1/6" />
               <div className="w-1/6">
                 <Skeleton className="h-2 w-full mb-1" />
                 <Skeleton className="h-2 w-1/2" />
               </div>
               <div className="w-1/6 flex justify-center">
                 <Skeleton className="h-6 w-16" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
