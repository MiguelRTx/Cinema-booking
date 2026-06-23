import { cn } from '../../utils/cn';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden animate-pulse shadow-lg',
        className
      )}
    >
      <div className="bg-gray-800/80 h-72 w-full" />
      <div className="p-5 space-y-4">
        <div className="h-5 bg-gray-800/80 rounded-md w-3/4" />
        <div className="h-4 bg-gray-800/60 rounded-md w-1/2" />
        <div className="flex gap-3 pt-2">
          <div className="h-6 bg-gray-800/80 rounded-full w-16" />
          <div className="h-6 bg-gray-800/80 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-3 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('h-3.5 bg-gray-800/80 rounded-md', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-5 p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl animate-pulse', className)}>
      <div className="h-14 w-14 bg-gray-800/80 rounded-xl shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-800/80 rounded-md w-1/3" />
        <div className="h-3.5 bg-gray-800/60 rounded-md w-1/5" />
      </div>
    </div>
  );
}