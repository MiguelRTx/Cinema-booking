import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-gray-900/95 backdrop-blur-xl border border-gray-700/60 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]',
          'animate-scale-in',
          sizes[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800/60 bg-gray-800/20 rounded-t-3xl">
            <h2 id="modal-title" className="text-xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Cerrar"
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full w-10 h-10 p-0"
            >
              <RiCloseLine className="w-6 h-6" />
            </Button>
          </div>
        )}
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>,
    document.body
  );
}