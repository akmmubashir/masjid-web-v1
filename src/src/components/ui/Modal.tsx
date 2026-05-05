import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from './Core';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose} />
      
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-xl bg-surface dark:bg-surface-dark p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200',
          className
        )}>
        
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
            
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>);

}