import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Button
export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-masjid-800 text-white hover:bg-masjid-900 shadow-sm',
      secondary: 'bg-gold-500 text-white hover:bg-gold-600 shadow-sm',
      outline:
      'border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
      ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
    };
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base'
    };
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-masjid-500 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props} />);


  }
);
Button.displayName = 'Button';
// Input
export interface InputProps extends
  React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label &&
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        }
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-masjid-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props} />
        
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>);

  }
);
Input.displayName = 'Input';
// Select
export interface SelectProps extends
  React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label &&
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        }
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-masjid-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}>
          
          {options.map((opt) =>
          <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>);

  }
);
Select.displayName = 'Select';
// Card
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200/80 dark:border-slate-800 bg-surface dark:bg-surface-dark text-slate-950 dark:text-slate-50 shadow-soft transition-shadow',
        className
      )}
      {...props} />);


}
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props} />);


}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-serif text-xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props} />);


}
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
// Badge
export function Badge({
  className,
  variant = 'default',
  ...props


}: React.HTMLAttributes<HTMLDivElement> & {variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';}) {
  const variants = {
    default:
    'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
    success:
    'bg-masjid-100 text-masjid-800 dark:bg-masjid-900/30 dark:text-masjid-400',
    warning: 'bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    outline:
    'text-slate-950 dark:text-slate-50 border border-slate-200 dark:border-slate-800'
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props} />);


}