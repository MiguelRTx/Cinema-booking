import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-700 text-gray-300',
  success: 'bg-green-900/60 text-green-400 border border-green-700/50',
  warning: 'bg-amber-900/60 text-amber-400 border border-amber-700/50',
  danger: 'bg-red-900/60 text-red-400 border border-red-700/50',
  info: 'bg-blue-900/60 text-blue-400 border border-blue-700/50',
  outline: 'bg-transparent border border-gray-600 text-gray-300',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
