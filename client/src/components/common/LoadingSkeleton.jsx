import React from 'react';

export const CardSkeleton = () => (
  <div className="rounded-3xl p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
    <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
    <div className="flex justify-between items-center pt-2">
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
      <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
    </div>
  </div>
);

export const ServiceListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default CardSkeleton;
