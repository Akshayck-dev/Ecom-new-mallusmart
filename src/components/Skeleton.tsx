import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div 
      className={`relative overflow-hidden bg-surface-container rounded-md ${className}`}
      {...props}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-3 space-y-3 border border-gray-100">
      <div className="relative h-[160px] rounded-lg overflow-hidden bg-gray-50">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-2 w-12 rounded-full" />
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-2 w-2/3 rounded-md" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
      <div className="space-y-6">
        <Skeleton className="aspect-[4/5] rounded-2xl w-full" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <Skeleton className="aspect-square rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-12 w-3/4 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <Skeleton className="w-16 h-12 rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-14 w-40 rounded-md" />
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
