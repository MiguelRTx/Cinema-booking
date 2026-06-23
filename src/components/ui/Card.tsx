import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-gray-900/80 backdrop-blur-md border border-gray-800/60 rounded-2xl overflow-hidden shadow-lg shadow-black/20',
        hover && 'transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-700 hover:shadow-2xl hover:shadow-black/40 hover:bg-gray-900 cursor-pointer',
        onClick && !hover && 'cursor-pointer active:scale-[0.98] transition-transform',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-5 border-b border-gray-800/60 bg-gray-900/30', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-5', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-800/60 bg-gray-900/30', className)}>
      {children}
    </div>
  );
}