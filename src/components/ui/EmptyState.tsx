import type { ReactNode } from 'react';
import { RiFilmLine, RiSearchLine, RiInboxLine } from 'react-icons/ri';

type EmptyStateIcon = 'film' | 'search' | 'inbox';

interface EmptyStateProps {
  icon?: EmptyStateIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

const icons: Record<EmptyStateIcon, ReactNode> = {
  film: <RiFilmLine className="w-12 h-12 text-red-500" />,
  search: <RiSearchLine className="w-12 h-12 text-amber-500" />,
  inbox: <RiInboxLine className="w-12 h-12 text-blue-500" />,
};

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-900/40 backdrop-blur-md border border-gray-800/60 rounded-3xl shadow-xl shadow-black/20 animate-fade-in-up">
      <div className="mb-6 p-5 bg-gray-800/50 rounded-full shadow-inner border border-gray-700/50 ring-1 ring-white/5">
        {icons[icon]}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      {description && (
        <p className="text-gray-400 text-base max-w-sm mb-8 leading-relaxed font-medium">
          {description}
        </p>
      )}
      {action && (
        <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          {action}
        </div>
      )}
    </div>
  );
}