import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const variants = {
  primary: 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-red-500/50',
  secondary: 'bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] border border-amber-400/50',
  danger: 'bg-red-950/50 hover:bg-red-900/80 text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-800',
  ghost: 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white',
  outline: 'bg-gray-900/50 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold tracking-wide',
        'transition-all duration-200 cursor-pointer active:scale-[0.97]',
        'focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-950',
        'disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      <span>{children}</span>
    </button>
  );
}