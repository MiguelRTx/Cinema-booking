import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-gray-300 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-300 transition-colors pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-600',
              'px-4 py-3 text-sm font-medium',
              'transition-all duration-200 ease-out',
              'hover:border-gray-700',
              'focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 focus:bg-gray-900',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-800',
              error ? 'border-red-500/50 hover:border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-500/5' : '',
              leftIcon ? 'pl-11' : '',
              rightIcon ? 'pr-11' : '',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-300 transition-colors pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-sm text-red-400 font-medium animate-fade-in-up">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-gray-500 font-medium">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';