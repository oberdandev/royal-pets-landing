import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  disabled,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 font-body';

  const variants = {
    primary: 'bg-royal-gold text-royal-navy hover:brightness-110 shadow-lg hover:shadow-xl',
    secondary: 'bg-royal-navy text-royal-soft-gold hover:bg-royal-navy-light',
    outline: 'bg-transparent border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-navy',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(
    baseStyles, 
    variants[variant], 
    sizes[size], 
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}