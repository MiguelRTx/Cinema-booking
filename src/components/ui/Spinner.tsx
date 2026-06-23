import { cn } from '../../utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-10 h-10 border-[3px]',
  lg: 'w-16 h-16 border-4',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando..."
      className={cn(
        'animate-spin rounded-full border-gray-800 border-t-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
        sizes[size],
        className
      )}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-sm animate-fade-in-up">
      <div className="flex flex-col items-center gap-6 p-8 bg-gray-900/50 rounded-3xl border border-gray-800/50 shadow-2xl">
        <Spinner size="lg" />
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 text-lg font-bold tracking-widest uppercase animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}