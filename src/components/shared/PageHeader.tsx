import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 pb-6 border-b border-gray-800/60', className)}>
      <div className="space-y-1.5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-gray-400 text-sm md:text-base font-medium">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}